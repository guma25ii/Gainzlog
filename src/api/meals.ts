import API_BASE from "./client";

export async function getTodaysMeals() {
    const response = await fetch(`${API_BASE}/Meal/today`);

    if (!response.ok) {
        throw new Error("Failed to fetch meals");
    }

    return response.json();
}