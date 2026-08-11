import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ErrorBoundary from "../../Components/ErrorBoundary/ErrorBoundary"
import { createSet, getExerciseInfo, getSessionById, updateSet, completeSession } from "../../api/workout"
import { type ExerciseDetails, type Session, type WorkoutExercise } from "../../types/workoutTypes"








const TrainWorkoutPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState<string | null>(null)

  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)

  const [sets, setSets] = useState<Record<string, any[]>>({})
  const [completedSets, setCompletedSets] = useState<Record<string, number[]>>({})

  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const [exerciseInfo, setExerciseInfo] = useState<ExerciseDetails | null>(null)




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


  const toggleSet = async (exerciseId: number, setIndex: number) => {
    const current = completedSets[exerciseId] || []
    const exists = current.includes(setIndex)
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
    if(!exists){
      const {id, reps, weight} = sets[exerciseId][setIndex]

      await updateSet(id,reps,weight)
    }
    
  }

  const startWorkout = () => {
    setIsRunning(true)
  }

  const finishedWorkout = async (sessionId: number) => {
    setIsRunning(false)
  try{
    await completeSession(sessionId)
  }catch(err){
    console.error("Failed To Complete Session")
    setFeedback("Failed to Save Session, Try Again");
      setTimeout(() => {
      setFeedback(null)
    }, 1200)
      return
  }
    setFeedback("Workout finished ")
    setTimeout(() => {
    setFeedback(null)
    navigate("/workouts")
  }, 1200)
  }


  
  const addSet = async (exerciseId: number) => {
    const newset = await createSet(exerciseId, 0, 0)
    setSets(prev => ({
      ...prev,
      [exerciseId]: [
        ...(prev[exerciseId] || []),
        { id: newset.id, reps: 0, weight: 0 }
      ]
    }))
  }

  const showInfo = async (exerciceId: string) => {
    if(exerciseInfo?.exerciseId === exerciceId){
      setExerciseInfo(null)
      return
    }
    try{
      const info = await getExerciseInfo(exerciceId)
      setExerciseInfo(info)

    }catch(err){
      console.error("Failed To Get Exercise Information")
    }
  }

  const changeexercise = (sessionId: number, id: number) => {
    navigate("/changeexercisepage", {
      state: {
        sessionId: sessionId,
        oldExerciseId: id
      }
    })
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
        <button className="navigationBtn" onClick={() => finishedWorkout(session.id)}>
          Finish Workout
        </button>
      )}

      {session.exercise.map((ex: WorkoutExercise) => (
        <ErrorBoundary key={ex.id} fallback={<p>Could Not Load This Exercise</p>}>
        <div  className="centerContent">
          <h2>{ex.name}</h2>
          <button className="settings" onClick={() => setOpenMenuId(openMenuId === ex.id ? null: ex.id)}>⚙️</button>
          {
            openMenuId === ex.id &&(
              <div>
                <button onClick={() => showInfo(ex.exerciseId)}>Info</button>
                <button onClick={() => {}}>Records</button>
                <button onClick={() => {changeexercise(session.id , ex.id)}}>Change Exercise</button>
              </div>
            )
          }
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
          {exerciseInfo && (
            <div className="modalOverlay">
              <div className="modalBox">
                <h4>{exerciseInfo.name}</h4>
                <img src={exerciseInfo.gifUrl} alt={exerciseInfo.name} />
                  {exerciseInfo.instructions.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                  <button onClick={() => setExerciseInfo(null)}>Cancel</button>
              </div>

            </div>
          )}
    </div>
    
  )
}

export default TrainWorkoutPage