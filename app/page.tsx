"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { getIngredientById } from "@/lib/ingredients";
import type { DietaryPref, Ingredient, Recipe } from "@/lib/types";
import { IngredientPalette } from "@/components/IngredientPalette";
import { IngredientChipPreview } from "@/components/IngredientChip";
import { DigitalBowl } from "@/components/DigitalBowl";
import { PreferencesPanel } from "@/components/PreferencesPanel";
import { GenerateButton } from "@/components/GenerateButton";
import { RecipeCard } from "@/components/RecipeCard";
import { CookingMode } from "@/components/CookingMode";
import { OllamaStatus } from "@/components/OllamaStatus";

type View = "idle" | "generating" | "recipe" | "cooking";

export default function Home() {
  const [bowlIds, setBowlIds] = useState<string[]>([]);
  const [servings, setServings] = useState(2);
  const [dietaryPrefs, setDietaryPrefs] = useState<DietaryPref[]>([]);
  const [maxPrepMinutes, setMaxPrepMinutes] = useState<number | undefined>(undefined);

  const [view, setView] = useState<View>("idle");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeIngredient, setActiveIngredient] = useState<Ingredient | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 6 } })
  );

  const bowlIdSet = useMemo(() => new Set(bowlIds), [bowlIds]);
  const bowlIngredients = useMemo(
    () => bowlIds.map((id) => getIngredientById(id)).filter((i): i is Ingredient => Boolean(i)),
    [bowlIds]
  );

  const isGenerating = view === "generating";

  function handleDragStart(event: DragStartEvent) {
    const ingredient = event.active.data.current?.ingredient as Ingredient | undefined;
    setActiveIngredient(ingredient ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveIngredient(null);
    const ingredient = event.active.data.current?.ingredient as Ingredient | undefined;
    if (!ingredient) return;
    if (event.over?.id === "bowl") {
      setBowlIds((ids) => (ids.includes(ingredient.id) ? ids : [...ids, ingredient.id]));
    }
  }

  function removeIngredient(id: string) {
    setBowlIds((ids) => ids.filter((existing) => existing !== id));
  }

  function clearBowl() {
    setBowlIds([]);
    setRecipe(null);
    setError(null);
    setView("idle");
  }

  function togglePref(pref: DietaryPref) {
    setDietaryPrefs((prefs) =>
      prefs.includes(pref) ? prefs.filter((p) => p !== pref) : [...prefs, pref]
    );
  }

  async function generateRecipe() {
    if (bowlIds.length < 2) return;
    setView("generating");
    setError(null);
    setRecipe(null);

    try {
      const res = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: bowlIngredients.map((i) => i.name),
          servings,
          dietaryPrefs,
          maxPrepMinutes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong while generating the recipe.");
        setView("idle");
        return;
      }

      setRecipe(data.recipe as Recipe);
      setView("recipe");
    } catch {
      setError("Could not reach the recipe service. Is the app server running?");
      setView("idle");
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              🥣 Bowl Chef
            </h1>
            <p className="text-sm text-slate-500">
              Drag ingredients into the bowl and cook with a local AI chef.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <OllamaStatus />
            <GenerateButton
              disabled={isGenerating || bowlIds.length < 2}
              isGenerating={isGenerating}
              ingredientCount={bowlIds.length}
              onClick={generateRecipe}
            />
          </div>
        </header>

        <div className="grid flex-1 gap-4 lg:grid-cols-[20rem_1fr_24rem]">
          <div className="min-h-[24rem] lg:h-[calc(100vh-8rem)]">
            <IngredientPalette bowlIds={bowlIdSet} />
          </div>

          <div className="flex flex-col gap-4">
            <DigitalBowl
              ingredients={bowlIngredients}
              servings={servings}
              isGenerating={isGenerating}
              onRemove={removeIngredient}
            />
            {bowlIds.length > 0 && (
              <div className="text-center">
                <button
                  onClick={clearBowl}
                  className="text-xs font-medium text-slate-400 underline-offset-2 hover:text-slate-600 hover:underline"
                >
                  Empty the bowl
                </button>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            {view === "cooking" && recipe ? (
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur lg:h-[calc(100vh-8rem)]">
                <CookingMode recipe={recipe} onExit={() => setView("recipe")} />
              </div>
            ) : (
              <>
                <PreferencesPanel
                  servings={servings}
                  dietaryPrefs={dietaryPrefs}
                  maxPrepMinutes={maxPrepMinutes}
                  onServingsChange={setServings}
                  onTogglePref={togglePref}
                  onMaxPrepChange={setMaxPrepMinutes}
                />

                {error && (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                    {error}
                  </div>
                )}

                {isGenerating && (
                  <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-8 text-center shadow-sm">
                    <span className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
                    <p className="text-sm text-slate-500">
                      The AI chef is tasting and balancing your ingredients…
                    </p>
                  </div>
                )}

                {view === "recipe" && recipe && (
                  <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
                    <RecipeCard recipe={recipe} onStartCooking={() => setView("cooking")} />
                  </div>
                )}

                {view === "idle" && !error && (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white/50 p-6 text-center text-sm text-slate-400">
                    Your recipe will appear here once you create it.
                  </div>
                )}
              </>
            )}
          </aside>
        </div>
      </div>

      <DragOverlay dropAnimation={null}>
        {activeIngredient ? <IngredientChipPreview ingredient={activeIngredient} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
