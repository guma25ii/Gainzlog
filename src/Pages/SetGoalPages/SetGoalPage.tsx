
import { useState } from 'react';
import BackBtn from '../../Components/BackBtn'
import PageLayout from '../../Components/PageLayouts'
import UserInput from '../../Components/SetGoalComponents/UserInput';
import ActivitySelect from '../../Components/SetGoalComponents/ActivitySelect';
import GoalButtons from '../../Components/SetGoalComponents/GoalButtons';
import Result from '../../Components/SetGoalComponents/Result';
import { calculateBMR, calculateTDEE, calculateGoalCalories} from "../../lib/calories";
import type { ActivityLevel, Goal } from "../../lib/calories";

const SetGoalPage = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);

  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<Goal>("maintain");

  const [savedGoal, setSavedGoal] = useState<Goal>("maintain");
  const [message, setMessage] = useState("");

  const goalLabels: Record<Goal, string> = {
  lose_weight: "Fat loss 🔥",
  maintain: "Maintain ⚖️",
  gain_muscle: "Muscle gain 💪",
};

  const handleSaveGoal = () => {
  setSavedGoal(goal);
  setMessage(`Saved: ${goalLabels[goal]}`);
  };

  const bmr = calculateBMR({
    weight,
    height,
    age,
    gender: "male",
  });

  const tdee = calculateTDEE(bmr, activity);

  const result = calculateGoalCalories(tdee, savedGoal);




  return (
    <PageLayout>
      <div className="centerContent">

        <UserInput
          weight={weight}
          setWeight={setWeight}
          height={height}
          setHeight={setHeight}
          age={age}
          setAge={setAge}
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

        <BackBtn />
      </div>
    </PageLayout>
  );
};

export default SetGoalPage;

