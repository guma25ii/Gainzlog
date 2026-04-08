
import './App.css'
import { Route, Routes } from 'react-router-dom'
import StartPage from './Pages/StartPages/StartPage'
import WorkoutPage from './Pages/WorkouPages/WorkoutPage'
import ProgressPage from './Pages/ProgressPages/ProgressPage'
import SetGoalPage from './Pages/SetGoalPages/SetGoalPage'
import MealPage from './Pages/MealPages/MealPage'

function App() {


  return (
    <div>
      <main className='MainDiv'>
      <Routes>
        <Route path='/' element={<StartPage/>} />
        <Route path='/workouts' element={<WorkoutPage/>} />
        <Route path='/progress' element={<ProgressPage/>} />
        <Route path='/setgoal' element={<SetGoalPage/>} />
        <Route path='/meals' element={<MealPage/>} />
        <Route path='/*' element={<h1>Page not Found</h1>}/>
      </Routes>
      </main>
    </div>
  )
}

export default App
