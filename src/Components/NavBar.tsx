import { Link } from 'react-router-dom'

function NavBar() {
  return (
        <nav className="NavBar">
            <Link to="/" >Home</Link>
            <Link to="/buisnessplan">Affärsplan</Link>
            <Link to="/projectidea" >Projektidé</Link>
            <Link to="/contact" >Kontakt</Link>
        </nav>
  )
}

export default NavBar