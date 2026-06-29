"use client";

import type { DietaryPref } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

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
    <Card className="gap-5 bg-card/80 py-5 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-base">Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Servings</Label>
            <span className="text-sm font-semibold text-primary">{servings}</span>
          </div>
          <Slider
            min={1}
            max={6}
            step={1}
            value={[servings]}
            onValueChange={(values) => onServingsChange(values[0])}
          />
        </div>

        <div className="space-y-2">
          <Label>Dietary preferences</Label>
          <div className="flex flex-wrap gap-2">
            {DIETARY_OPTIONS.map((option) => {
              const active = dietaryPrefs.includes(option.value);
              return (
                <Button
                  key={option.value}
                  type="button"
                  size="sm"
                  variant={active ? "default" : "outline"}
                  onClick={() => onTogglePref(option.value)}
                  className="h-8 rounded-full px-3 text-xs"
                >
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Max total time</Label>
            <span className="text-sm font-semibold text-primary">
              {maxPrepMinutes ? `${maxPrepMinutes} min` : "Any"}
            </span>
          </div>
          <Slider
            min={0}
            max={90}
            step={15}
            value={[maxPrepMinutes ?? 0]}
            onValueChange={(values) => {
              const value = values[0];
              onMaxPrepChange(value === 0 ? undefined : value);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
