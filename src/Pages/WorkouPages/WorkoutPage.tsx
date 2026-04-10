
import { Outlet } from 'react-router-dom'
import BackBtn from '../../Components/BackBtn'
import NavigateBtn from '../../Components/NavigateBtn'
import PageLayout from '../../Components/PageLayouts'

const WorkoutPage = () => {
  return (
    <PageLayout>
    <div className='centerContent'>
      <h1>WorkoutPage</h1>
      <p>Här ska jag ha en Lista för Program <br />alternativt en egen sida för program</p>
      <p> Här ska jag ha en lista för enskilda pass, <br /> alternativt en egen sida för detta</p>
      <NavigateBtn to ="/review">Review Workout</NavigateBtn>
      <BackBtn/>
      </div>
      </PageLayout>
  )
}

export default WorkoutPage;