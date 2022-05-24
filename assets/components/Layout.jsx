import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import "../styles/Layout.css";

const Layout = ({setCurrentUser,currentUser} ) => {
    return (
        <div className="layout__container">
            <header className="layout__header">
                <Header setCurrentUser ={setCurrentUser} currentUser={currentUser} />
            </header>
            <main className="layout__main"> 
                <Outlet />
            </main> 
            <footer className="layout__footer">
                <Footer />
            </footer>
        </div>
    )
}

export default Layout