
import NavigateBtn from '../../Components/NavigateBtn'
import PageLayout from '../../Components/PageLayouts'
import { useNutrition } from '../../context/NutritionContext'

const StartPage = () => {
  const {goals} = useNutrition();
  return (
    <PageLayout>
      <div className='centerContent'>
      <header className='headerNav'>
        <NavigateBtn to ="/settings" className="icon-btn">⚙️</NavigateBtn>
        <NavigateBtn to ="/profile" className="icon-btn" >👤</NavigateBtn>
      </header>

        <div>
            <h1 className='LogoText'>GainzLog</h1>
          </div>

<div className='progressBar'>
<h3>Daily Intake</h3>
  {/* Calories */}
<div className="progressTrack">
  <div className="progressFill progressGoal"style={{ width: `${(goals.currentCalories / goals.calorieGoal) * 100}%`}}/>
    <span className="progressText">Calories: {goals.currentCalories} / {goals.calorieGoal} kcal</span>
</div>

 {/* Protein */}
<div className="progressTrack">
  <div className="progressFill progressProtein" style={{ width: `${(goals.currentProtein / goals.proteinGoal) * 100}%`}}/>
  <span className="progressText">Protein: {goals.currentProtein}g</span>
</div>

  {/* Carbs */}
  <div className="progressTrack">
    <div className="progressFill progressCarbs" style={{ width: `${(goals.currentCarbs / goals.carbGoal) * 100}%`}}/>
    <span className='progressText'>Carbs: {goals.currentCarbs}</span>
  </div>

  {/* Fat */}
  <div className="progressTrack">
    <div className="progressFill progressFat" style={{ width: `${(goals.currentFat / goals.fatGoal) * 100}%`}}/>
    <span className='progressText'>Fats: {goals.currentFat}</span>
  </div>

</div>
            <button className="startWorkoutBtn">Start Workout</button>
   
          <div className='navBtnStartPage'>
              <NavigateBtn to ="/workouts">Workouts</NavigateBtn>
              <NavigateBtn to ="/progress">Progress</NavigateBtn>
              <NavigateBtn to ="/setgoal">Set Goal</NavigateBtn>
              <NavigateBtn to ="/meals">Meals</NavigateBtn>
          </div>
          </div>
    </PageLayout>
  )
}

export default StartPage