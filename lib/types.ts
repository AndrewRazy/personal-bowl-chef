export type IngredientCategory =
  | "protein"
  | "vegetable"
  | "grain"
  | "dairy"
  | "fruit"
  | "spice"
  | "fat"
  | "other";

export type Ingredient = {
  id: string;
  name: string;
  category: IngredientCategory;
  icon: string;
  tags: string[];
};

export type DietaryPref =
  | "vegetarian"
  | "vegan"
  | "low-sodium"
  | "high-protein"
  | "dairy-free"
  | "gluten-free";

export type BowlIngredient = {
  ingredientId: string;
  name: string;
};

export type BowlState = {
  ingredients: BowlIngredient[];
  servings: number;
  dietaryPrefs: DietaryPref[];
  maxPrepMinutes?: number;
};

export type RecipeStep = {
  order: number;
  instruction: string;
  tip?: string;
  timerMinutes?: number;
};

export type Recipe = {
  title: string;
  description: string;
  servings: number;
  prepMinutes: number;
  cookMinutes: number;
  healthNotes: string;
  nutritionEstimate: {
    calories: number;
    protein_g: number;
    fiber_g: number;
  };
  ingredients: { name: string; amount: string }[];
  steps: RecipeStep[];
  warnings?: string[];
};

export type RecipeRequest = {
  ingredients: string[];
  servings: number;
  dietaryPrefs: DietaryPref[];
  maxPrepMinutes?: number;
};

export type HealthStatus = {
  ollama: "connected" | "disconnected";
  model: string;
  availableModels?: string[];
  error?: string;
};
