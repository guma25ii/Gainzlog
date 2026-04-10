
import NavigateBtn from '../../Components/NavigateBtn'
import PageLayout from '../../Components/PageLayouts'

const StartPage = () => {
  return (
    <PageLayout>
      <header className='headerNav'>
        <NavigateBtn to ="/settings" className="icon-btn">⚙️</NavigateBtn>
        <NavigateBtn to ="/profile" className="icon-btn" >👤</NavigateBtn>
      </header>
        <div className='centerContent'>
            <h1 className='LogoText'>GainzLog</h1>
            <p>Information om Kalorier och förbrukning</p>
            <p>Makros, protein, kolyhdrater, fett</p>
            <button className="startWorkoutBtn">Påbörja Pass, Navigate btn</button>
        </div>
          <div className='navBtnStartPage'>
              <NavigateBtn to ="/workouts">Workouts</NavigateBtn>
              <NavigateBtn to ="/progress">Progress</NavigateBtn>
              <NavigateBtn to ="/setgoal">Set Goal</NavigateBtn>
              <NavigateBtn to ="/meals">Meals</NavigateBtn>
          </div>
    </PageLayout>
  )
}

export default StartPage