import { useEffect, useState } from 'react';
import DailyCard from '../../Components/DailyCard';
import NavigateBtn from '../../Components/NavigateBtn'
import PageLayout from '../../Components/PageLayouts'
import {useDailyTotals} from '../../context/DailyTotalsContext';
import type { Session } from '../../types/workoutTypes';
import { getAllSessions } from '../../api/workout';
import { useNavigate } from 'react-router-dom';



const StartPage = () => {



  const [activeSession, setActiveSession]= useState<Session | null>(null)

  const navigate = useNavigate()
  const fetchActiveSession = async  () =>  {
    try{
      const data = await getAllSessions()
      const filter = data.filter(f => f.isComplete === false)

        if(filter.length === 0){
        return console.error("No Active Session Found")
      }

      const latest = filter.reduce((acc, current) => {
        return current.id > acc.id ? current : acc

      },filter[0])

      setActiveSession(latest)

    }catch{
      console.error("Could Not Find Active Session")
    }
  }

  useEffect ( ()  => {
  fetchActiveSession()
  },[])
  

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
            <button className="startWorkoutBtn" onClick={() => activeSession ? navigate(`/train/${activeSession.id}`) : undefined}>{activeSession ? "Continue Workout" : "No Active Workout"}</button>
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