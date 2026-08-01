import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ErrorBoundary from "../../Components/ErrorBoundary/ErrorBoundary"
import { createExercise, createSet, getSessionById } from "../../api/workout"
import type { Session, WorkoutExercise } from "../../types/workoutTypes"






const TrainWorkoutPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState<string | null>(null)

  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)

  const [sets, setSets] = useState<Record<string, any[]>>({})
  const [completedSets, setCompletedSets] = useState<Record<string, number[]>>({})

  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const fetch = async () => {
      try{
        const data = await getSessionById(Number(id))
        setSession(data)
        }catch{
          console.error("Failed To Fetch Session Id")
        }
      }
      fetch()
    },[])



  useEffect(() => {
    if(!session){
       return 
    }
    const data: Record<string, any[]> = {}

    session.exercise.forEach((ex: any) => {
      data[ex.id] =
        ex.loggedSets?.length ? ex.loggedSets : [{ reps: 0, weight: 0 }]
    })

    setSets(data)
  }, [session])



  useEffect(() => {
    let interval: number

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning])


  const toggleSet = (exerciseId: number, setIndex: number) => {
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

  const finishedWorkout = async () => {
    setIsRunning(false)
     for (const [exerciseId, setsForExercise] of Object.entries(sets)) {

      for (const set of setsForExercise){
        await createSet(Number(exerciseId), set.reps, set.weight)
      }
    }
    setFeedback("Workout finished ")

    setTimeout(() => {
    setFeedback(null)
    navigate("/workouts")
  }, 1200)
  }

  const addSet = (exerciseId: number) => {
    setSets(prev => ({
      ...prev,
      [exerciseId]: [
        ...(prev[exerciseId] || []),
        { reps: 0, weight: 0 }
      ]
    }))
  }

      if(!session){
        return <div>Loading...</div>
    }

  return (
    <div className="centerContent">
      <h1>{session.name || "Workout"}</h1>
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

      {session.exercise.map((ex: WorkoutExercise) => (
        <ErrorBoundary key={ex.id} fallback={<p>Could Not Load This Exercise</p>}>
        <div  className="centerContent">
          <h2>{ex.name}</h2>
          {sets[ex.id]?.map((set, index) => {
            const completed =
              completedSets[ex.id]?.includes(index)

            return (
              <div key={index} className="setRow">
                <p>{index + 1}</p>
                <p>Set</p>
                <input className="inputExercise"  value={set.reps}onChange={(e) => {
                    const value = e.target.value
                    if (value === "" || /^[0-9]*$/.test(value)) {
                        setSets(prev => ({
                        ...prev,
                        [ex.id]: prev[ex.id].map((s, i) =>
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
                        [ex.id]: prev[ex.id].map((s, i) =>
                            i === index
                            ? { ...s, weight: value === "" ? 0 : Number(value) }
                            : s
                        )
                        }))
                    }
                    }}
                /><p>Kg</p>
                <button className={completed ? "doneBtn active" : "doneBtn"} onClick={() => toggleSet(ex.id, index)}>✓</button>
              </div>
            )
          })}
          <button className="navigationBtn" onClick={() => addSet(ex.id)}>+ Add set</button></div>
          </ErrorBoundary>))}
      </div> 
        <button className="navigationBtn"   onClick={() => {
          if (session.programId) {
          navigate(`/program/${session.programId}`)
          } else {navigate("/workouts")}}}>Back</button> 
          {feedback && (<div className="toast">{feedback}</div>)}
    </div>
  )
}

export default TrainWorkoutPage