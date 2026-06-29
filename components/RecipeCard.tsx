"use client";

import { ChefHat, Leaf, TriangleAlert } from "lucide-react";
import type { Recipe } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Props = {
  recipe: Recipe;
  onStartCooking: () => void;
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted px-3 py-2 text-center">
      <p className="text-sm font-semibold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export function RecipeCard({ recipe, onStartCooking }: Props) {
  const totalMinutes = recipe.prepMinutes + recipe.cookMinutes;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">{recipe.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{recipe.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Total time" value={`${totalMinutes} min`} />
        <Stat label="Calories" value={`${recipe.nutritionEstimate.calories}`} />
        <Stat label="Protein" value={`${recipe.nutritionEstimate.protein_g} g`} />
        <Stat label="Fiber" value={`${recipe.nutritionEstimate.fiber_g} g`} />
      </div>

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
          <Leaf className="size-3.5" />
          Why it&apos;s healthy
        </p>
        <p className="mt-1 text-sm text-foreground">{recipe.healthNotes}</p>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Ingredients
        </h3>
        <ul className="space-y-1.5">
          {recipe.ingredients.map((item, index) => (
            <li key={index}>
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-foreground">{item.name}</span>
                <span className="text-muted-foreground">{item.amount}</span>
              </div>
              {index < recipe.ingredients.length - 1 && (
                <Separator className="mt-1.5" />
              )}
            </li>
          ))}
        </ul>
      </div>

      {recipe.warnings && recipe.warnings.length > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700">
            <TriangleAlert className="size-3.5" />
            Food safety
          </p>
          <ul className="mt-1 list-inside list-disc text-sm text-amber-900">
            {recipe.warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      <Button onClick={onStartCooking} size="lg" className="w-full">
        <ChefHat />
        Start cooking · {recipe.steps.length} steps
      </Button>
    </div>
  );
}
