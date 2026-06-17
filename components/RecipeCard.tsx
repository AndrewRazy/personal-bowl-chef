"use client";

import type { Recipe } from "@/lib/types";

type Props = {
  recipe: Recipe;
  onStartCooking: () => void;
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-2 text-center">
      <p className="text-sm font-semibold text-slate-800">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
}

export function RecipeCard({ recipe, onStartCooking }: Props) {
  const totalMinutes = recipe.prepMinutes + recipe.cookMinutes;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{recipe.title}</h2>
        <p className="mt-1 text-sm text-slate-600">{recipe.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Total time" value={`${totalMinutes} min`} />
        <Stat label="Calories" value={`${recipe.nutritionEstimate.calories}`} />
        <Stat label="Protein" value={`${recipe.nutritionEstimate.protein_g} g`} />
        <Stat label="Fiber" value={`${recipe.nutritionEstimate.fiber_g} g`} />
      </div>

      <div className="rounded-xl border border-brand-100 bg-brand-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
          Why it&apos;s healthy
        </p>
        <p className="mt-1 text-sm text-brand-900">{recipe.healthNotes}</p>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Ingredients
        </h3>
        <ul className="space-y-1.5">
          {recipe.ingredients.map((item, index) => (
            <li key={index} className="flex justify-between gap-4 text-sm">
              <span className="text-slate-700">{item.name}</span>
              <span className="text-slate-400">{item.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      {recipe.warnings && recipe.warnings.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
            Food safety
          </p>
          <ul className="mt-1 list-inside list-disc text-sm text-amber-900">
            {recipe.warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={onStartCooking}
        className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
      >
        Start cooking · {recipe.steps.length} steps
      </button>
    </div>
  );
}
