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
import { Loader2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card/80 px-4 py-3 shadow-sm backdrop-blur">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              🥣 Bowl Chef
            </h1>
            <p className="text-sm text-muted-foreground">
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
                <Button
                  variant="link"
                  size="sm"
                  onClick={clearBowl}
                  className="text-muted-foreground"
                >
                  Empty the bowl
                </Button>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            {view === "cooking" && recipe ? (
              <Card className="bg-card/80 py-4 backdrop-blur lg:h-[calc(100vh-8rem)]">
                <CardContent>
                  <CookingMode recipe={recipe} onExit={() => setView("recipe")} />
                </CardContent>
              </Card>
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
                  <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                    {error}
                  </div>
                )}

                {isGenerating && (
                  <Card className="bg-card/80 backdrop-blur">
                    <CardContent className="flex flex-col items-center gap-3 text-center">
                      <Loader2 className="size-8 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">
                        The AI chef is tasting and balancing your ingredients…
                      </p>
                    </CardContent>
                  </Card>
                )}

                {view === "recipe" && recipe && (
                  <Card className="bg-card/90 py-5 backdrop-blur">
                    <CardContent>
                      <RecipeCard recipe={recipe} onStartCooking={() => setView("cooking")} />
                    </CardContent>
                  </Card>
                )}

                {view === "idle" && !error && (
                  <Card className="border-dashed bg-card/50">
                    <CardContent className="text-center text-sm text-muted-foreground">
                      Your recipe will appear here once you create it.
                    </CardContent>
                  </Card>
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
