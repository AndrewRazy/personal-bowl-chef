"use client";

import { useState } from "react";
import type { Recipe } from "@/lib/types";

type Props = {
  recipe: Recipe;
  onExit: () => void;
};

export function CookingMode({ recipe, onExit }: Props) {
  const steps = [...recipe.steps].sort((a, b) => a.order - b.order);
  const [current, setCurrent] = useState(0);

  const step = steps[current];
  const isFirst = current === 0;
  const isLast = current === steps.length - 1;
  const progress = ((current + 1) / steps.length) * 100;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Cooking
          </p>
          <h2 className="text-lg font-bold text-slate-900">{recipe.title}</h2>
        </div>
        <button
          onClick={onExit}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Back to recipe
        </button>
      </div>

      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-brand-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-1 flex-col rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-brand-600">
            Step {current + 1} of {steps.length}
          </span>
          {step.timerMinutes ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              ⏱ {step.timerMinutes} min
            </span>
          ) : null}
        </div>

        <p className="mt-4 flex-1 text-lg leading-relaxed text-slate-800">
          {step.instruction}
        </p>

        {step.tip ? (
          <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
            <span className="font-semibold text-slate-700">Tip: </span>
            {step.tip}
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={isFirst}
          className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        {isLast ? (
          <button
            onClick={onExit}
            className="flex-1 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Finish
          </button>
        ) : (
          <button
            onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
            className="flex-1 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Next step
          </button>
        )}
      </div>
    </div>
  );
}
