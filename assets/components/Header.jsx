import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    
    return (
        <header>
            <nav>
                <Link to={"index"}>Index</Link>
                <Link to={"login"}>Login</Link>
            </nav>
        </header>
    )
}

export default Header