import axios from 'axios';
import React, { useState } from 'react'

const Register = () => {
    const [inputUsername, setInputUsername] = useState("");
    const [inputPass, setInputPass] = useState("");


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

    const addUser = () =>{
        axios.post('/user/prueba/new',{
            username: inputUsername,
            password : inputPass
            
        })
        .then((response)=>{console.log(response);})
        .catch((error)=>{console.log(error.response.data);});

        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser();

    }
  return (
    <form method="post" onSubmit={handleSubmit}>
        <div className="register">
            <label htmlFor="inputUsername">Nombre </label>
            <input type="text" value={inputUsername} onChange={handleChange} name="username" id="inputUsername" required autoFocus />
        </div>
        <div className="register">
            <label htmlFor="inputPass">Contraseña </label>
            <input type="text" value={inputPass} onChange={handleChange} name="pass" id="inputPass" required autoFocus />
        </div>
        <button type="submit">
            Entrar
        </button>

    </form>
  )
}

export default Register