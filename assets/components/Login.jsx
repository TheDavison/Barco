import React, { useState } from 'react'

const Login = () => {
    //VARIABLES
    const [user, setUser] = useState([])
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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputUsername.length === 0 || inputPass.length === 0) {
            alert("Rellene todos los campos");
            return;
        }else{
          console.log("fusca");  
        }
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