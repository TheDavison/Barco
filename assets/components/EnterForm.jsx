import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EnterForm.css";

const EnterForm = ({ setCurrentUser, currentUser }) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [inputPassRep, setInputPassRep] = useState("");
  const [error, setError] = useState("");
  const [loging, setLoging] = useState(true);

  let navigate = useNavigate();

  const handleChangeForm = (type) => {
    setLoging(type);
  };

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setInputUsername(e.target.value);
    }
    if (e.target.name === "pass") {
      setInputPass(e.target.value);
    }
    if (e.target.name === "passRep") {
      setInputPassRep(e.target.value);
    }
    setError("");
  };

  const checkInputs = () => {
    let mayContinue = false;

    if (inputUsername.trim().length != 0 && inputPass.trim().length != 0) {
      mayContinue = true;
    }

    return mayContinue;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loging) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  //------------Métodos de register------------

  const handleRegister = async () => {
    if (checkInputs()) {
        let usernameExists = await checkUsername();
      if (!usernameExists) {
        if (inputPass === inputPassRep) {
          addUser();
          setInputUsername("");
          setInputPass("");
          setInputPassRep("");
          setLoging(true);
        } else {
          setError("Las contraseñas no coinciden.");
        }
      } else {
        setError("Ese nombre de usuario ya existe.");
      }
    } else {
      setError("Rellene todos los campos por favor.");
    }
  };

  const checkUsername = async () => {
    let usernameExists = false;
    await axios
      .get("/user/list")
      .then((response) => {
        for (let val in response.data.data) {
          if (response.data.data[val]["username"] === inputUsername) {
            usernameExists = true;
            break;
          }
        }
      })
      .catch((error) => {
        setError("Ha ocurrido un error, intente de nuevo más tarde por favor.");
      });

    return usernameExists;
  };

  const addUser = () => {
    axios
      .post("/user/new", {
        username: inputUsername.trim(),
        password: inputPass.trim(),
      })
      .then(console.log("Todo ok"))
      .catch((error) => {
        setError("Ha ocurrido un error, intente de nuevo más tarde por favor.");
      });
  };

  //------------Métodos de login------------

  const handleLogin = async () => {
    if (checkInputs() === true) {
      let puedeContinuar = await sessionUser();
        if(puedeContinuar){
            navigate("/", { replace: true });
         
        }else{
            setError("Credenciales incorrectas, pruebe de nuevo");
        }
        
    } else {
      setError("Rellene todos los campos por favor.");
    }
  };

  const sessionUser = async () => {
    let mayLogIn = false;
    await axios
      .get("/user/list")
      .then((response) => {
        for (let val in response.data.data) {
            console.log(
                response.data.data[val]["username"],
                inputUsername.trim(),
                response.data.data[val]["password"],
                inputPass.trim()
              );
          if (
            response.data.data[val]["username"] === inputUsername.trim() &&
            response.data.data[val]["password"] === inputPass.trim()
          ) {
            localStorage.setItem("currentUser", inputUsername);
            localStorage.setItem(
              "currentRole",
              response.data.data[val]["roles"]
            );
            setCurrentUser(localStorage.getItem("currentUser"));

            mayLogIn = true;
          }
        }
      })
      .catch((error) => {
        setError("Ha ocurrido un error, intente de nuevo más tarde por favor.");
      });
    return mayLogIn;
  };

  //------------FIN------------
  return (
    <div className="enter__container">
      <form method="post" onSubmit={handleSubmit} className="enter__form">
        <div className="enter__changeForm">
          <div
            onClick={() => handleChangeForm(true)}
            className={
              loging
                ? "form__active enter__cambiar"
                : "form__disabled enter__cambiar"
            }
          >
            Login
          </div>
          <div
            onClick={() => handleChangeForm(false)}
            className={
              loging
                ? "form__disabled enter__cambiar"
                : "form__active enter__cambiar"
            }
          >
            Register
          </div>
        </div>

        <h2 className="enter__title">
          {loging ? "Iniciar Sesión" : "Regístrate!"}
        </h2>
        <div className="enter__field">
          <input
            type="text"
            value={inputUsername}
            onChange={handleChange}
            name="username"
            id="inputUsername"
            className="enter__input"
            placeholder="Nombre de usuario"
          />
        </div>

        <div className="enter__field">
          <input
            type="text"
            value={inputPass}
            onChange={handleChange}
            name="pass"
            id="inputPass"
            className="enter__input"
            placeholder="Contraseña"
          />
        </div>

        {loging ? (
          ""
        ) : (
          <div className="enter__field">
            <input
              type="text"
              value={inputPassRep}
              onChange={handleChange}
              name="passRep"
              id="inputPassRep"
              className="enter__input"
              placeholder="Repita la contraseña"
            />
          </div>
        )}

        {error ? <p className="error_message">{error}</p> : ""}

        <button type="submit" className="enter__button">
          {loging ? "Entrar" : "Registrarse"}
        </button>
      </form>
    </div>
  );
};

export default EnterForm;
