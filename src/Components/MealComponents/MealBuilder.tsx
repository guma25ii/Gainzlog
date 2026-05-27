import { useEffect, useState } from "react";
import { updateMealItemGrams, searchFood } from "../../api/meals";
import { addMealItem, removeMealItem } from "../../api/meals";
import { useDailyTotals } from "../../context/DailyTotalsContext";

type Food = {
  id: number;
  name: string;
};

type SelectedItem = {
  itemId: number;
  foodId: number;
  name: string;
  grams: number;
};

type Props = {
  mealId: number;
  onDone: (mealName: string) => void;
};

const MealBuilder = ({ mealId, onDone }: Props) => {
  const { refreshDailyTotals } = useDailyTotals();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [grams, setGrams] = useState<number>(100);
  const [items, setItems] = useState<SelectedItem[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (query.length < 2) return;

    const delay = setTimeout(async () => {
      try {
        const data = await searchFood(query);
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);


  const refresh = async () => {
    await refreshDailyTotals();
  };

  const addItem = async () => {
    if (!selectedFood) return;

    try {
      const data = await addMealItem(
        mealId,
        selectedFood.id,
        selectedFood.name,
        grams
      );

      setItems((prev) => [
        ...prev,
        {
          itemId: data.id,
          foodId: selectedFood.id,
          name: selectedFood.name,
          grams,
        },
      ]);


      await refresh();

      setSelectedFood(null);
      setQuery("");
      setGrams(100);
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      await removeMealItem(mealId, itemId);


      setItems((prev) => prev.filter((i) => i.itemId !== itemId));

      await refresh(); 
    } catch (err) {
      console.error(err);
    }
  };

  const updateItemGrams = async (itemId: number, newGrams: number) => {
    try {
      await updateMealItemGrams(mealId, itemId, newGrams);

      setItems((prev) =>
        prev.map((i) =>
          i.itemId === itemId ? { ...i, grams: newGrams } : i
        )
      );

      await refresh(); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleDone = async () => {
    setSaving(true);
    try {
      onDone("Meal saved");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="centerContent">
      <h2>Build Your Meal</h2>

      <input
        className="navigationBtn"
        placeholder="Search food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="searchResults">
        {results.map((food) => (
          <button
            key={food.id}
            className="navigationBtn"
            onClick={() => setSelectedFood(food)}
          >
            {food.name}
          </button>
        ))}
      </div>

      {selectedFood && (
        <div className="centerContent">
          <p>{selectedFood.name}</p>

          <input
            className="inputSmall"
            type="number"
            value={grams}
            onChange={(e) => setGrams(Number(e.target.value))}
          />

          <button className="navigationBtn" onClick={addItem}>
            Add
          </button>
        </div>
      )}

      <div className="mealadded">
        {items.map((item) => (
          <div key={item.itemId} className="mealItem">
            <span>{item.name}</span>

            <input
              type="number"
              className="inputSmall"
              value={item.grams}
              onChange={(e) => {
                const value = Number(e.target.value);

                setItems((prev) =>
                  prev.map((i) =>
                    i.itemId === item.itemId
                      ? { ...i, grams: value }
                      : i
                  )
                );
              }}
            />

            <div className="mealButtons">
              <button
                className="navigationBtn"
                onClick={() => updateItemGrams(item.itemId, item.grams)}
              >
                Update
              </button>

              <button
                className="navigationBtn"
                onClick={() => removeItem(item.itemId)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="navigationBtn"
        disabled={saving || items.length === 0}
        onClick={handleDone}
      >
        Done
      </button>

      <h6>Source: Livsmedelsverket</h6>
    </div>
  );
};

export default MealBuilder;