"use client";

import type { DietaryPref } from "@/lib/types";

const DIETARY_OPTIONS: { value: DietaryPref; label: string }[] = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "high-protein", label: "High protein" },
  { value: "low-sodium", label: "Low sodium" },
  { value: "dairy-free", label: "Dairy-free" },
  { value: "gluten-free", label: "Gluten-free" },
];

type Props = {
  servings: number;
  dietaryPrefs: DietaryPref[];
  maxPrepMinutes?: number;
  onServingsChange: (value: number) => void;
  onTogglePref: (pref: DietaryPref) => void;
  onMaxPrepChange: (value: number | undefined) => void;
};

export function PreferencesPanel({
  servings,
  dietaryPrefs,
  maxPrepMinutes,
  onServingsChange,
  onTogglePref,
  onMaxPrepChange,
}: Props) {
  return (
    <div className="space-y-5 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">Servings</label>
          <span className="text-sm font-semibold text-brand-600">{servings}</span>
        </div>
        <input
          type="range"
          min={1}
          max={6}
          value={servings}
          onChange={(event) => onServingsChange(Number(event.target.value))}
          className="mt-2 w-full accent-brand-500"
        />
      </div>

      <div>
        <span className="text-sm font-medium text-slate-700">Dietary preferences</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {DIETARY_OPTIONS.map((option) => {
            const active = dietaryPrefs.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onTogglePref(option.value)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition
                  ${active
                    ? "border-brand-500 bg-brand-500 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-brand-300"}`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">Max total time</label>
          <span className="text-sm font-semibold text-brand-600">
            {maxPrepMinutes ? `${maxPrepMinutes} min` : "Any"}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={90}
          step={15}
          value={maxPrepMinutes ?? 0}
          onChange={(event) => {
            const value = Number(event.target.value);
            onMaxPrepChange(value === 0 ? undefined : value);
          }}
          className="mt-2 w-full accent-brand-500"
        />
      </div>
    </div>
  );
}
