
import { useNavigate, useParams } from 'react-router-dom'


const ProgramPage = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    type Program = {
    id: string
    name: string
    workouts: any[]
    }

    const programs: Program[] = JSON.parse(localStorage.getItem("programs") || "[]") as any[]
    const program = programs.find((p: Program) => p.id === id)
    console.log("PROGRAM ID FRÅN URL:", id)

    if(!program){
        return <h2>Could not find program</h2> 
    }


  return (
    <div className='centerContent'>
        
        <h1>{program.name}</h1>

        <div className='workoutsContainer'>
        {program.workouts.map(w =>  
            <div key={w.id}  onClick={() => w.id && navigate(`/workout/${w.id}`)}> <button className='navigationBtn'>{w.name || "Workout"}</button>
            </div>)}
        </div>
        <button className='navigationBtn' onClick={() => navigate(`/workouts`)} >Back</button>
    </div>
  )
}

export default ProgramPage