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

  // SEARCH FOOD
  useEffect(() => {
    if (query.length < 2) return;

    const delay = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE}/Food/search?query=${query}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search failed", err);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  // ADD ITEM TO MEAL
  const addItem = async () => {
    if (!selectedFood) return;

    try {
      const res = await fetch(
        `${API_BASE}/Meal/${mealId}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            foodId: selectedFood.id,
            name: selectedFood.name,
            grams: grams,
          }),
        }
      );

      const data = await res.json();
      console.log("Added item:", data);

      setItems((prev) => [
        ...prev,
        {
        itemId: data.id,
        foodId: selectedFood.id,
        name: selectedFood.name,
        grams,
        },
      ]);

      setSelectedFood(null);
      setQuery("");
      setGrams(100);
    } catch (err) {
      console.error("Failed to add item", err);
    }
  };

  // DONE
  const handleDone = async () => {
    setSaving(true);

    try {
      onDone("Meal saved");
    } catch (err) {
      console.error("Failed to finish meal", err);
    } finally {
      setSaving(false);
    }
  };
    const removeItem = async (itemId: number) => {
    try {
        await fetch(`${API_BASE}/Meal/${mealId}/items/${itemId}`, {
        method: "DELETE",
        });

        setItems((prev) => prev.filter((i) => i.itemId !== itemId));
    } catch (err) {
        console.error("Failed to delete item", err);
    }
    };

  return (
    <div className="centerContent">
      <h2>Build Meal</h2>

      {/* SEARCH */}
      <input
        className="navigationBtn"
        placeholder="Search food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* SEARCH RESULTS */}
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

      {/* SELECTED FOOD */}
      {selectedFood && (
        <div className="centerContent">
          <p>Selected: {selectedFood.name}</p>

          <input
            type="number"
            value={grams}
            onChange={(e) => setGrams(Number(e.target.value))}
          />
          <p>Grams</p>

          <button className="navigationBtn" onClick={addItem}>
            Add to meal
          </button>
        </div>
      )}

      {/* ITEMS LIST */}
      <div className="centerContent">
        <h3>Meal items</h3>

        {items.map((item, index) => (
          <div key={index} className="mealItem">
            {item.name} - {item.grams}g
                <button className="navigationBtn" onClick={() => removeItem(item.itemId)}>
      Delete
    </button>
          </div>
        ))}
      </div>

      {/* DONE */}
      <button
        className="navigationBtn"
        disabled={items.length === 0 || saving}
        onClick={handleDone}
      >
        {saving ? "Saving..." : "Done"}
      </button>
    </div>
  );
};

export default MealBuilder;