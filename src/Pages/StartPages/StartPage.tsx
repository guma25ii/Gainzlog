import React from 'react'
import NavigateBtn from '../../Components/NavigateBtn'

const StartPage = () => {
  return (
    <div>
        <div>
            <h1>Startsida</h1>
            <p>Information om Kalorier och förbrukning</p>
            <p>Makros, protein, kolyhdrater, fett</p>
            <h2>Påbörja Pass, här ska vara en navigatebtn precis som under för att föra en rätt</h2>
        </div>
            <div>
                <NavigateBtn to ="/workouts">Workouts</NavigateBtn>
                <NavigateBtn to ="/progress">Progress</NavigateBtn>
                <NavigateBtn to ="/setgoal">Set Goal</NavigateBtn>
                <NavigateBtn to ="/meals">Meals</NavigateBtn>
            </div>
    </div>
  )
}

export default StartPage