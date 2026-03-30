
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Components/HomePage'
import Contact from './Components/Contact'
import BuisnessPage from './Components/BuisnessPage'
import NavBar from './Components/NavBar'
import ProjectIdea from './Components/ProjectIdea'
import GitLink from './Components/GitLink'

function App() {


  return (
    <div>
      <header>
      <NavBar/>
    </header>
    <Routes>
      <Route path='/' element={<HomePage/>}>Hemsidan</Route>
      <Route path='Contact' element={<Contact/>}>Kontakt</Route>
      <Route path='BuisnessPage' element={<BuisnessPage/>}>Affärsplan</Route>
      <Route path='/ProjectIdea' element={<ProjectIdea/>}>ProjektIdè</Route>
    </Routes>

    <footer><GitLink/></footer>
    </div>
    

  )
}

export default App
