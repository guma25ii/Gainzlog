
import PageLayout from '../../Components/PageLayouts'
import { useContext, useEffect, useState } from 'react'
import { WorkoutContext } from '../../context/WorkoutContext'
import NavigateBtn from '../../Components/NavigateBtn'
import { useLocation } from "react-router-dom"
import { getAllMuscles, getExercisesByBodypart } from '../../api/workout'
import type { ExerciseSummary, Muscle } from '../../types/workoutTypes'


const AddWorkoutPage = () => {
  const location = useLocation()

  const { addExercise, selectedExercises } = useContext(WorkoutContext)!
  const [selectedCategory, setSelectedCategory] = useState("chest")
  const [allCategories, setAllCategories]= useState<Muscle[]>([])
  const [exercisesInCategory, setExercisesInCategory] = useState<ExerciseSummary[]>([])
  const [feedback, setFeedback] = useState<string | null>(null)



  const fetchCategories = async () => {
    try{
        const data = await getAllMuscles();
      setAllCategories(data);
    }catch(err){
      console.error("Failed To fetch Categories")
    }
  }
  useEffect (() => {
    fetchCategories();

  },[])

  const fetchExerciseByBodypart = async () => {
    try{
      const data = await getExercisesByBodypart(selectedCategory);
      setExercisesInCategory(data);
    }catch(err){
      console.error("Failed To Get Exercises In Category")
    }
  }
  useEffect(() => {
    fetchExerciseByBodypart();
  },[selectedCategory])



useEffect(() => {
  if (location.state?.toast) {
    setFeedback(location.state.toast)

    setTimeout(() => {
      setFeedback(null)
    }, 1200)
  }
}, [location.state])

const handleAdd = (ex: ExerciseSummary) => {
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
        <div className='workoutsContainer'>
        <div className='categoryContainer'>{allCategories.map(category => (
          <button className='navigationBtn' key={category.name} onClick={() => setSelectedCategory(category.name)}>{category.name}</button>))}
        </div>
        <div className='exerciseContainer'>{exercisesInCategory.map(ex => (
          <button className='navigationBtn' key={ex.exerciseId} onClick={() => handleAdd(ex) }>{ex.name}</button>))}
        </div>
      </div>
        {feedback && (<div className="toast">{feedback}</div>)}
      <NavigateBtn to ="/review">Review Workout</NavigateBtn>
      <NavigateBtn to ="/workouts">Back</NavigateBtn>
    </div>
  </PageLayout>
  )
}

export default AddWorkoutPage