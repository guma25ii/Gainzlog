import type { Meal } from "./meal";


type Props = {
  meals: Meal[];
  onDelete: (mealId: number) => void;
  onUpdate: (meal: Meal) => void;
};

const MealSummaryList = ({ meals, onDelete, onUpdate }: Props) => {
  return (
    <div style={{ width: "100%", maxWidth: "500px" }}>
      {meals.map((meal) => (
        <div key={meal.id} className="progressBar card">
          <h3>{meal.name}</h3>

          <p>{Math.round(meal.totals.calories)} kcal</p>
          <p>{Math.round(meal.totals.protein)}g protein</p>
          <p>{Math.round(meal.totals.carbs)}g carbs</p>
          <p>{Math.round(meal.totals.fat)}g fat</p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="navigationBtn"
              onClick={() => onUpdate(meal)}
            >
              Update
            </button>

            <button
              className="navigationBtn"
              onClick={() => onDelete(meal.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealSummaryList;