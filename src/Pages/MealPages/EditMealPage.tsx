import { useEffect, useState } from "react";
import type { Meal, MealItem } from "../../Components/MealComponents/meal";
import { updateMealItemGrams, removeMealItem } from "../../api/meals";
import { useDailyTotals } from "../../context/DailyTotalsContext";

type Props = {
  meal: Meal;
  onDone: () => void;
};

const EditMealPage = ({ meal, onDone }: Props) => {
  const { refreshDailyTotals } = useDailyTotals();

  const [items, setItems] = useState<MealItem[]>([]);
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    setItems(meal.items);
  }, [meal]);


  const updateItem = async (item: MealItem) => {
    await updateMealItemGrams(
      meal.id,
      item.foodId,
      item.grams
    );
  };

 
const handleDone = async () => {
  setSaving(true);
  try {
    for (const item of items) {
      await updateItem(item);
    }

    await refreshDailyTotals();

    onDone();
  } catch (err) {

  } finally {
    setSaving(false);
  }
};


  const deleteItem = async (itemId: number) => {
    try {
      await removeMealItem(meal.id, itemId);


      setItems((prev) => prev.filter((i) => i.id !== itemId));


      await refreshDailyTotals();
    } catch (err) {
      console.error("Failed to delete item", err);
    }
  };

  return (
    <div className="centerContent">
      <h1>Edit {meal.name}</h1>

      <div className="workoutsContainer">
        {items.map((item) => (
          <div key={item.id} className="centerContent">
            <span>{item.name}</span>

            <input
              className="inputSmall"
              value={item.grams}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((i) =>
                    i.id === item.id
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
      </div>

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