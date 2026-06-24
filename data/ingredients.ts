import type { Ingredient } from "@/lib/types";

export const INGREDIENTS: Ingredient[] = [
  // Proteins
  { id: "chicken-breast", name: "Chicken Breast", category: "protein", icon: "🍗", sprite: "/sprites/sprite-chicken-breast.png", tags: ["high-protein", "gluten-free", "dairy-free"] },
  { id: "salmon", name: "Salmon", category: "protein", icon: "🐟", sprite: "/sprites/sprite-salmon.png", tags: ["high-protein", "omega-3", "gluten-free", "dairy-free"] },
  { id: "shrimp", name: "Shrimp", category: "protein", icon: "🦐", sprite: "/sprites/sprite-shrimp.png", tags: ["high-protein", "gluten-free", "dairy-free"] },
  { id: "eggs", name: "Eggs", category: "protein", icon: "🥚", sprite: "/sprites/sprite-eggs.png", tags: ["high-protein", "vegetarian", "gluten-free"] },
  { id: "tofu", name: "Tofu", category: "protein", icon: "🧈", sprite: "/sprites/sprite-tofu.png", tags: ["high-protein", "vegetarian", "vegan", "dairy-free", "gluten-free"] },
  { id: "chickpeas", name: "Chickpeas", category: "protein", icon: "🫛", sprite: "/sprites/sprite-chickpeas.png", tags: ["high-protein", "fiber", "vegetarian", "vegan", "dairy-free"] },
  { id: "black-beans", name: "Black Beans", category: "protein", icon: "🫘", sprite: "/sprites/sprite-black-beans.png", tags: ["high-protein", "fiber", "vegetarian", "vegan", "dairy-free"] },
  { id: "lentils", name: "Lentils", category: "protein", icon: "🟤", sprite: "/sprites/sprite-lentils.png", tags: ["high-protein", "fiber", "vegetarian", "vegan", "dairy-free"] },
  { id: "turkey", name: "Ground Turkey", category: "protein", icon: "🦃", sprite: "/sprites/sprite-turkey.png", tags: ["high-protein", "gluten-free", "dairy-free"] },
  { id: "tuna", name: "Tuna", category: "protein", icon: "🐠", sprite: "/sprites/sprite-tuna.png", tags: ["high-protein", "gluten-free", "dairy-free"] },

  // Vegetables
  { id: "broccoli", name: "Broccoli", category: "vegetable", icon: "🥦", sprite: "/sprites/sprite-broccoli.png", tags: ["fiber", "vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },
  { id: "spinach", name: "Spinach", category: "vegetable", icon: "🥬", sprite: "/sprites/sprite-spinach.png", tags: ["iron", "vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },
  { id: "carrot", name: "Carrot", category: "vegetable", icon: "🥕", sprite: "/sprites/sprite-carrot.png", tags: ["fiber", "vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },
  { id: "bell-pepper", name: "Bell Pepper", category: "vegetable", icon: "🫑", sprite: "/sprites/sprite-bell-pepper.png", tags: ["vitamin-c", "vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },
  { id: "tomato", name: "Tomato", category: "vegetable", icon: "🍅", sprite: "/sprites/sprite-tomato.png", tags: ["vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },
  { id: "onion", name: "Onion", category: "vegetable", icon: "🧅", sprite: "/sprites/sprite-onion.png", tags: ["vegetarian", "vegan", "dairy-free", "gluten-free"] },
  { id: "mushroom", name: "Mushroom", category: "vegetable", icon: "🍄", sprite: "/sprites/sprite-mushroom.png", tags: ["vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },
  { id: "zucchini", name: "Zucchini", category: "vegetable", icon: "🥒", sprite: "/sprites/sprite-zucchini.png", tags: ["vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },
  { id: "sweet-potato", name: "Sweet Potato", category: "vegetable", icon: "🍠", sprite: "/sprites/sprite-sweet-potato.png", tags: ["fiber", "vegetarian", "vegan", "dairy-free", "gluten-free"] },
  { id: "corn", name: "Corn", category: "vegetable", icon: "🌽", sprite: "/sprites/sprite-corn.png", tags: ["vegetarian", "vegan", "dairy-free", "gluten-free"] },
  { id: "kale", name: "Kale", category: "vegetable", icon: "🥬", sprite: "/sprites/sprite-kale.png", tags: ["fiber", "vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },
  { id: "cucumber", name: "Cucumber", category: "vegetable", icon: "🥒", sprite: "/sprites/sprite-cucumber.png", tags: ["vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },
  { id: "eggplant", name: "Eggplant", category: "vegetable", icon: "🍆", sprite: "/sprites/sprite-eggplant.png", tags: ["fiber", "vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },

  // Grains
  { id: "brown-rice", name: "Brown Rice", category: "grain", icon: "🍚", sprite: "/sprites/sprite-brown-rice.png", tags: ["fiber", "vegetarian", "vegan", "dairy-free", "gluten-free"] },
  { id: "quinoa", name: "Quinoa", category: "grain", icon: "🌾", sprite: "/sprites/sprite-quinoa.png", tags: ["high-protein", "fiber", "vegetarian", "vegan", "dairy-free", "gluten-free"] },
  { id: "oats", name: "Oats", category: "grain", icon: "🥣", sprite: "/sprites/sprite-oats.png", tags: ["fiber", "vegetarian", "vegan", "dairy-free"] },
  { id: "whole-wheat-pasta", name: "Whole Wheat Pasta", category: "grain", icon: "🍝", sprite: "/sprites/sprite-whole-wheat-pasta.png", tags: ["fiber", "vegetarian", "vegan", "dairy-free"] },
  { id: "couscous", name: "Couscous", category: "grain", icon: "🌾", sprite: "/sprites/sprite-couscous.png", tags: ["vegetarian", "vegan", "dairy-free"] },
  { id: "farro", name: "Farro", category: "grain", icon: "🌾", sprite: "/sprites/sprite-farro.png", tags: ["fiber", "vegetarian", "vegan", "dairy-free"] },
  { id: "barley", name: "Barley", category: "grain", icon: "🌾", sprite: "/sprites/sprite-barley.png", tags: ["fiber", "vegetarian", "vegan", "dairy-free"] },

  // Dairy
  { id: "greek-yogurt", name: "Greek Yogurt", category: "dairy", icon: "🥛", sprite: "/sprites/sprite-greek-yogurt.png", tags: ["high-protein", "vegetarian", "gluten-free"] },
  { id: "feta", name: "Feta Cheese", category: "dairy", icon: "🧀", sprite: "/sprites/sprite-feta.png", tags: ["vegetarian", "gluten-free"] },
  { id: "parmesan", name: "Parmesan", category: "dairy", icon: "🧀", sprite: "/sprites/sprite-parmesan.png", tags: ["vegetarian", "gluten-free"] },
  { id: "mozzarella", name: "Mozzarella", category: "dairy", icon: "🧀", sprite: "/sprites/sprite-mozzarella.png", tags: ["vegetarian", "gluten-free"] },

  // Fruit
  { id: "avocado", name: "Avocado", category: "fruit", icon: "🥑", sprite: "/sprites/sprite-avocado.png", tags: ["healthy-fat", "fiber", "vegetarian", "vegan", "dairy-free", "gluten-free"] },
  { id: "lemon", name: "Lemon", category: "fruit", icon: "🍋", sprite: "/sprites/sprite-lemon.png", tags: ["vitamin-c", "vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },
  { id: "lime", name: "Lime", category: "fruit", icon: "🍈", sprite: "/sprites/sprite-lime.png", tags: ["vitamin-c", "vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },
  { id: "apple", name: "Apple", category: "fruit", icon: "🍎", sprite: "/sprites/sprite-apple.png", tags: ["fiber", "vegetarian", "vegan", "dairy-free", "gluten-free"] },
  { id: "blueberries", name: "Blueberries", category: "fruit", icon: "🫐", sprite: "/sprites/sprite-blueberries.png", tags: ["antioxidant", "vegetarian", "vegan", "dairy-free", "gluten-free"] },
  { id: "banana", name: "Banana", category: "fruit", icon: "🍌", sprite: "/sprites/sprite-banana.png", tags: ["potassium", "vegetarian", "vegan", "dairy-free", "gluten-free"] },

  // Fats
  { id: "olive-oil", name: "Olive Oil", category: "fat", icon: "🫒", sprite: "/sprites/sprite-olive-oil.png", tags: ["healthy-fat", "vegetarian", "vegan", "dairy-free", "gluten-free"] },
  { id: "almonds", name: "Almonds", category: "fat", icon: "🌰", sprite: "/sprites/sprite-almonds.png", tags: ["healthy-fat", "high-protein", "vegetarian", "vegan", "dairy-free", "gluten-free"] },
  { id: "walnuts", name: "Walnuts", category: "fat", icon: "🥜", sprite: "/sprites/sprite-walnuts.png", tags: ["healthy-fat", "omega-3", "vegetarian", "vegan", "dairy-free", "gluten-free"] },
  { id: "chia-seeds", name: "Chia Seeds", category: "fat", icon: "🌱", sprite: "/sprites/sprite-chia-seeds.png", tags: ["healthy-fat", "fiber", "omega-3", "vegetarian", "vegan", "dairy-free", "gluten-free"] },
  { id: "peanut-butter", name: "Peanut Butter", category: "fat", icon: "🥜", sprite: "/sprites/sprite-peanut-butter.png", tags: ["healthy-fat", "high-protein", "vegetarian", "vegan", "dairy-free"] },

  // Spices & aromatics
  { id: "garlic", name: "Garlic", category: "spice", icon: "🧄", sprite: "/sprites/sprite-garlic.png", tags: ["vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },
  { id: "ginger", name: "Ginger", category: "spice", icon: "🫚", sprite: "/sprites/sprite-ginger.png", tags: ["vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },
  { id: "chili", name: "Chili Flakes", category: "spice", icon: "🌶️", sprite: "/sprites/sprite-chili.png", tags: ["vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },
  { id: "basil", name: "Basil", category: "spice", icon: "🌿", sprite: "/sprites/sprite-basil.png", tags: ["vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },
  { id: "cilantro", name: "Cilantro", category: "spice", icon: "🌿", sprite: "/sprites/sprite-cilantro.png", tags: ["vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },
  { id: "cumin", name: "Cumin", category: "spice", icon: "🟫", sprite: "/sprites/sprite-cumin.png", tags: ["vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },
  { id: "paprika", name: "Paprika", category: "spice", icon: "🔴", sprite: "/sprites/sprite-paprika.png", tags: ["vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },
  { id: "turmeric", name: "Turmeric", category: "spice", icon: "🟡", sprite: "/sprites/sprite-turmeric.png", tags: ["vegetarian", "vegan", "dairy-free", "gluten-free", "low-calorie"] },
];

export const CATEGORY_LABELS: Record<Ingredient["category"], string> = {
  protein: "Proteins",
  vegetable: "Vegetables",
  grain: "Grains",
  dairy: "Dairy",
  fruit: "Fruits",
  fat: "Healthy Fats",
  spice: "Spices & Herbs",
  other: "Other",
};

export const CATEGORY_ORDER: Ingredient["category"][] = [
  "protein",
  "vegetable",
  "grain",
  "fruit",
  "dairy",
  "fat",
  "spice",
  "other",
];

export function getIngredientById(id: string): Ingredient | undefined {
  return INGREDIENTS.find((ingredient) => ingredient.id === id);
}
