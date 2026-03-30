
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Components/HomePage'
import Contact from './Components/Contact'
import BuisnessPage from './Components/BuisnessPage'

function App() {


  return (
    <div>
    <Routes>
      <Route path='/' element={<HomePage/>}>Hemsidan</Route>
      <Route path='/Components/Contact' element={<Contact/>}>Kontakt</Route>
      <Route path='/Components/BuisnessPage' element={<BuisnessPage/>}>Affärsplan</Route>
      <Route path='/Components/ProjectIdea' element={<BuisnessPage/>}>ProjektIdè</Route>
    </Routes>
    </div>

  )
}

export default App
