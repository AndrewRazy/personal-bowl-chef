"use client";

import { useDraggable } from "@dnd-kit/core";
import type { Ingredient } from "@/lib/types";
import { CATEGORY_STYLES } from "./categoryStyles";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  ingredient: Ingredient;
  inBowl: boolean;
};

function IngredientGlyph({ ingredient }: { ingredient: Ingredient }) {
  if (ingredient.sprite) {
    return (
      <img
        src={ingredient.sprite}
        alt=""
        className="h-6 w-6 object-contain [image-rendering:pixelated]"
        draggable={false}
        aria-hidden
      />
    );
  }
  return (
    <span className="text-xl leading-none" aria-hidden>
      {ingredient.icon}
    </span>
  );
}

export function IngredientChip({ ingredient, inBowl }: Props) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${ingredient.id}`,
    data: { ingredient },
    disabled: inBowl,
  });

  const styles = CATEGORY_STYLES[ingredient.category];

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      disabled={inBowl}
      aria-label={`Add ${ingredient.name} to bowl`}
      className={cn(
        "flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm font-medium shadow-sm transition",
        styles.chip,
        inBowl
          ? "cursor-not-allowed opacity-40"
          : "cursor-grab hover:-translate-y-0.5 hover:shadow active:cursor-grabbing",
        isDragging && "opacity-30"
      )}
    >
      <IngredientGlyph ingredient={ingredient} />
      <span className="truncate">{ingredient.name}</span>
      {inBowl && (
        <Badge variant="secondary" className="ml-auto">
          added
        </Badge>
      )}
    </button>
  );
}

export function IngredientChipPreview({ ingredient }: { ingredient: Ingredient }) {
  const styles = CATEGORY_STYLES[ingredient.category];
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium shadow-lg",
        styles.chip
      )}
    >
      <IngredientGlyph ingredient={ingredient} />
      <span>{ingredient.name}</span>
    </div>
  );
}
