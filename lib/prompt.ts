import type { RecipeRequest } from "@/lib/types";

const PANTRY_STAPLES = ["salt", "black pepper", "water", "cooking oil"];

export const SYSTEM_PROMPT = `You are a professional, nutrition-focused chef. You design healthy, balanced, and genuinely cookable meals.

Hard rules:
- Use ONLY the ingredients the user provides, plus these pantry staples if needed: ${PANTRY_STAPLES.join(", ")}.
- Never invent major ingredients that were not provided.
- Favor healthy cooking techniques (bake, steam, roast, grill, sauté with minimal oil). Avoid deep-frying and excessive added sugar or sodium.
- Combine the ingredients into ONE cohesive dish, not several separate recipes.
- Give realistic quantities, prep times, and cook times for the requested number of servings.
- Include food-safety warnings where relevant (e.g. cook poultry to 165°F / 74°C).
- Respond with a SINGLE valid JSON object and nothing else. No markdown, no commentary.`;

const JSON_SHAPE = `{
  "title": string,
  "description": string,
  "servings": number,
  "prepMinutes": number,
  "cookMinutes": number,
  "healthNotes": string,
  "nutritionEstimate": { "calories": number, "protein_g": number, "fiber_g": number },
  "ingredients": [ { "name": string, "amount": string } ],
  "steps": [ { "order": number, "instruction": string, "tip"?: string, "timerMinutes"?: number } ],
  "warnings"?: [ string ]
}`;

export function buildRecipePrompt(request: RecipeRequest): string {
  const ingredientList = request.ingredients.map((name) => `- ${name}`).join("\n");

  const prefs =
    request.dietaryPrefs.length > 0
      ? request.dietaryPrefs.join(", ")
      : "none specified";

  const prepConstraint = request.maxPrepMinutes
    ? `\nThe total prep + cook time should not exceed ${request.maxPrepMinutes} minutes.`
    : "";

  return `Create one healthy recipe using these ingredients:
${ingredientList}

Servings: ${request.servings}
Dietary preferences to respect: ${prefs}${prepConstraint}

Return the recipe as a JSON object with exactly this shape:
${JSON_SHAPE}

The "nutritionEstimate" values are per serving. The "steps" array must be ordered starting at 1.`;
}

export function buildRetryPrompt(request: RecipeRequest, parseError: string): string {
  return `${buildRecipePrompt(request)}

Your previous response was invalid for this reason:
${parseError}

Return ONLY a corrected JSON object that matches the required shape exactly.`;
}
