
import './App.css'
import { Route, Routes } from 'react-router-dom'
import StartPage from './Pages/StartPages/StartPage'
import WorkoutPage from './Pages/WorkouPages/WorkoutPage'
import ProgressPage from './Pages/ProgressPages/ProgressPage'
import SetGoalPage from './Pages/SetGoalPages/SetGoalPage'
import MealPage from './Pages/MealPages/MealPage'
import AddWorkoutPage from './Pages/WorkouPages/AddWorkoutPage'
import ReviewWorkout from './Pages/WorkouPages/ReviewWorkout'
import SettingsPage from './Pages/SettingPages/SettingsPage'
import ProfilePage from './Pages/ProfilePages/ProfilePage'
import ProgressPicturesPage from './Pages/ProgressPages/ProgressPicturesPage'
import AddMealPage from './Pages/MealPages/AddMealPage'
import AddPicturePage from './Pages/ProgressPages/AddPicturePage'
import ProgramPage from './Pages/WorkouPages/ProgramPage'
import WorkoutDetailPage from './Pages/WorkouPages/WorkoutDetailPage'
import TrainWorkoutPage from './Pages/WorkouPages/TrainWorkoutPage'

function App() {


  return (
    <div>
      <main className='MainDiv'> 
      <Routes>
        <Route path='/' element={<StartPage/>} />
        <Route path='/settings' element={<SettingsPage/>} />
        <Route path='/profile' element={<ProfilePage/>} />

        <Route path='/workouts' element={<WorkoutPage/>} />
          <Route path='/addworkout' element={<AddWorkoutPage/>} />
          <Route path='/review' element={<ReviewWorkout/>} />
          <Route path="/program/:id" element={<ProgramPage />} />
          <Route path='/workoutdetail' element={<WorkoutDetailPage/>} />
          <Route path='/train' element={<TrainWorkoutPage/>} />
          <Route path="/workout/:id" element={<WorkoutDetailPage />} />
          <Route  path="/train/:id"element={<TrainWorkoutPage />} />

        <Route path='/progress' element={<ProgressPage/>} />
          <Route path='/pictures' element={<ProgressPicturesPage/>} />
          <Route path='addpicture' element={<AddPicturePage/>} />

        <Route path='/setgoal' element={<SetGoalPage/>} />

        <Route path='/meals' element={<MealPage/>} />
          <Route path='/addmeal' element={<AddMealPage/>} />

        <Route path='/*' element={<h1>Page not Found</h1>}/>
      </Routes>
      </main>
    </div>
  )
}

export default App
