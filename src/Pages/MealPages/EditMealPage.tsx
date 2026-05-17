import { useEffect, useState } from "react";
import API_BASE from "../../api/client";
import type { Meal, MealItem } from "../../Components/MealComponents/meal";


type Props = {
  meal: Meal;
  onDone: () => void;
};

const EditMealPage = ({ meal, onDone }: Props) => {
  const [items, setItems] = useState<MealItem[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItems(meal.items);
  }, [meal]);

  const updateItem = async (item: MealItem) => {
    await fetch(`${API_BASE}/Meal/${meal.id}/items/${item.foodId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grams: item.grams,
      }),
    });
  };

  const handleDone = async () => {
    setSaving(true);

    try {
      for (const item of items) {
        await updateItem(item);
      }

      onDone();
    } catch (err) {
      console.error("Failed to update meal", err);
    } finally {
      setSaving(false);
    }
  };
  const deleteItem = async (itemId: number) => {
  try {
    await fetch(`${API_BASE}/Meal/${meal.id}/items/${itemId}`, {
      method: "DELETE",
    });

    setItems((prev) => prev.filter((i) => i.id !== itemId));
  } catch (err) {
    console.error("Failed to delete item", err);
  }
};

  return (
    <div className="centerContent">
      <h2>Edit {meal.name}</h2>

      {items.map((item) => (
        <div key={item.foodId} className="mealItem">
          <span>{item.name}</span>

          <input
            type="number"
            value={item.grams}
            onChange={(e) =>
              setItems((prev) =>
                prev.map((i) =>
                  i.foodId === item.foodId
                    ? { ...i, grams: Number(e.target.value) }
                    : i
                )
              )
            }
          />
          <button
            className="navigationBtn"
            onClick={() => deleteItem(item.id)}
            >
            Delete
</button>
        </div>
      ))}

      <button
        className="navigationBtn"
        disabled={saving}
        onClick={handleDone}
      >
        {saving ? "Saving..." : "Done"}
      </button>
    </div>
  );
};

export default EditMealPage;