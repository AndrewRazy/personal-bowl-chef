import { NextResponse } from "next/server";
import { ollamaGenerate, OllamaError } from "@/lib/ollama";
import { buildRecipePrompt, buildRetryPrompt, SYSTEM_PROMPT } from "@/lib/prompt";
import { parseRecipe } from "@/lib/recipe-schema";
import type { DietaryPref, RecipeRequest } from "@/lib/types";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const VALID_PREFS: DietaryPref[] = [
  "vegetarian",
  "vegan",
  "low-sodium",
  "high-protein",
  "dairy-free",
  "gluten-free",
];

function parseRequest(body: unknown): RecipeRequest | { error: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Invalid request body." };
  }

  const { ingredients, servings, dietaryPrefs, maxPrepMinutes } = body as Record<
    string,
    unknown
  >;

  if (!Array.isArray(ingredients) || ingredients.some((i) => typeof i !== "string")) {
    return { error: "`ingredients` must be an array of strings." };
  }

  if (ingredients.length < 2) {
    return { error: "Add at least 2 ingredients to the bowl." };
  }

  const parsedServings =
    typeof servings === "number" && servings > 0 ? Math.round(servings) : 2;

  const parsedPrefs: DietaryPref[] = Array.isArray(dietaryPrefs)
    ? (dietaryPrefs.filter(
        (p): p is DietaryPref => typeof p === "string" && VALID_PREFS.includes(p as DietaryPref)
      ))
    : [];

  const parsedMaxPrep =
    typeof maxPrepMinutes === "number" && maxPrepMinutes > 0
      ? Math.round(maxPrepMinutes)
      : undefined;

  return {
    ingredients: ingredients as string[],
    servings: parsedServings,
    dietaryPrefs: parsedPrefs,
    maxPrepMinutes: parsedMaxPrep,
  };
}

function extractJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    // The model occasionally wraps JSON in stray text; grab the outermost object.
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start !== -1 && end > start) {
      return JSON.parse(raw.slice(start, end + 1));
    }
    throw new Error("Model response was not valid JSON.");
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be JSON." }, { status: 400 });
  }

  const parsed = parseRequest(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const MAX_ATTEMPTS = 2;
  let lastError = "";

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const prompt =
      attempt === 0
        ? buildRecipePrompt(parsed)
        : buildRetryPrompt(parsed, lastError);

    let rawText: string;
    try {
      rawText = await ollamaGenerate({ system: SYSTEM_PROMPT, prompt });
    } catch (error) {
      if (error instanceof OllamaError) {
        return NextResponse.json({ error: error.message }, { status: 503 });
      }
      return NextResponse.json(
        { error: "Unexpected error talking to Ollama." },
        { status: 500 }
      );
    }

    let json: unknown;
    try {
      json = extractJson(rawText);
    } catch {
      lastError = "Response was not valid JSON.";
      continue;
    }

    const result = parseRecipe(json);
    if (result.success) {
      return NextResponse.json({ recipe: result.recipe });
    }
    lastError = result.error;
  }

  return NextResponse.json(
    {
      error:
        "The model could not produce a valid recipe. Try again, or use a more capable model.",
      detail: lastError,
    },
    { status: 502 }
  );
}
