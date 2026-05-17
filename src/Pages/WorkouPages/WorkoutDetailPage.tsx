
import { useParams, useNavigate } from 'react-router-dom'
import PageLayout from '../../Components/PageLayouts'





const WorkoutDetailPage = () => {
    const { id }= useParams()
    const navigate = useNavigate()

    const workouts = JSON.parse(localStorage.getItem("workouts") || "[]")
    let workout = workouts.find((w: any) => w.id === id)
    const programs = JSON.parse(localStorage.getItem("programs") || "[]")
      
    const program = programs.find((p: any) =>
    p.workouts?.some((w: any) => w.id === id)
    )

    const programId = program?.id

    

    if (!workout) {
    for (const program of programs) {
        const found = program.workouts.find((w: any) => w.id === id)
        if (found) {
        workout = found
        break
        }
    }
    }


    if(!workout){
        return <h3>Workout not found</h3>
    }


  return (
    <PageLayout>
    <div className="centerContent">
      <h1>{workout.name || "Workout"}</h1>
      <div className='workoutsContainer'>
      {workout.exercises.map((ex: any) => (
        <div key={ex.exerciseId}>
          <h3>{ex.name}</h3>

          {ex.sets.map((set: any, i: number) => (
            <p key={i}>
              Set {i + 1}: {set.reps} reps / {set.weight} kg
            </p>
          ))}
        </div>
      ))}
    </div>
          <button className='navigationBtn' onClick={() => navigate(`/train/${workout.id}`)}>Start Workout</button>
      <button className="navigationBtn"   onClick={() => {
    if (programId) {
      navigate(`/program/${programId}`)
    } else {
      navigate("/workouts")
    }}}>Back</button>
    </div>
    </PageLayout>
  )
}

export default WorkoutDetailPage