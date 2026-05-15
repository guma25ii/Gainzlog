
import { useEffect, useState } from 'react'
import BackBtn from '../../Components/BackBtn'
import DailyCard from '../../Components/DailyCard'
import MealSummaryList from '../../Components/MealComponents/MealSummaryList'
import NavigateBtn from '../../Components/NavigateBtn'
import PageLayout from '../../Components/PageLayouts'
import API_BASE from '../../api/client'




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



const MealPage = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const deleteMeal = async (mealId: number) => {
  try {
    await fetch(`${API_BASE}/Meal/${mealId}`, {
      method: "DELETE",
    });

    setMeals((prev) => prev.filter((m) => m.id !== mealId));
  } catch (err) {
    console.error("Failed to delete meal", err);
  }
};

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(`${API_BASE}/Meal/today`);
        const data = await res.json();

        setMeals(data.meals);
      } catch (err) {
        console.error("Failed to load meals");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if  (loading) return <div>Loading...</div>;
  return (
    <PageLayout>
    <div className='centerContent'>
      <h1>Meal Page</h1>
      <DailyCard />
      <h2>Todays Meal</h2>
      <MealSummaryList meals={meals} onDelete={deleteMeal} />
      <NavigateBtn to ="/addmeal">Add Meal</NavigateBtn>
      <BackBtn/>
    </div>
    </PageLayout>
  )
}

export default MealPage