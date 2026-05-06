
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

          <div className='progressGoal' ><span>Calorie Goal: {goals.calorieGoal}</span></div>
          <div className='progressCurrentGoal'><span>Current Calories: {goals.currentCalories}</span></div>
          <div className='progressProtein'><span>Protein: {goals.currentProtein}</span></div>
          <div className='progressCarbs'><span>Carbs: {goals.currentCarbs}</span></div>
          <div className='progressFat'><span>Fat: {goals.currentFat}</span></div>
      </div>
            <button className="startWorkoutBtn">Påbörja Pass, Navigate btn</button>
   
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