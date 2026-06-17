"use client";

import { useMemo, useState } from "react";
import { INGREDIENTS, CATEGORY_LABELS, CATEGORY_ORDER } from "@/lib/ingredients";
import type { Ingredient } from "@/lib/types";
import { IngredientChip } from "./IngredientChip";

type Props = {
  bowlIds: Set<string>;
};

export function IngredientPalette({ bowlIds }: Props) {
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const matches = INGREDIENTS.filter((ingredient) =>
      normalized ? ingredient.name.toLowerCase().includes(normalized) : true
    );

    const byCategory = new Map<Ingredient["category"], Ingredient[]>();
    for (const ingredient of matches) {
      const list = byCategory.get(ingredient.category) ?? [];
      list.push(ingredient);
      byCategory.set(ingredient.category, list);
    }
    return byCategory;
  }, [query]);

  return (
    <section className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="mb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Ingredients
        </h2>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search ingredients…"
          className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div className="-mr-2 flex-1 space-y-5 overflow-y-auto pr-2">
        {CATEGORY_ORDER.map((category) => {
          const items = grouped.get(category);
          if (!items || items.length === 0) return null;
          return (
            <div key={category}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {CATEGORY_LABELS[category]}
              </h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {items.map((ingredient) => (
                  <IngredientChip
                    key={ingredient.id}
                    ingredient={ingredient}
                    inBowl={bowlIds.has(ingredient.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {grouped.size === 0 && (
          <p className="py-8 text-center text-sm text-slate-400">
            No ingredients match “{query}”.
          </p>
        )}
      </div>
    </section>
  );
}
