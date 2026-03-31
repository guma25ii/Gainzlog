import { Link } from 'react-router-dom'

function NavBar() {
  return (
        <nav className="NavBar">
            <Link to="/" >Home</Link>
            <Link to="/BuisnessPlan">Affärsplan</Link>
            <Link to="/ProjectIdea" >Projektidé</Link>
            <Link to="/Contact" >Kontakt</Link>
        </nav>
  )
}

export default NavBar