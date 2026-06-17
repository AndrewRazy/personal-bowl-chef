import type { IngredientCategory } from "@/lib/types";

export const CATEGORY_STYLES: Record<
  IngredientCategory,
  { chip: string; dot: string }
> = {
  protein: { chip: "bg-rose-50 border-rose-200 hover:border-rose-300", dot: "bg-rose-400" },
  vegetable: { chip: "bg-green-50 border-green-200 hover:border-green-300", dot: "bg-green-500" },
  grain: { chip: "bg-amber-50 border-amber-200 hover:border-amber-300", dot: "bg-amber-400" },
  fruit: { chip: "bg-fuchsia-50 border-fuchsia-200 hover:border-fuchsia-300", dot: "bg-fuchsia-400" },
  dairy: { chip: "bg-sky-50 border-sky-200 hover:border-sky-300", dot: "bg-sky-400" },
  fat: { chip: "bg-yellow-50 border-yellow-200 hover:border-yellow-300", dot: "bg-yellow-500" },
  spice: { chip: "bg-orange-50 border-orange-200 hover:border-orange-300", dot: "bg-orange-400" },
  other: { chip: "bg-slate-50 border-slate-200 hover:border-slate-300", dot: "bg-slate-400" },
};
