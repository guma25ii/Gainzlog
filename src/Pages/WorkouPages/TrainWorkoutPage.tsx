import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const TrainWorkoutPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

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

  //Hitta workout 
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

  // alla övningar
  const exercises = workout.workouts
    ? workout.workouts.flatMap((w: any) => w.exercises)
    : workout.exercises

  //Timer
  useEffect(() => {
    let interval: any

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning])

  //init sets
  useEffect(() => {
    const initial: Record<string, any[]> = {}

    exercises.forEach((ex: any) => {
      initial[ex.exerciseId] =
        ex.sets?.length ? ex.sets : [{ reps: 0, weight: 0 }]
    })

    setSets(initial)
  }, [id])

  //TToggle set
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

  //Start, Finish
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

    navigate("/workouts")
  }

  // lägg till set
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
      {/* Header */}
      <h1>{workout.name || "Workout"}</h1>

      {/* Timer*/}
      {isRunning && (
        <h3>
          Time: {Math.floor(seconds / 60)}:
          {String(seconds % 60).padStart(2, "0")}
        </h3>
      )}

      {/* Start, Finish */}
      {!isRunning ? (
        <button className="navigationBtn" onClick={startWorkout}>
          Start Workout
        </button>
      ) : (
        <button className="navigationBtn" onClick={finishedWorkout}>
          Finish Workout
        </button>
      )}

      {/* övningar */}
      {exercises.map((ex: any) => (
        <div key={ex.exerciseId} className="centerContent">
          <h2>{ex.name}</h2>

          {/* sets */}
          {sets[ex.exerciseId]?.map((set, index) => {
            const completed =
              completedSets[ex.exerciseId]?.includes(index)

            return (
              <div key={index} className="setRow">
                <p>Set {index + 1}</p>

                <input type="number"value={set.reps}onChange={(e) => {
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
                />
                <input type="number" value={set.weight} onChange={(e) => {
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
                />
                <button className={completed ? "doneBtn active" : "doneBtn"} onClick={() => toggleSet(ex.exerciseId, index)}>✓</button>
              </div>
            )
          })}

          {/* lägg till set */}
          <button className="navigationBtn" onClick={() => addSet(ex.exerciseId)}>+ Add set</button>
          <button className="navigationBtn"   onClick={() => {
            if (programId) {
            navigate(`/program/${programId}`)
            } else {
            navigate("/workouts")
            }}}>Back</button>
        </div>
      ))}
    </div>
  )
}

export default TrainWorkoutPage