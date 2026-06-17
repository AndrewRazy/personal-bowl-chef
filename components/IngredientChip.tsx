"use client";

import { useDraggable } from "@dnd-kit/core";
import type { Ingredient } from "@/lib/types";
import { CATEGORY_STYLES } from "./categoryStyles";

type Props = {
  ingredient: Ingredient;
  inBowl: boolean;
};

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
      className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-medium shadow-sm transition
        ${styles.chip}
        ${inBowl ? "cursor-not-allowed opacity-40" : "cursor-grab active:cursor-grabbing hover:-translate-y-0.5 hover:shadow"}
        ${isDragging ? "opacity-30" : ""}`}
    >
      <span className="text-xl leading-none" aria-hidden>
        {ingredient.icon}
      </span>
      <span className="truncate">{ingredient.name}</span>
      {inBowl && <span className="ml-auto text-xs text-slate-400">added</span>}
    </button>
  );
}

export function IngredientChipPreview({ ingredient }: { ingredient: Ingredient }) {
  const styles = CATEGORY_STYLES[ingredient.category];
  return (
    <div
      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium shadow-lg ${styles.chip}`}
    >
      <span className="text-xl leading-none" aria-hidden>
        {ingredient.icon}
      </span>
      <span>{ingredient.name}</span>
    </div>
  );
}
