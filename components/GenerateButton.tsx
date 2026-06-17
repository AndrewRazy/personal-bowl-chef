"use client";

type Props = {
  disabled: boolean;
  isGenerating: boolean;
  ingredientCount: number;
  onClick: () => void;
};

export function GenerateButton({ disabled, isGenerating, ingredientCount, onClick }: Props) {
  const tooLfew = ingredientCount < 2;
  const label = isGenerating
    ? "Cooking up your recipe…"
    : tooLfew
      ? "Add at least 2 ingredients"
      : "Create Recipe";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
    >
      {isGenerating && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {!isGenerating && <span aria-hidden>✨</span>}
      {label}
    </button>
  );
}
