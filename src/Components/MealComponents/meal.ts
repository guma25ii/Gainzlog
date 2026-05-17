export type MealItem = {
  id: number;
  foodId: number;
  name: string;
  grams: number;
};

export type Meal = {
  id: number;
  name: string;
  totals: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  items: MealItem[];
};