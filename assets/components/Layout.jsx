import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
    return (
        <main>
            <nav>
                <Link to={"index"}>Index</Link>
                <Link to={"login"}>Login</Link>
            </nav>
            <section>
                <Outlet />
            </section>
        </main>
    )
}

export default Layout