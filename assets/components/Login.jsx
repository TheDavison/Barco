import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = ({setCurrentUser}) => {
    //VARIABLES
    
    const [inputUsername, setInputUsername] = useState("");
    const [inputPass, setInputPass] = useState("");
    let navigate = useNavigate();
    
    //FUNCIONES
    const handleChange = (e) => {
        if(e.target.name === "username"){
            setInputUsername(e.target.value);
            // console.log(inputUsername)
        }
        if(e.target.name === "pass"){
            setInputPass(e.target.value);
            // console.log(inputPass)
        }
    }
    const sessionUser = async  ()=>{
        await axios.get('/user/list')
        .then((response)=>{
            let notLogged = true;
            for(let val in response.data.data){
                if(response.data.data[val]['username']===inputUsername && response.data.data[val]['password']===inputPass){
                    localStorage.setItem('currentUser',inputUsername);
                    localStorage.setItem('currentRole',response.data.data[val]['roles']);
                    setCurrentUser(localStorage.getItem('currentUser'));
                    
                    notLogged=false;    
                    
                }
            }
            if(notLogged){
                alert('Contraseña o usuario incorrectos');
            }
        })
        
        .catch((error)=>{console.log(error)});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputUsername.length === 0 || inputPass.length === 0) {
            alert("Rellene todos los campos");
            return;
        }else{
            sessionUser();
            
            // console.log(localStorage.getItem('currentUser'));
            // console.log(currentUser);
        //   console.log("fusca");
          navigate('/index', {replace:true}); 
        }
    }
    
    return (
        <div>
            <h2>Login Form</h2>
            <form method="post" onSubmit={handleSubmit}>
                <div className="login">
                    <label htmlFor="inputUsername">Nombre </label>
                    <input type="text" value={inputUsername} onChange={handleChange} name="username" id="inputUsername" required autoFocus />
                </div>
                <div className="login">
                    <label htmlFor="inputPass">Contraseña </label>
                    <input type="password" value={inputPass} onChange={handleChange} name="pass" id="inputPass" required autoFocus />
                </div>
                <button type="submit">
                    Entrar
                </button>
                

            </form>
            
        </div>
  )
}

export default Login