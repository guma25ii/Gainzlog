import { useState } from "react";
import BackBtn from "../../Components/BackBtn";
import PageLayout from "../../Components/PageLayouts";
import API_BASE from "../../api/client";
import MealBuilder from "../../Components/MealComponents/MealBuilder";

const AddMealPage = () => {
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mealId, setMealId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const mealTypes = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
    "MorningSnack",
    "AfternoonSnack",
    "EveningSnack",
    "NightSnack",
  ];

  const handleCreateMeal = async () => {
    if (!selectedMeal) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/Meal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: selectedMeal,
        }),
      });

      const data = await res.json();

      console.log("Created Meal", data);

      setMealId(data.id); 
    } catch (err) {
      console.error("Failed to create Meal", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="centerContent">
        <h1>Add Meal</h1>
        <div className="workoutsContainer" >

        {/* visas om inget meal är skapt*/}
        {!mealId && (
          <>
            <h3>Choose meal type</h3>

            <div className="mealSelect">
              {mealTypes.map((meal) => (
                <button
                  key={meal}
                  onClick={() => setSelectedMeal(meal)}
                  className={`navigationBtn ${
                    selectedMeal === meal ? "active" : ""
                  }`}
                >
                  {meal}
                </button>
              ))}
            </div>

            <button
              className="navigationBtn"
              disabled={!selectedMeal || loading}
              onClick={handleCreateMeal}
            >
              {loading ? "Creating..." : "Create Meal"}
            </button>

            {selectedMeal && <p>Selected: {selectedMeal}</p>}
          </>
        )}
          {/* visa mealbuilder */}
          {mealId && (
          <MealBuilder
            mealId={mealId}
            onDone={() => {
              setToast(`${selectedMeal} added!`);
              setMealId(null);
              setSelectedMeal(null);

              setTimeout(() => setToast(null), 3000);
            }}
          />
        )}
        </div>
        <BackBtn />
      </div>
      {toast && <div className="toast">{toast}</div>}
    </PageLayout>
    
  );
};

export default AddMealPage;