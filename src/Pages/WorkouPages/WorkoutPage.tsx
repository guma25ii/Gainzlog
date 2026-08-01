
import { useEffect, useState, } from 'react'
import NavigateBtn from '../../Components/NavigateBtn'
import PageLayout from '../../Components/PageLayouts'
import { useNavigate } from 'react-router-dom'
import { deleteProgram, deleteSession, getAllPrograms, getAllSessions } from '../../api/workout'
import type { Session } from '../../types/workoutTypes'

const WorkoutPage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("programs");

  const [workouts, setWorkouts] = useState<Session[]>([])
  const [programs, setPrograms] = useState<any[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteType, setDeleteType] = useState<"program" | "workout" | null>(null)
  


  const fetchWorkouts = async () => {
    try{
      const data = await getAllSessions();
      const filter = data.filter(s => s.programId === null)
      
      
      setWorkouts(filter)
    }catch{
      console.error("Failed To Fetch Sessions")
    }
  }
  useEffect(() => {
    fetchWorkouts();
  },[])


  const fetchPrograms = async () => {
    try {
      const data = await getAllPrograms()
      setPrograms(data);
      }
      catch(err){
        console.error("Failed To Load Programs");
      }
    }

  useEffect(() => {
    fetchPrograms(); 
  }, [])

  const openDeleteModal = (
    id: number,
    type: "program" | "workout"
  ) => {
    setSelectedId(id)
    setDeleteType(type)
    setDeleteModal(true)
  }



  const handleDelete = async () => {
    if(selectedId === null){
      console.error("Failed To Delete")
        return
    }
    try{
      if(deleteType === "workout"){
      await deleteSession(selectedId);
      fetchWorkouts();
      }
      if (deleteType === "program"){
      await deleteProgram(selectedId);
      fetchPrograms();
      }
    }
    catch{
      console.error("Failed To Delete");
    }
    
    setDeleteModal(false)
    setSelectedId(null)
    setDeleteType(null)
  }



  return (
    <PageLayout>
    <div className='centerContent'>
      <h1>Handle Your Workouts</h1>
      <div className='workoutsContainer'>
              <header className='navBtnStartPage'>
      <button className='navigationBtn' onClick={() => setActiveTab("programs")} >Programs</button>
      <button className='navigationBtn' onClick={() => setActiveTab("workouts")} >Workouts</button>
      </header> 
        <div className='listContainer'>
        {activeTab === "programs" && (<> <h2 className="listTitle">Programs</h2> 
            {programs.map((program: any) => (
              <div  key={program.id} onClick={() => navigate(`/program/${program.id}`)}> 
                <div > 
                <div className="workoutRow">
          <button className="removeBtn"  onClick={(e) => {e.stopPropagation()
           openDeleteModal(program.id, "program")}}>-</button>
          <button className='navigationBtn' >{program.name}</button>
          </div>
        </div>
            </div>
            ))}</>)}
        {activeTab === "workouts" && (
          <>
            <h2 className="listTitle">Workouts</h2>
              {workouts.map((workout: Session) => (
                <div key={workout.id} onClick={() => navigate(`/workout/${workout.id}`)}>
                  <div >
                    <div className="workoutRow">
                    <button className="removeBtn" onClick={(e) => {e.stopPropagation()
                        openDeleteModal(
                          workout.id,
                          "workout")}}>-</button>
              <button className='navigationBtn' >{workout.name}</button>
              </div>
              </div>
            </div>
            ))}
          </>
          )}
        </div>
    </div>
  <NavigateBtn to ="/addworkout">Add Workout</NavigateBtn>
  <NavigateBtn to ="/">Back</NavigateBtn>
    </div>
        {deleteModal && (
        <div className="modalOverlay">
          <div className="modalBox">
        <h2>Delete {deleteType}?</h2>
        <p>Are you sure you want to delete this?</p>
        <button className="navigationBtn" onClick={handleDelete}>Delete</button>
        <button className="navigationBtn" onClick={() => 
        {setDeleteModal(false) 
        setSelectedId(null) 
        setDeleteType(null)}}>
        Cancel
        </button>
      </div>
    </div>
  )}
  </PageLayout>
  )
}

export default WorkoutPage;