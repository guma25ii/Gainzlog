
import { useState } from 'react'
import BackBtn from '../../Components/BackBtn'
import NavigateBtn from '../../Components/NavigateBtn'
import PageLayout from '../../Components/PageLayouts'

const WorkoutPage = () => {

  const [activeTab, setActiveTab] = useState("programs");





  return (
    <PageLayout>
    <div className='centerContent'>
      <header className='navBtnStartPage'>
      <button className='navigationBtn' onClick={() => setActiveTab("programs")} >Programs</button>
      <button className='navigationBtn' onClick={() => setActiveTab("workouts")} >Workouts</button>
      </header> 
      <div className='workoutsContainer'>
        {activeTab === "programs" && (<h3> ProgramList </h3>)}
        {activeTab === "workouts" && (<h3> WorkoutList </h3>)}
      </div>
      <NavigateBtn to ="/addworkout">Add Workout</NavigateBtn>
      <BackBtn/>
      </div>
      </PageLayout>
  )
}

export default WorkoutPage;