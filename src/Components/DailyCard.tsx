import { useEffect, useState } from "react";
import API_BASE from "../api/client";

type DailyTotals = {
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
};

type MealResponse = {
  meals: any[];
  dailyTotals: DailyTotals;
};

const DailyCard = () => {
  const [data, setData] = useState<MealResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const [goals, setGoals] = useState({
    calorieGoal: 0,
    proteinGoal: 0,
    carbGoal: 0,
    fatGoal: 0,
  });

  //  Ladda API data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_BASE}/Meal/today`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to load daily data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Ladda mål
  useEffect(() => {
    const saved = localStorage.getItem("goals");

    if (saved) {
      setGoals(JSON.parse(saved));
    }
  }, []);

  // Kalkylator så det börjar på 0
  const safePercent = (value: number, goal: number) =>
    goal === 0 ? 0 : (value / goal) * 100;

  // lodaing state
  if (loading) {
    return <div className="progressBar card">Loading Daily Data...</div>;
  }

  if (!data) {
    return <div className="progressBar card">No data available</div>;
  }

  // När Man inte lagt in mål ännu
  if (goals.calorieGoal === 0) {
    return (
      <div className="progressBar card">
        <h3>Daily Intake</h3>
        <p>Set your goals to start tracking</p>
      </div>
    );
  }

  const totals = data.dailyTotals;

  return (
    <div className="progressBar card">
      <h3>Daily Intake</h3>

      {/* Calories */}
      <div className="progressTrack">
        <div
          className="progressFill progressGoal"
          style={{
            width: `${safePercent(totals.calories, goals.calorieGoal)}%`,
          }}
        />
        <span className="progressText">
          Calories: {totals.calories} / {goals.calorieGoal} kcal
        </span>
      </div>

      {/* Protein */}
      <div className="progressTrack">
        <div
          className="progressFill progressProtein"
          style={{
            width: `${safePercent(totals.protein, goals.proteinGoal)}%`,
          }}
        />
        <span className="progressText">
          Protein: {totals.protein}g / {goals.proteinGoal}g
        </span>
      </div>

      {/* Carbs */}
      <div className="progressTrack">
        <div
          className="progressFill progressCarbs"
          style={{
            width: `${safePercent(totals.carbs, goals.carbGoal)}%`,
          }}
        />
        <span className="progressText">
          Carbs: {totals.carbs}g / {goals.carbGoal}g
        </span>
      </div>

      {/* Fat */}
      <div className="progressTrack">
        <div
          className="progressFill progressFat"
          style={{
            width: `${safePercent(totals.fat, goals.fatGoal)}%`,
          }}
        />
        <span className="progressText">
          Fats: {totals.fat}g / {goals.fatGoal}g
        </span>
      </div>
    </div>
  );
};

export default DailyCard;