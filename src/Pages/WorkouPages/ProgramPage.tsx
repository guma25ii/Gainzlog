
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { getProgramById } from '../../api/workout';


const ProgramPage = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [program, setProgram] = useState<any>(null)


    useEffect(() => {
        const fetch = async () => {
            try{
                const data = await getProgramById(Number(id))
                setProgram(data);
            }catch{
                console.error("Failed To Get Program");
            }
        }
        fetch()
    },[])

    if(!program){
        return <div>Loading...</div>
    }

  return (
    <div className='centerContent'>
        <h1>{program.name}</h1>
        <div className='workoutsContainer'>
        {program.sessions?.map((w: any) =>  
            <div key={w.id}  onClick={() => {
    console.log("navigerar till session:", w.id)
    w.id && navigate(`/workout/${w.id}`)
}}> <button className='navigationBtn'>{w.name || "Workout"}</button>
            </div>)}
        </div>
        <button className='navigationBtn' onClick={() => navigate(`/workouts`)} >Back</button>
    </div>
  )
}

export default ProgramPage