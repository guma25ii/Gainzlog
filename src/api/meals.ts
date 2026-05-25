import API_BASE from "./client";

export async function getTodaysMeals() {
    const response = await fetch(`${API_BASE}/Meal/today`);

    if (!response.ok) {
        throw new Error("Failed to fetch meals");
    }

    return response.json();
}


export const updateMealItemGrams = async (
  mealId: number,
  itemId: number,
  grams: number
) => {
  const res = await fetch(`${API_BASE}/Meal/${mealId}/items/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ grams }),
  });

  if (!res.ok) {
    throw new Error("Failed to update meal item grams");
  }

  return res.json();
};


  export const addMealItem = async (
    mealId: number, 
    foodId: number,
    name: string,
    grams: number
    ) => {
      const res = await fetch(`${API_BASE}/Meal/${mealId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foodId,
          name,
          grams,
        }),
      });
      if(!res.ok){
        throw new Error("Failed To Add Item")
      }
      const data = await res.json();
      return(data);
  };

  export const removeMealItem = async (
    mealId: number,
    itemId: number
  ) => {
    const res = await fetch(`${API_BASE}/Meal/${mealId}/items/${itemId}`, {
        method: "DELETE",
      });
        if (!res.ok) {
    throw new Error("Failed To Delete Meal Item");
  }
  return res.ok;
  };

  export const createMeal = async (name: string) => {
  const res = await fetch(`${API_BASE}/Meal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    throw new Error("Failed To Create Meal");
  }

  return res.json();
};

export const deleteMeal = async (mealId: number) => {
  const res = await fetch(`${API_BASE}/Meal/${mealId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed To Delete Meal");
  }

  return res.ok;
};

export const searchFood = async (query: string) => {
  const res = await fetch(`${API_BASE}/Food/search?query=${query}`);

  if (!res.ok) {
    throw new Error("Failed to search food");
  }

  return res.json();
};

  