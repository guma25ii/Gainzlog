import { Link } from 'react-router-dom'

function NavBar() {
  return (
        <nav className="NavBar">
            <Link to="/" >Home</Link>
            <Link to="/buisnessplan">Affärsplanen</Link>
            <Link to="/projectidea" >Projektidén</Link>
            <Link to="/contact" >Kontakt</Link>
        </nav>
  )
}

export default NavBar