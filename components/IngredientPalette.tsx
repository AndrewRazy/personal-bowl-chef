"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { INGREDIENTS, CATEGORY_LABELS, CATEGORY_ORDER } from "@/lib/ingredients";
import type { Ingredient } from "@/lib/types";
import { IngredientChip } from "./IngredientChip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
    <Card className="flex h-full flex-col gap-4 bg-card/80 py-4 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-base">Ingredients</CardTitle>
        <div className="relative mt-2">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search ingredients…"
            className="pl-9"
          />
        </div>
      </CardHeader>

      <CardContent className="-mr-2 flex-1 space-y-5 overflow-y-auto pr-2">
        {CATEGORY_ORDER.map((category) => {
          const items = grouped.get(category);
          if (!items || items.length === 0) return null;
          return (
            <div key={category}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
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
          <p className="py-8 text-center text-sm text-muted-foreground">
            No ingredients match “{query}”.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
