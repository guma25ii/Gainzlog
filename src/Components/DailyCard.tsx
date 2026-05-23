import { useEffect, useState } from "react";


type Props = {
  totals: {
    calories: number,
    protein: number,
    carbs: number,
    fat: number,
  };
};

const DailyCard = ({ totals }: Props) => {



  const [goals, setGoals] = useState({
    calorieGoal: 0,
    proteinGoal: 0,
    carbGoal: 0,
    fatGoal: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem("goals");

    if (saved) {
      setGoals(JSON.parse(saved));
    }
  }, []);

  const safePercent = (value: number, goal: number) =>
    goal === 0 ? 0 : (value / goal) * 100;


  if (goals.calorieGoal === 0) {
    return (
      <div className="progressBar card">
        <h3>Daily Intake</h3>
        <p>Set your goals to start tracking</p>
      </div>
    );
  }



  return (
    <div className="progressBar card">
      <h3>Daily Intake</h3>

      <div className="progressTrack">
        <div
          className="progressFill progressGoal"
          style={{
            width: `${safePercent(totals.calories, goals.calorieGoal)}%`,
          }}
        />
        <span className="progressText">
          Calories: {Math.round(totals.calories)} / {goals.calorieGoal} kcal
        </span>
      </div>

      <div className="progressTrack">
        <div
          className="progressFill progressProtein"
          style={{
            width: `${safePercent(totals.protein, goals.proteinGoal)}%`,
          }}
        />
        <span className="progressText">
          Protein: {Math.round(totals.protein)}g / {goals.proteinGoal}g
        </span>
      </div>

      <div className="progressTrack">
        <div
          className="progressFill progressCarbs"
          style={{
            width: `${safePercent(totals.carbs, goals.carbGoal)}%`,
          }}
        />
        <span className="progressText">
          Carbs: {Math.round(totals.carbs)}g / {goals.carbGoal}g
        </span>
      </div>

      <div className="progressTrack">
        <div
          className="progressFill progressFat"
          style={{
            width: `${safePercent(totals.fat, goals.fatGoal)}%`,
          }}
        />
        <span className="progressText">
          Fats: {Math.round(totals.fat)}g / {goals.fatGoal}g
        </span>
      </div>
    </div>
  );
};

export default DailyCard;