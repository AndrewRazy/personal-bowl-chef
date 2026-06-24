"use client";

import { useDroppable } from "@dnd-kit/core";
import type { Ingredient } from "@/lib/types";
import { BowlIngredient } from "./BowlIngredient";
import { BOWL_PICTURES } from "@/data/bowlPictures";

type Props = {
  ingredients: Ingredient[];
  servings: number;
  isGenerating: boolean;
  onRemove: (id: string) => void;
};

const BOWL_IMG = (BOWL_PICTURES.find((b) => b.id === "main") ?? BOWL_PICTURES[0]).url;

export function DigitalBowl({ ingredients, servings, isGenerating, onRemove }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: "bowl" });
  const isEmpty = ingredients.length === 0;

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div
        ref={setNodeRef}
        className={`relative flex w-full max-w-xl flex-col items-center justify-end rounded-[3rem] border-4 border-b-[10px] bg-gradient-to-b from-white to-slate-50 px-6 pb-6 pt-10 transition
          ${isOver ? "border-brand-400 shadow-[0_0_0_6px_rgba(34,197,94,0.15)]" : "border-slate-200"}
          ${isGenerating ? "animate-pulse" : ""}`}
        style={{ minHeight: "24rem" }}
      >
        <div className="pointer-events-none absolute inset-x-10 top-6 h-6 rounded-full bg-white/60 blur-sm" />

        {/* Bowl illustration as the base layer */}
        <div className="relative flex w-full items-end justify-center">
          <img
            src={BOWL_IMG}
            alt="bowl"
            className={`h-72 w-72 object-contain ${isEmpty ? "animate-float" : ""}`}
            draggable={false}
            aria-hidden
          />

          {/* Selected ingredients layered inside the bowl opening */}
          {!isEmpty && (
            <div className="absolute inset-x-6 top-2 bottom-[38%] flex flex-wrap content-start items-center justify-center gap-1 overflow-visible">
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

        {isEmpty && (
          <p className="mt-2 max-w-xs text-center text-sm text-slate-400">
            Drag ingredients here to fill your bowl, then let the AI chef cook up
            a recipe.
          </p>
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
