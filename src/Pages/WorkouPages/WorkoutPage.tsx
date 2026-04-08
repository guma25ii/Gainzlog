import React from 'react'
import BackBtn from '../../Components/BackBtn'
import NavigateBtn from '../../Components/NavigateBtn'

const WorkoutPage = () => {
  return (
    <div>
      <h1>WorkoutPage</h1>
      <p>Här ska jag ha en Lista för Program alternativt en egen sida för program</p>
      <p> Här ska jag ha en lista för enskilda pass, alternativt en egen sida för detta</p>
      <NavigateBtn to ="/review">Review Workout</NavigateBtn>

      
      <BackBtn/>
      </div>
  )
}

export default WorkoutPage