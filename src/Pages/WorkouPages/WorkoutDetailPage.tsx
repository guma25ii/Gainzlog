
import { useParams, useNavigate } from 'react-router-dom'
import PageLayout from '../../Components/PageLayouts'
import { useEffect, useState } from 'react'
import { getSessionById } from '../../api/workout'






const WorkoutDetailPage = () => {
    const { id }= useParams()
    const navigate = useNavigate()


    const [session, setSession] = useState<any>();

    useEffect(() => {
      const fetch = async () => {
        try{
          const data = await getSessionById(Number(id));
          setSession(data);
        }catch{
          console.error("Failed To Get Session");
        }
      }
      fetch();
    }, [])
    if(!session){
      return <div>Loading...</div>
    }


console.log("session:", session)
  return (
    <PageLayout>
    <div className="centerContent">
      <h1>{session.name || "Workout"}</h1>
      <div className='workoutsContainer'>
      {session.exercise.map((ex: any) => (
        <div key={ex.id}>
          <h3>{ex.name}</h3>
            <p>{ex.sets} Sets {ex.reps} Reps {ex.weight} Kg</p>
        </div>
      ))}
    </div>
          <button className='navigationBtn' onClick={() => navigate(`/train/${session.id}`)}>Start Workout</button>
      <button className="navigationBtn"   onClick={() => {
    if (session.programId) {
      navigate(`/program/${session.programId}`)
    } else {
      navigate("/workouts")
    }}}>Back</button>
    </div>
    </PageLayout>
  )
}

export default WorkoutDetailPage