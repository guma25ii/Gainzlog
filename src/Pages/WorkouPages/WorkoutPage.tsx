
import { useEffect, useState, } from 'react'
import NavigateBtn from '../../Components/NavigateBtn'
import PageLayout from '../../Components/PageLayouts'
import { useNavigate } from 'react-router-dom'

const WorkoutPage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("programs");

  const [workouts, setWorkouts] = useState<any[]>([])
  const [programs, setPrograms] = useState<any[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteType, setDeleteType] = useState<"program" | "workout" | null>(null)
  

  useEffect(() => {
    const storedWorkouts = JSON.parse(localStorage.getItem("workouts") || "[]")
    setWorkouts(storedWorkouts)
  },[])

  useEffect(() => {
  const storedPrograms = JSON.parse(
    localStorage.getItem("programs") || "[]"
  )

  setPrograms(storedPrograms)
}, [])

  const openDeleteModal = (
    id: string,
    type: "program" | "workout"
  ) => {
    setSelectedId(id)
    setDeleteType(type)
    setDeleteModal(true)
  }
  const handleDelete = () => {
    if (deleteType === "program") {

      const updatedPrograms = programs.filter(
        p => p.id !== selectedId
      )

      setPrograms(updatedPrograms)

      localStorage.setItem(
        "programs",
        JSON.stringify(updatedPrograms)
      )
    }

    if (deleteType === "workout") {

      const updatedWorkouts = workouts.filter(
        w => w.id !== selectedId
      )

      setWorkouts(updatedWorkouts)

      localStorage.setItem(
        "workouts",
        JSON.stringify(updatedWorkouts)
      )
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
              {workouts.map((workout: any) => (
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