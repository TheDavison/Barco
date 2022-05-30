import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/Header.css";
import logo from '../img/logo.png';

const Header = ({setCurrentUser, currentUser, handleBorrar}) => {
    let navigate = useNavigate();
    let currentRole = "";

    if(localStorage.getItem('currentRole')){
        currentRole = localStorage.getItem('currentRole').split(',');
    }
    
    return (
        <div className="header__container">
            <div className="header__brand">
                {/* <p className="header__brand-logo">Placeholder imagen</p> */}
                <img src={logo} alt='LOGO' className='header__brand-logo'/>
                <p className="header__brand-name">WALLIE SHIP</p>
            </div>
            <nav className="header__nav">
                <Link to={""}>Index</Link>
                {currentUser ? '' : <Link to={"login"}>Login</Link>}
                
                {currentRole.indexOf('ROLE_ADMIN')!=-1 ? <Link to={"admin"}>Admin</Link> : ''}
                {currentUser ? <p onClick={handleBorrar}>Salir</p> : ''}
                
            </nav>
        </div>
    )
}

export default Header