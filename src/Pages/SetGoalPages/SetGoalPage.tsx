import { useState } from 'react';
import BackBtn from '../../Components/BackBtn'
import PageLayout from '../../Components/PageLayouts'
import UserInput from '../../Components/SetGoalComponents/UserInput';
import ActivitySelect from '../../Components/SetGoalComponents/ActivitySelect';
import GoalButtons from '../../Components/SetGoalComponents/GoalButtons';
import Result from '../../Components/SetGoalComponents/Result';
import { calculateBMR, calculateTDEE, calculateGoalCalories } from "../../lib/calories";
import { useNutrition } from '../../context/NutritionContext';
import type { ActivityLevel, Goal, Gender } from "../../lib/calories";

const SetGoalPage = () => {
  const { setGoals } = useNutrition();

  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState<Gender>("male");

  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<Goal>("maintain");

  const [message, setMessage] = useState("");

  const goalLabels: Record<Goal, string> = {
    lose_weight: "Fat loss",
    maintain: "Maintain",
    gain_muscle: "Muscle gain",
  };

  const bmr = calculateBMR({
    weight,
    height,
    age,
    gender,
  });

  const tdee = calculateTDEE(bmr, activity);

  const result = calculateGoalCalories(tdee, goal);

  const handleSaveGoal = () => {
    const calorieGoal = Math.round(result);
    const proteinGoal = Math.round(calorieGoal * 0.25 / 4);
    const carbGoal = Math.round(calorieGoal * 0.50 / 4);
    const fatGoal = Math.round(calorieGoal * 0.25 / 9);

  const goals = {
    calorieGoal,
    proteinGoal,
    carbGoal,
    fatGoal,
  };

  localStorage.setItem("goals", JSON.stringify(goals));

    setMessage(`Saved: ${goalLabels[goal]}`);
  };

  return (
    <PageLayout>
      <div className="centerContent">
        <h1>Set Your Goal</h1>
        <div className='workoutsContainer'>
        <UserInput
          weight={weight}
          setWeight={setWeight}
          height={height}
          setHeight={setHeight}
          age={age}
          setAge={setAge}
          gender={gender}
          setGender={setGender}
        />

        <ActivitySelect
          activity={activity}
          setActivity={setActivity}
        />

        <GoalButtons
          goal={goal}
          setGoal={setGoal}
        />

        <button className="navigationBtn" onClick={handleSaveGoal}>
          Confirm
        </button>

        {message && <p>{message}</p>}

        <Result result={result} />
        </div>

        <BackBtn />
      </div>
    </PageLayout>
  );
};

export default SetGoalPage;

