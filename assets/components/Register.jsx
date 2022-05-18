import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [inputUsername, setInputUsername] = useState("");
    const [inputPass, setInputPass] = useState("");
    let navigate = useNavigate();


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
        axios.post('/user/new',{
            username: inputUsername,
            password : inputPass
        })
        .then((response)=>{console.log(response)})
        .then()
        .catch((error)=>{console.log(error.response.data)});

        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser();
        navigate('/login', {replace:true});
    }

    
  return (
    <div>
        <h2>Register Form</h2>
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
    </div>
    
  )
}

export default Register