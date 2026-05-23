import { useContext, useEffect, useState } from 'react'

import PageLayout from '../../Components/PageLayouts'
import { WorkoutContext } from '../../context/WorkoutContext'
import { useNavigate } from "react-router-dom"
import NavigateBtn from '../../Components/NavigateBtn'


const ReviewWorkout = () => {
  const navigate = useNavigate();


  //ett spara fönster dyker upp med alternativ
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [mode, setMode] = useState<"none" | "existing" | "new" | "workout">("none")
  const [programName, setProgramName] = useState("")
  const [workoutName, setWorkoutName] = useState("")
  const programs = JSON.parse(localStorage.getItem("programs") || "[]")
 
  const { selectedExercises, removeExercise, resetWorkout } = useContext(WorkoutContext)!

  //  per exercise: lista av sets
  const [sets, setSets] = useState<
    Record<string, { reps: number; weight: number }[]>
  >({})

  //  lägg till set
  const addSet = (exerciseId: string) => {
    setSets(prev => ({
      ...prev,
      [exerciseId]: [
        ...(prev[exerciseId] || []),
        { reps: 0, weight: 0 }
      ]
    }))
  }

  // Används för att ha set 1 som default när går in på review
 useEffect(() => {
  setSets(prev => {
    const updated = { ...prev }

    selectedExercises.forEach(ex => {
      if (!updated[ex.exerciseId]) {
        updated[ex.exerciseId] = [{ reps: 0, weight: 0 }]
      }
    })

    return updated
  })
}, [selectedExercises])

  // ta bort set
  const removeSet = (exerciseId: string, index: number) => {
    setSets(prev => {
      const updatedSets = prev[exerciseId].filter((_, i) => i !== index)

      //  om inga sets kvar → ta bort hela exercise
      if (updatedSets.length === 0) {
        const { [exerciseId]: _, ...rest } = prev
        removeExercise(exerciseId)
        return rest
      }

      return {
        ...prev,
        [exerciseId]: updatedSets
      }
    })
  }


  const buildWorkout = () => ({
    id: crypto.randomUUID(),
    name: workoutName,
    date: new Date().toISOString(),

    exercises: selectedExercises.map(ex => ({
      exerciseId: ex.exerciseId,
      name: ex.name,
      sets: sets[ex.exerciseId] || []
    }))
  })
  
  const saveWorkout = () => {
    const workout = buildWorkout()
    const existing = JSON.parse(localStorage.getItem("workouts") || "[]")
    localStorage.setItem(
      "workouts",
      JSON.stringify([...existing, workout])
    )
    setShowSaveModal(false);
    setMode("none")
    resetWorkoutBuilder()
  }

  const createNewProgram = () => {
    const workout = buildWorkout()
    const program ={
      id: crypto.randomUUID(),
      name: programName,
      workouts: [workout]
    }

    const existing = JSON.parse(localStorage.getItem("programs") || "[]")
    localStorage.setItem(
      "programs",
      JSON.stringify([...existing, program])
    )
    setShowSaveModal(false)
    setMode("none")
    setProgramName("")
    resetWorkoutBuilder()
  }

const addToProgram = (programId: string) => {
  const workout = buildWorkout()

  const programs = JSON.parse(localStorage.getItem("programs") || "[]")

  const updated = programs.map((p: any) =>
    p.id === programId
      ? {
          ...p,
          workouts: [...p.workouts, workout]
        }
      : p
  )

  localStorage.setItem("programs", JSON.stringify(updated))

  setShowSaveModal(false)
  setMode("none") 
  resetWorkoutBuilder()
}

const resetWorkoutBuilder = () => {
  setSets({})
  setShowSaveModal(false)
  setMode("none")
  resetWorkout()
  navigate("/addworkout", {
    state: {
      toast: "Workout saved!"
    }
  })
}

  return (
  <PageLayout>
    <div className='centerContent'>
      
      <h1>Review Workout</h1>
      <h2>Current settings</h2>
      <div className='workoutsContainer' >
      {selectedExercises.map(ex => (
        <div key={ex.exerciseId}>
          <h3>{ex.name}</h3>
          {sets[ex.exerciseId]?.map((set, index) => (
            <div key={index} className="setRow">
              <p>Set {index + 1}</p>
              <input className="inputSmall" placeholder="Reps" value={set.reps} onChange={(e) =>
                  setSets(prev => ({
                    ...prev,
                    [ex.exerciseId]: prev[ex.exerciseId].map((s, i) =>
                      i === index
                        ? { ...s, reps: Number(e.target.value) }
                        : s
                    )
                  }))
                }
              />
              <input
                className="inputSmall"
                placeholder="Kg"
                value={set.weight}
                onChange={(e) =>
                  setSets(prev => ({
                    ...prev,
                    [ex.exerciseId]: prev[ex.exerciseId].map((s, i) =>
                      i === index
                        ? { ...s, weight: Number(e.target.value) }
                        : s
                    )
                  }))
                }
              />
              <button className="removeBtn" onClick={() => removeSet(ex.exerciseId, index)}>-</button>
            </div>
          ))}
          <button onClick={() => addSet(ex.exerciseId)} className='navigationBtn'>+ Add set</button>
        </div>
      ))}
      <button
        className='navigationBtn'
        onClick={() => { setShowSaveModal(true) 
        setMode("none")
        }}>Save Workout</button>
      {/* modalen */}
      {showSaveModal && (
        <div className="modalOverlay">
          <div className="modalBox">
            {mode === "none" && (
              <>
                <h2>What do you want to do?</h2>
                <button onClick={() => setMode("workout")} className='navigationBtn'>Save as Workout</button>
                <button onClick={() => setMode("existing")} className='navigationBtn'>Add To Existing Program</button>
                <button onClick={() => setMode("new")} className='navigationBtn'>Create New Program</button>
                <button onClick={() => setShowSaveModal(false)} className='navigationBtn'>Cancel</button>
              </>
            )}

            {mode === "new" && (
              <>
                <h3>Create Program</h3>
                <input placeholder="Workout Name" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)}/>
                <input placeholder="Program Name" value={programName} onChange={(e) => setProgramName(e.target.value)}/>
                <button onClick={createNewProgram} className='navigationBtn'>Create Program</button>
                <button onClick={() => setMode("none")} className='navigationBtn'>Back</button>
              </>
            )}
                {mode === "workout" && (
                  <>
                    <h3>Name Workout</h3>
                    <input placeholder="Workout Name" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)}/>
                    <button onClick={saveWorkout} className='navigationBtn'>Save Workout</button>
                    <button onClick={() => setMode("none")} className='navigationBtn'>Back</button>
                  </>
                )}
            {mode === "existing" && (
              <>
                <h3>Choose Program</h3>
                <input placeholder="Workout Name" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)}/>
                {programs.map((p: any) => (
                  <button
                  className='navigationBtn' key={p.id}onClick={() => addToProgram(p.id)}>{p.name}</button>
                ))}
                <button onClick={() => setMode("none")} className='navigationBtn'>Back</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
    <NavigateBtn to ="/addworkout">Back</NavigateBtn>
    </div>
  </PageLayout>
)
}

export default ReviewWorkout