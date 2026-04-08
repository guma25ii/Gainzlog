import React from 'react'
import BackBtn from '../../Components/BackBtn'
import NavigateBtn from '../../Components/NavigateBtn'


const MealPage = () => {
  return (
    <div>
      <h1>Meal Page</h1>
      <p>Lista med Dagens måltider</p>
      <p>samt kunna se totalen för dagen</p>
      <NavigateBtn to ="/addmeal">Add Meal</NavigateBtn>
      <BackBtn/>
    </div>
  )
}

export default MealPage