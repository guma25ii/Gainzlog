import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const TrainWorkoutPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState<string | null>(null)

  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)

  const [sets, setSets] = useState<Record<string, any[]>>({})
  const [completedSets, setCompletedSets] = useState<Record<string, number[]>>({})

  const workouts = JSON.parse(localStorage.getItem("workouts") || "[]")
  const programs = JSON.parse(localStorage.getItem("programs") || "[]")
  const program = programs.find((p: any) =>
  p.workouts?.some((w: any) => w.id === id)
)

const programId = program?.id

  let workout =
    workouts.find((w: any) => w.id === id)

  if (!workout) {
    for (const program of programs) {
      const found = program.workouts.find((w: any) => w.id === id)
      if (found) {
        workout = found
        break
      }
    }
  }

  if (!workout) {
    return <h3>Workout not found</h3>
  }

  const exercises = workout.workouts
    ? workout.workouts.flatMap((w: any) => w.exercises)
    : workout.exercises

  useEffect(() => {
    let interval: any

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning])

  useEffect(() => {
    const initial: Record<string, any[]> = {}

    exercises.forEach((ex: any) => {
      initial[ex.exerciseId] =
        ex.sets?.length ? ex.sets : [{ reps: 0, weight: 0 }]
    })

    setSets(initial)
  }, [id])

  const toggleSet = (exerciseId: string, setIndex: number) => {
    setCompletedSets(prev => {
      const current = prev[exerciseId] || []
      const exists = current.includes(setIndex)

      return {
        ...prev,
        [exerciseId]: exists
          ? current.filter(i => i !== setIndex)
          : [...current, setIndex]
      }
    })
  }

  const startWorkout = () => {
    setIsRunning(true)
  }

  const finishedWorkout = () => {
    setIsRunning(false)

    const completedWorkout = {
      id: crypto.randomUUID(),
      workoutId: id,
      duration: seconds,
      date: new Date().toISOString(),
      exercises: exercises
    }

    const stored = JSON.parse(localStorage.getItem("completed") || "[]")

    localStorage.setItem(
      "completed",
      JSON.stringify([...stored, completedWorkout])
    )
     setFeedback("Workout finished ")

      setTimeout(() => {
    setFeedback(null)
    navigate("/workouts")
  }, 1200)
  }

  const addSet = (exerciseId: string) => {
    setSets(prev => ({
      ...prev,
      [exerciseId]: [
        ...(prev[exerciseId] || []),
        { reps: 0, weight: 0 }
      ]
    }))
  }

  return (
    <div className="centerContent">
      <h1>{workout.name || "Workout"}</h1>
      <div className="workoutsContainer">

      {isRunning && (
        <h3>
          Time: {Math.floor(seconds / 60)}:
          {String(seconds % 60).padStart(2, "0")}
        </h3>
      )}

      {!isRunning ? (
        <button className="navigationBtn" onClick={startWorkout}>
          Start Workout
        </button>
      ) : (
        <button className="navigationBtn" onClick={finishedWorkout}>
          Finish Workout
        </button>
      )}

      {exercises.map((ex: any) => (
        <div key={ex.exerciseId} className="centerContent">
          <h2>{ex.name}</h2>
          {sets[ex.exerciseId]?.map((set, index) => {
            const completed =
              completedSets[ex.exerciseId]?.includes(index)

            return (
              <div key={index} className="setRow">
                <p>{index + 1}</p>
                <p>Set</p>
                <input className="inputExercise"  value={set.reps}onChange={(e) => {
                    const value = e.target.value
                    if (value === "" || /^[0-9]*$/.test(value)) {
                        setSets(prev => ({
                        ...prev,
                        [ex.exerciseId]: prev[ex.exerciseId].map((s, i) =>
                            i === index
                            ? { ...s, reps: value === "" ? 0 : Number(value) }
                            : s
                        )
                        }))
                    }
                    }}
                    
                /><p>Reps</p>
                <input className="inputExercise" value={set.weight} onChange={(e) => {
                    const value = e.target.value
                    if (value === "" || /^[0-9]*$/.test(value)) {
                        setSets(prev => ({
                        ...prev,
                        [ex.exerciseId]: prev[ex.exerciseId].map((s, i) =>
                            i === index
                            ? { ...s, weight: value === "" ? 0 : Number(value) }
                            : s
                        )
                        }))
                    }
                    }}
                /><p>Kg</p>
                <button className={completed ? "doneBtn active" : "doneBtn"} onClick={() => toggleSet(ex.exerciseId, index)}>✓</button>
              </div>
            )
          })}
          <button className="navigationBtn" onClick={() => addSet(ex.exerciseId)}>+ Add set</button></div>))}
      </div> 
        <button className="navigationBtn"   onClick={() => {
          if (programId) {
          navigate(`/program/${programId}`)
          } else {navigate("/workouts")}}}>Back</button> 
          {feedback && (<div className="toast">{feedback}</div>)}
    </div>
  )
}

export default TrainWorkoutPage