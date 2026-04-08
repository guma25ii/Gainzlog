import React from 'react'
import BackBtn from '../../Components/BackBtn'
const ReviewWorkout = () => {
  return (
    <div>ReviewWorkout
        <h1>Review Workout</h1>
        <p>Här ska man kunna se sitt träningspass, lägga till det i enskilda pass eller i ett program </p>
        <p>Alternativt skapa nytt program</p>
        <button>Knapp för att lägga till i progam</button>
        <button>Knapp för att lägga till enskilda pass</button>
        <BackBtn/>
    </div>
  )
}

export default ReviewWorkout