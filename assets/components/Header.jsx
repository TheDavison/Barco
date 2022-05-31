import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/Header.css";
import logo from '../img/logo.png';
import exit from '../img/exit.png';

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
                <Link to={""}><div className='hader__nav__button'>Index</div></Link>
                {currentUser ? '' : <Link to={"login"}><div className='hader__nav__button'>Login</div></Link>}
                
                {currentRole.indexOf('ROLE_ADMIN')!=-1 ? <Link to={"admin"}><div className='hader__nav__button'>Admin</div></Link> : ''}
                {currentUser ? <img src={exit} onClick={handleBorrar} className='header__exit'/> : ''}
                
            </nav>
        </div>
    )
}

export default Header