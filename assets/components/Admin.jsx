import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Admin.css";

const Admin = () => {
  return (
    <div className='admin__container'>
        <h2>Hola admin</h2>
        <nav>
            <Link to={"../adminUsers"}>Usuarios</Link>
            <Link to={"../adminDonations"}>Donaciones</Link>
            {/* <Link to={"adminUsers"}>Usuarios</Link>
            <Link to={"adminUsers"}>Usuarios</Link>
            <Link to={"adminUsers"}>Usuarios</Link>
            <Link to={"adminUsers"}>Usuarios</Link> */}
        </nav>
    </div>
  )
}

export default Admin