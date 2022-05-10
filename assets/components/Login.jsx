import React, { useState } from 'react'

const Login = () => {
    //VARIABLES
    const [inputUsername, setInputUsername] = useState("");
    const [inputPass, setInputPass] = useState("");
    
    //FUNCIONES
    const handleChange = (e) => {
        if(e.target.name === "username"){
            setInputUsername(e.target.value);
            console.log(inputUsername)
        }
        if(e.target.name === "pass"){
            setInputPass(e.target.value);
            console.log(inputPass)
        }
    }
    const handleSubmit = () => {
        console.log("Funciona")
    }
    return (
    <form method="post" onSubmit={handleSubmit}>
        <div className="login">
            <label htmlFor="inputUsername">Nombre </label>
            <input type="text" value={inputUsername} onChange={handleChange} name="username" id="inputUsername" required autoFocus />
        </div>
        <div className="login">
            <label htmlFor="inputPass">Contraseña </label>
            <input type="text" value={inputPass} onChange={handleChange} name="pass" id="inputPass" required autoFocus />
        </div>
        <button type="submit">
            Entrar
        </button>

    </form>
  )
}

export default Login