import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Admin.css";

const Admin = () => {
  return (
    <div className='admin__container'>
        <h2>Hola admin</h2>
        <nav>
            <Link to={"./users"}><div className='admin__nav__button'>Usuarios</div></Link>
            <Link to={"./donations"}><div className='admin__nav__button'>Donaciones</div></Link>
        </nav>
    </div>
  )
}

export default Admin