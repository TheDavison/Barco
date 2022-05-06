import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
    return (
        <main>
            <nav>
                Link a index;
            </nav>

            <section>
                <Outlet />
            </section>
        </main>
    )
}

export default Layout