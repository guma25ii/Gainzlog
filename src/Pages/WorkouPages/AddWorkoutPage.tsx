
import PageLayout from '../../Components/PageLayouts'
import { exercises } from '../../Components/WorkoutComponents/WorkoutMockData'
import { useContext, useEffect, useState } from 'react'
import { WorkoutContext } from '../../context/WorkoutContext'
import type { Exercise } from '../../context/WorkoutContext'
import NavigateBtn from '../../Components/NavigateBtn'
import { useLocation } from "react-router-dom"

const AddWorkoutPage = () => {
  const location = useLocation()

  const { addExercise, selectedExercises } = useContext(WorkoutContext)!
  const [selectedCategory, setSelectedCategory] = useState("chest")
  const [feedback, setFeedback] = useState<string | null>(null)
useEffect(() => {
  if (location.state?.toast) {
    setFeedback(location.state.toast)

    setTimeout(() => {
      setFeedback(null)
    }, 1200)
  }
}, [location.state])


  const categories = Array.from(
    new Set(exercises.map(ex => ex.bodyParts).flat())
  )

const handleAdd = (ex: Exercise) => {
  const exists = selectedExercises.some(
    e => e.exerciseId === ex.exerciseId
  )

  if (exists) {
    setFeedback("Already added")
  } else {
    addExercise(ex)
    setFeedback(`${ex.name} added!`)
  }

  const timer = setTimeout(() => {
    setFeedback(null)
  }, 1200)

  return () => clearTimeout(timer)
}

  return (
    <PageLayout>
      <div className='centerContent'>
        <h1>Add Workout</h1>


        <div className='categoryContainer'>{categories.map(category => (
          <button className='navigationBtn' key={category} onClick={() => setSelectedCategory(category)}>{category}</button>))}
        </div>

        <div className='workoutsContainer'>{exercises.filter(ex => ex.bodyParts.includes(selectedCategory)).map(ex => (
          <button className='navigationBtn' key={ex.exerciseId} onClick={() => handleAdd(ex) }>{ex.name}</button>))}

        </div>

        <NavigateBtn to ="/review">Review Workout</NavigateBtn>
        <NavigateBtn to ="/workouts">Back</NavigateBtn>
      </div>
              {feedback && (
  <div className="toast">
    {feedback}
  </div>
)}
    </PageLayout>
  )
}

export default AddWorkoutPage