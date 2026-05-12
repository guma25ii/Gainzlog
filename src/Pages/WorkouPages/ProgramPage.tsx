
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
        <div>
        <h1>{program.name}</h1>
        {program.workouts.map(w =>  
            <div key={w.id}  onClick={() => w.id && navigate(`/workout/${w.id}`)}> <h3>{w.name || "Workout"}</h3>
            </div>
        ) }
        </div>
        <button className='navigationBtn' onClick={() => navigate(`/workouts`)} >Back</button>
    </div>
  )
}

export default ProgramPage