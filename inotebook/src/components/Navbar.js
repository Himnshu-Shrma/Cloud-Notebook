import React,{useContext} from 'react'
import NoteContext from '../context/notes/noteContext';
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const location = useLocation();//use to get location of mouse clicked ans will be useing to highlight
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const { name, getUserData } = context; 
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary  ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>

          </ul>
          {
            localStorage.getItem('token')? <button className="btn btn-info mx-2" onClick={getUserData} >{name}</button>:<span></span>
          }
          {
            !localStorage.getItem('token') ?
              <form className="d-flex">
                <Link className="btn btn-secondary mx-2" to="/login" role='button'>Login</Link>
                <Link className="btn btn-secondary mx-2" to="/signup" role='button'>SignUp</Link>
              </form> :
              <button className="btn btn-secondary mx-2" onClick={handleLogout} >LogOut</button>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar