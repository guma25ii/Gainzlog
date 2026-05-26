import DailyCard from '../../Components/DailyCard';
import NavigateBtn from '../../Components/NavigateBtn'
import PageLayout from '../../Components/PageLayouts'
import {useDailyTotals} from '../../context/DailyTotalsContext';


const StartPage = () => {

  const {dailyTotals} = useDailyTotals();
  return (
    <PageLayout>
      <div className='centerContent'>
            <h1 className='LogoText'>GainzLog</h1>
        <div className='workoutsContainer'>
      <header className='headerNav'>
        <NavigateBtn to ="/settings" className="icon-btn">⚙️</NavigateBtn>
        <NavigateBtn to ="/profile" className="icon-btn" >👤</NavigateBtn>
      </header>
          <DailyCard totals={dailyTotals}/>
            <button className="startWorkoutBtn">Start Next Workout</button>
          <div className='navBtnStartPage'>
              <NavigateBtn to ="/workouts">Workouts</NavigateBtn>
              <NavigateBtn to ="/progress">Progress</NavigateBtn>
              <NavigateBtn to ="/setgoal">Set Goal</NavigateBtn>
              <NavigateBtn to ="/meals">Meals</NavigateBtn>
          </div>
          </div>
          </div>
    </PageLayout>
  )
}

export default StartPage