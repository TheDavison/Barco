import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import "../styles/Layout.css";

const Layout = ({setCurrentUser,currentUser} ) => {
    return (
        <>
            <Header setCurrentUser ={setCurrentUser} currentUser={currentUser}/>
             <main> 
                <Outlet />
             </main> 
            <Footer />
        </>
    )
}

export default Layout