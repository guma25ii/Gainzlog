import API_BASE from "../../api/client";

export const updateMealItemGrams = async (
  mealId: number,
  foodId: number,
  grams: number
) => {
  const res = await fetch(
    `${API_BASE}/Meal/${mealId}/items/${foodId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ grams }),
    }
  );

  return res.json();
};