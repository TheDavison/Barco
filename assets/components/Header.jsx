import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../public/css/header.css'; 
const Header = ({setCurrentUser,currentUser}) => {
    let navigate = useNavigate();
    let currentRole ='';
    if(localStorage.getItem('currentRole')){

         currentRole = localStorage.getItem('currentRole').split(',');
    }
    // console.log(currentRole);
    // console.log(typeof currentRole);
    const handleBorrar = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentRole');
        setCurrentUser('');
        navigate('/login', {replace:true}); 
    }
    return (
        <header>
            <nav>
                <Link to={"index"}>Index</Link>
                {currentUser ? '' : <Link to={"login"}>Login</Link>}
                {currentUser ? '' : <Link to={"register"}>Register</Link>}
                
                
                {currentRole.indexOf('ROLE_ADMIN')!=-1 ? <Link to={"admin"}>Admin</Link> : ''}
                {currentUser ? <p onClick={handleBorrar}>Salir</p> : ''}
                
            </nav>
        </header>
    )
}

export default Header