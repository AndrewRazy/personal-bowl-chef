"use client";

import type { Ingredient } from "@/lib/types";
import { CATEGORY_STYLES } from "./categoryStyles";

type Props = {
  ingredient: Ingredient;
  onRemove: () => void;
};

export function BowlIngredient({ ingredient, onRemove }: Props) {
  const styles = CATEGORY_STYLES[ingredient.category];
  return (
    <span
      className={`animate-splash group flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium shadow-sm ${styles.chip}`}
    >
      <span className="text-base leading-none" aria-hidden>
        {ingredient.icon}
      </span>
      {ingredient.name}
      <button
        onClick={onRemove}
        aria-label={`Remove ${ingredient.name}`}
        className="ml-0.5 grid h-4 w-4 place-items-center rounded-full text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
      >
        ×
      </button>
    </span>
  );
}
