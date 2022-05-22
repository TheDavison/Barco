import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = ({setCurrentUser,currentUser}) => {
    let navigate = useNavigate();
    const handleBorrar = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser('');
        navigate('/login', {replace:true}); 
    }
    return (
        <header>
            <nav>
                <Link to={"index"}>Index</Link>
                {currentUser ? '' : <Link to={"login"}>Login</Link>}
                {currentUser ? '' : <Link to={"register"}>Register</Link>}
                
                
                <Link to={"admin"}>Admin</Link>
                {currentUser ? <p onClick={handleBorrar}>Cerrar sesión</p> : ''}
                
            </nav>
        </header>
    )
}

export default Header