
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

function App() {


  return (
    <div>
      <main className='MainDiv'> 
      <Routes>
        <Route path='/' element={<StartPage/>} />
        <Route path='/settings' element={<SettingsPage/>} />
        <Route path='/profile' element={<ProfilePage/>} />


        {/* Ska lägga till nested sidor senare, nu har jag bara skapat sidorna */}

        {/* Workout med undersidor */}
        <Route path='/workouts' element={<WorkoutPage/>} />
          <Route path='/addworkout' element={<AddWorkoutPage/>} />
          <Route path='/review' element={<ReviewWorkout/>} />
          
        {/* Progress med undersida */}
        <Route path='/progress' element={<ProgressPage/>} />
          <Route path='/pictures' element={<ProgressPicturesPage/>} />

        <Route path='/setgoal' element={<SetGoalPage/>} />

        {/* Meals med undersida */}
        <Route path='/meals' element={<MealPage/>} />
          <Route path='/addmeal' element={<AddMealPage/>} />

        <Route path='/*' element={<h1>Page not Found</h1>}/>
      </Routes>
      </main>
    </div>
  )
}

export default App
