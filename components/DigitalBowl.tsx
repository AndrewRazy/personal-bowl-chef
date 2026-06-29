"use client";

import { useDroppable } from "@dnd-kit/core";
import type { Ingredient } from "@/lib/types";
import { BowlIngredient } from "./BowlIngredient";
import { BOWL_PICTURES } from "@/data/bowlPictures";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
      <Card
        ref={setNodeRef}
        className={cn(
          "relative w-full max-w-xl items-center justify-end gap-0 rounded-3xl border-2 bg-card/80 px-6 pt-10 pb-6 backdrop-blur transition",
          isOver
            ? "border-primary ring-4 ring-primary/15"
            : "border-border",
          isGenerating && "animate-pulse"
        )}
        style={{ minHeight: "24rem" }}
      >
        <div className="relative flex w-full items-end justify-center">
          <img
            src={BOWL_IMG}
            alt="bowl"
            className={cn("h-72 w-72 object-contain", isEmpty && "animate-float")}
            draggable={false}
            aria-hidden
          />

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
          <p className="mt-2 max-w-xs text-center text-sm text-muted-foreground">
            Drag ingredients here to fill your bowl, then let the AI chef cook up
            a recipe.
          </p>
        )}
      </Card>

      <p className="mt-4 text-sm font-medium text-muted-foreground">
        {ingredients.length}{" "}
        {ingredients.length === 1 ? "ingredient" : "ingredients"} ·{" "}
        {servings} {servings === 1 ? "serving" : "servings"}
      </p>
    </div>
  );
}
