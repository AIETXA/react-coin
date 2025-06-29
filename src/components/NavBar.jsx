import { Link } from "react-router-dom"

function NavBar () {
  return (
    <nav className="nav">
      <Link to={"/"}>Inicio </Link>
      <Link to={"/favorites"}>Favoritos</Link>
    </nav>
  )
}

export default NavBar