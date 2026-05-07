import BackBtn from '../../Components/BackBtn'
import PageLayout from '../../Components/PageLayouts'
import { exercises } from '../../Components/WorkoutComponents/WorkoutMockData'
import { useContext, useState } from 'react'
import { WorkoutContext } from '../../context/WorkoutContext'

const AddWorkoutPage = () => {

  const { selectedExercises, setSelectedExercises } = useContext(WorkoutContext)!

  const [selectedCategory, setSelectedCategory] = useState("chest")

  const categories = Array.from(
    new Set(exercises.map(ex => ex.bodyParts).flat())
  )

  return (
    <PageLayout>
      <div className='centerContent'>
        <h1>Add Workout Page</h1>

        <div className='categoryContainer'>
          {categories.map(category => (
            <button
              className='navigationBtn'
              key={category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className='workoutsContainer'>
          {exercises
            .filter(ex => ex.bodyParts.includes(selectedCategory))
            .map(ex => (
              <button
                key={ex.exerciseId}
                onClick={() =>
                  setSelectedExercises(prev => [...prev, ex])
                }
              >
                {ex.name}
              </button>
            ))}
        </div>

        <button className='navigationBtn'>Review Workout</button>
        <BackBtn />
      </div>
    </PageLayout>
  )
}

export default AddWorkoutPage