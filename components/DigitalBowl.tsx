"use client";

import { useDroppable } from "@dnd-kit/core";
import type { Ingredient } from "@/lib/types";
import { BowlIngredient } from "./BowlIngredient";

type Props = {
  ingredients: Ingredient[];
  servings: number;
  isGenerating: boolean;
  onRemove: (id: string) => void;
};

export function DigitalBowl({ ingredients, servings, isGenerating, onRemove }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: "bowl" });

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div
        ref={setNodeRef}
        className={`relative flex w-full max-w-xl flex-col items-center justify-center rounded-[3rem] border-4 border-b-[10px] bg-gradient-to-b from-white to-slate-50 px-6 py-10 transition
          ${isOver ? "border-brand-400 shadow-[0_0_0_6px_rgba(34,197,94,0.15)]" : "border-slate-200"}
          ${isGenerating ? "animate-pulse" : ""}`}
        style={{ minHeight: "20rem" }}
      >
        <div className="pointer-events-none absolute inset-x-10 top-6 h-6 rounded-full bg-white/60 blur-sm" />

        {ingredients.length === 0 ? (
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="animate-float text-6xl" aria-hidden>
              🥗
            </span>
            <p className="max-w-xs text-sm text-slate-400">
              Drag ingredients here to fill your bowl, then let the AI chef cook
              up a recipe.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {ingredients.map((ingredient) => (
              <BowlIngredient
                key={ingredient.id}
                ingredient={ingredient}
                onRemove={() => onRemove(ingredient.id)}
              />
            ))}
          </div>
        )}
      </div>

      <p className="mt-4 text-sm font-medium text-slate-500">
        {ingredients.length}{" "}
        {ingredients.length === 1 ? "ingredient" : "ingredients"} ·{" "}
        {servings} {servings === 1 ? "serving" : "servings"}
      </p>
    </div>
  );
}
