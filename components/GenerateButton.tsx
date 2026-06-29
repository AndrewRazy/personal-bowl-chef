"use client";

import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  disabled: boolean;
  isGenerating: boolean;
  ingredientCount: number;
  onClick: () => void;
};

export function GenerateButton({ disabled, isGenerating, ingredientCount, onClick }: Props) {
  const tooFew = ingredientCount < 2;
  const label = isGenerating
    ? "Cooking up your recipe…"
    : tooFew
      ? "Add at least 2 ingredients"
      : "Create Recipe";

  return (
    <Button onClick={onClick} disabled={disabled} size="lg">
      {isGenerating ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Sparkles />
      )}
      {label}
    </Button>
  );
}
