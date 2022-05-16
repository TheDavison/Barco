import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const Layout = () => {
    return (
        <body>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </body>
    )
}

export default Layout