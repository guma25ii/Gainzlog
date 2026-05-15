import API_BASE from "../../api/client";

type Meal = {
  id: number;
  name: string;
  totals: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
};

type Props = {
  meals: Meal[];
  onDelete: (mealId: number) => void;
};

const MealSummaryList = ({ meals, onDelete }: Props) => {
  return (
    <div style={{ width: "100%", maxWidth: "500px" }}>
      {meals.map((meal) => (
        <div key={meal.id} className="progressBar card">
          <h3>{meal.name}</h3>

          <p>{meal.totals.calories} kcal</p>
          <p>{meal.totals.protein}g protein</p>
          <p>{meal.totals.carbs}g carbs</p>
          <p>{meal.totals.fat}g fat</p>

          <button
            className="navigationBtn"
            onClick={() => onDelete(meal.id)}
          >
            Delete meal
          </button>
        </div>
      ))}
    </div>
  );
};

export default MealSummaryList;