
import { useEffect, useState } from 'react'
import NavigateBtn from '../../Components/NavigateBtn'
import PageLayout from '../../Components/PageLayouts'

const WorkoutPage = () => {

  const [activeTab, setActiveTab] = useState("programs");

  const [workouts, setWorkouts] = useState<any[]>([])

  useEffect(() => {
    const storedWorkouts = JSON.parse(localStorage.getItem("workouts") || "[]")
    setWorkouts(storedWorkouts)
  },[])





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
      <NavigateBtn to ="/">Back</NavigateBtn>
      </div>
      </PageLayout>
  )
}

export default WorkoutPage;