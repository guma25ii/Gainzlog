import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div>
        <Link to={'/'}>Startsidan</Link>
        <Link to={'/Contact'}>Kontakt</Link>
        <Link to={'/BuisnessPage'}>Affärsplan</Link>
        <Link to={'/ProjectIdea'}>Projektidé</Link>
        
    </div>
  )
}

export default NavBar