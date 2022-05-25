import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
    const [inputUsername, setInputUsername] = useState("");
    const [inputPass, setInputPass] = useState("");
    const [inputPassRep, setInputPassRep] = useState("");
    const [error, setError] = useState("");
    let navigate = useNavigate();


    const handleChange = (e) => {
        if(e.target.name === "username"){
            setInputUsername(e.target.value);
        }
        if(e.target.name === "pass"){
            setInputPass(e.target.value);
        }
        if(e.target.name === "passRep"){
            setInputPassRep(e.target.value);
        }
        setError("");
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

    const checkUsername = async () => {
        let usernameExists = false;
        await axios.get('/user/list')
        .then((response)=>{
            for(let val in response.data.data){
                if(response.data.data[val]['username']===inputUsername){
                    usernameExists = true;
                    break;    
                }
            }
        })
        .catch((error)=>{console.log(error)});

        return usernameExists;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(checkUsername()){
            if(inputPass === inputPassRep){
                addUser();
                navigate('/login', {replace:true});
            }else{
                setError("Las contraseñas no coinciden.")
            }
        }else{
            setError("Ese nombre de usuario ya existe.")
        } 
    }

    
  return (
    <div className="register__container">
        <form method="post" onSubmit={handleSubmit} className="register__form">
            <h2 className="register__title">Register Form</h2>
            <div className="register__field">
                <input type="text" value={inputUsername} onChange={handleChange} name="username" id="inputUsername" required autoFocus className="register__input" placeholder="Nombre de usuario" />
            </div>

            <div className="register__field">
                <input type="text" value={inputPass} onChange={handleChange} name="pass" id="inputPass" required autoFocus className="register__input" placeholder="Contraseña"/>
            </div>

            <div className="register__field">
                <input type="text" value={inputPassRep} onChange={handleChange} name="passRep" id="inputPassRep" required autoFocus className="register__input" placeholder="Repita la contraseña"/>
            </div>

            {error ? <p className="error_message">{error}</p>:''}

            <button type="submit" className="register__button">
                Entrar
            </button>
        </form>
    </div>
    
  )
}

export default Register