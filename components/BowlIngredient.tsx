"use client";

import type { Ingredient } from "@/lib/types";

type Props = {
  ingredient: Ingredient;
  onRemove: () => void;
};

export function BowlIngredient({ ingredient, onRemove }: Props) {
  return (
    <button
      onClick={onRemove}
      aria-label={`Remove ${ingredient.name}`}
      title={`${ingredient.name} — click to remove`}
      className="animate-splash group relative flex flex-col items-center transition hover:-translate-y-1 focus:outline-none"
    >
      {ingredient.sprite ? (
        <img
          src={ingredient.sprite}
          alt={ingredient.name}
          className="h-20 w-20 object-contain drop-shadow-[2px_2px_0_rgba(0,0,0,0.25)] [image-rendering:pixelated]"
          draggable={false}
        />
      ) : (
        <span
          className="grid h-20 w-20 place-items-center text-5xl drop-shadow-[2px_2px_0_rgba(0,0,0,0.25)]"
          aria-hidden
        >
          {ingredient.icon}
        </span>
      )}

      <span className="pointer-events-none absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-xs font-bold text-white opacity-0 shadow transition group-hover:opacity-100">
        ×
      </span>
    </button>
  );
}
