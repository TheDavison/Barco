import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = ({setCurrentUser}) => {
    //VARIABLES
    const [loging, setLoging] = useState(true)
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
            }else{
                navigate('/', {replace:true});
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
            navigate('/', {replace:true}); 
        }
    }

    const handleChangeForm = () => {
        setLoging(!loging);
    }
    
    return (
        <div className="login__container">
            <button onClick={handleChangeForm} className={loging ? "active" : ""}>Login</button>
            <button onClick={handleChangeForm} className={loging ? "" : "active"}>Register</button>
            
            <form method="post" onSubmit={handleSubmit} className="login__form">
                <h2 className="login__title">Iniciar sesión</h2>
                <div className="login__field">
                    <input type="text" value={inputUsername} onChange={handleChange} name="username" id="inputUsername" required autoFocus className="login__input" placeholder="Nombre de usuario"/>
                </div>

                <div className="login__field">
                    <input type="password" value={inputPass} onChange={handleChange} name="pass" id="inputPass" required autoFocus className="login__input" placeholder="Contraseña"/>
                </div>

                <button type="submit" className="login__button">
                    Entrar
                </button>
            </form>
        </div>
  )
}

export default Login