"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Timer } from "lucide-react";
import type { Recipe } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Cooking
          </p>
          <h2 className="text-lg font-bold text-foreground">{recipe.title}</h2>
        </div>
        <Button variant="outline" size="sm" onClick={onExit}>
          Back to recipe
        </Button>
      </div>

      <Progress value={progress} className="mb-4" />

      <Card className="flex-1 py-6">
        <CardContent className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-primary">
              Step {current + 1} of {steps.length}
            </span>
            {step.timerMinutes ? (
              <Badge
                variant="secondary"
                className="bg-amber-50 text-amber-700"
              >
                <Timer />
                {step.timerMinutes} min
              </Badge>
            ) : null}
          </div>

          <p className="mt-4 flex-1 text-lg leading-relaxed text-foreground">
            {step.instruction}
          </p>

          {step.tip ? (
            <div className="mt-4 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Tip: </span>
              {step.tip}
            </div>
          ) : null}
        </CardContent>
      </Card>

      <div className="mt-4 flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={isFirst}
        >
          <ChevronLeft />
          Previous
        </Button>
        {isLast ? (
          <Button className="flex-1" onClick={onExit}>
            Finish
          </Button>
        ) : (
          <Button
            className="flex-1"
            onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
          >
            Next step
            <ChevronRight />
          </Button>
        )}
      </div>
    </div>
  );
}
