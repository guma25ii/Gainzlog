import DailyCard from '../../Components/DailyCard';
import NavigateBtn from '../../Components/NavigateBtn'
import PageLayout from '../../Components/PageLayouts'


const StartPage = () => {

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

          <DailyCard />


            <button className="startWorkoutBtn">Start Next Workout</button>
   
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