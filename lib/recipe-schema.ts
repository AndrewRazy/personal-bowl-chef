import { z } from "zod";

export const recipeSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  servings: z.number().int().positive(),
  prepMinutes: z.number().nonnegative(),
  cookMinutes: z.number().nonnegative(),
  healthNotes: z.string().min(1),
  nutritionEstimate: z.object({
    calories: z.number().nonnegative(),
    protein_g: z.number().nonnegative(),
    fiber_g: z.number().nonnegative(),
  }),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1),
        amount: z.string().min(1),
      })
    )
    .min(1),
  steps: z
    .array(
      z.object({
        order: z.number().int().positive(),
        instruction: z.string().min(1),
        tip: z.string().optional(),
        timerMinutes: z.number().nonnegative().optional(),
      })
    )
    .min(1),
  warnings: z.array(z.string()).optional(),
});

export type ParsedRecipe = z.infer<typeof recipeSchema>;

export type RecipeParseResult =
  | { success: true; recipe: ParsedRecipe }
  | { success: false; error: string };

export function parseRecipe(raw: unknown): RecipeParseResult {
  const result = recipeSchema.safeParse(raw);
  if (result.success) {
    return { success: true, recipe: result.data };
  }
  return { success: false, error: z.prettifyError(result.error) };
}
