
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Components/HomePage'
import Contact from './Components/Contact'
import BuisnessPage from './Components/BuisnessPage'
import NavBar from './Components/NavBar'
import ProjectIdea from './Components/ProjectIdea'

import GitNav from './Components/GitNav'

function App() {


  return (
    <div>
      <header className='Header'>
      <NavBar/>
    </header>
    <main className='MainDiv'>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/projectidea' element={<ProjectIdea/>} />
      <Route path='/buisnessplan' element={<BuisnessPage/>} />
      <Route path='/*' element={<h1>Page not Found</h1>}/>
    </Routes>
    </main>

    <footer className='Footer'><GitNav/></footer>
    </div>
    

  )
}

export default App
