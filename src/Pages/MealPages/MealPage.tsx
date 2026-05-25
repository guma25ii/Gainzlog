import { useEffect, useState } from "react";
import BackBtn from "../../Components/BackBtn";
import DailyCard from "../../Components/DailyCard";
import MealSummaryList from "../../Components/MealComponents/MealSummaryList";
import NavigateBtn from "../../Components/NavigateBtn";
import PageLayout from "../../Components/PageLayouts";
import EditMealPage from "./EditMealPage";
import type { Meal } from "../../Components/MealComponents/meal";
import ErrorBoundary from "../../Components/ErrorBoundary/ErrorBoundary";
import { getTodaysMeals, deleteMeal as deleteMealApi } from "../../api/meals";


const MealPage = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [dailyTotals, setDailyTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const [loading, setLoading] = useState(true);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);

  const fetchMeals = async () => {
    try {
    const data = await getTodaysMeals();

      setMeals(data.meals);
      setDailyTotals(data.dailyTotals);
    } catch (err) {
      console.error("Failed to load meals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const deleteMeal = async (mealId: number) => {
    try {
      await deleteMealApi(mealId);

      fetchMeals();
    } catch (err) {
      console.error("Failed to delete meal", err);
    }
  };

  const handleUpdateMeal = (meal: Meal) => {
    setEditingMeal(meal);
  };

  const handleDoneEditing = () => {
    setEditingMeal(null);
    fetchMeals();
  };

  if (loading) return <div>Loading...</div>;


  if (editingMeal) {
    return (
      <PageLayout>
        <EditMealPage
          meal={editingMeal}
          onDone={handleDoneEditing}
        />

        <button
          className="navigationBtn"
          onClick={() => setEditingMeal(null)}
        >
          Back
        </button>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="centerContent">
        <h1>Meals</h1>
        <div className="workoutsContainer">
          <ErrorBoundary fallback={<p>Could Not load Daily Stats</p>}>
          <DailyCard totals={dailyTotals} />
          </ErrorBoundary>
          <h2 style={{textDecoration: "underline"}} >Todays Meals</h2>
            <MealSummaryList
              meals={meals}
              onDelete={deleteMeal}
              onUpdate={handleUpdateMeal}
            />
          <NavigateBtn to="/addmeal">Add Meal</NavigateBtn>
        </div>
        <BackBtn />
      </div>
    </PageLayout>
  );
};

export default MealPage;