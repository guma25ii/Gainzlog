import { useEffect, useState } from "react";
import API_BASE from "../../api/client";

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
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [grams, setGrams] = useState<number>(100);
  const [items, setItems] = useState<SelectedItem[]>([]);
  const [saving, setSaving] = useState(false);

  // SEARCH
  useEffect(() => {
    if (query.length < 2) return;

    const delay = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE}/Food/search?query=${query}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  // add item
  const addItem = async () => {
    if (!selectedFood) return;

    try {
      const res = await fetch(`${API_BASE}/Meal/${mealId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foodId: selectedFood.id,
          name: selectedFood.name,
          grams,
        }),
      });

      const data = await res.json();

      setItems((prev) => [
        ...prev,
        {
          itemId: data.id, // viktig
          foodId: selectedFood.id,
          name: selectedFood.name,
          grams,
        },
      ]);

      setSelectedFood(null);
      setQuery("");
      setGrams(100);
    } catch (err) {
      console.error(err);
    }
  };

  // delete item
  const removeItem = async (itemId: number) => {
    try {
      await fetch(`${API_BASE}/Meal/${mealId}/items/${itemId}`, {
        method: "DELETE",
      });

      setItems((prev) => prev.filter((i) => i.itemId !== itemId));
    } catch (err) {
      console.error(err);
    }
  };

  // uppdatera item
  const updateItemGrams = async (itemId: number, newGrams: number) => {
    try {
      await fetch(`${API_BASE}/Meal/${mealId}/items/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grams: newGrams }),
      });

      setItems((prev) =>
        prev.map((i) =>
          i.itemId === itemId ? { ...i, grams: newGrams } : i
        )
      );
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

      {/* sök*/}
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

      {/* select */}
      {selectedFood && (
        <div className="centerContent">
          <p>{selectedFood.name}</p>

          <input className="inputSmall"
            type="number"
            value={grams}
            onChange={(e) => setGrams(Number(e.target.value))}
          />

          <button className="navigationBtn" onClick={addItem}>Add</button>
        </div>
      )}

      {/* lista */}
      <div className="mealadded ">
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
              
            <button className="navigationBtn" onClick={() => updateItemGrams(item.itemId, item.grams)}>Update</button>
            <button className="navigationBtn" onClick={() => removeItem(item.itemId)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <button className="navigationBtn" disabled={saving || items.length === 0} onClick={handleDone}>
        Done
      </button>
    </div>
  );
};

export default MealBuilder;