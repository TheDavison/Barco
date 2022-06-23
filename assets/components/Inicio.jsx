import React from "react";
import "../styles/Inicio.css";
// import VideoComponent from "./VideoComponent";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
// import VideoComponent from "./VideoComponent";
// import video from '../videos/videoBarco.mp4';
// import VideoComponent from "./VideoComponent";

const Inicio = () => {
  return (
    <div className={"inicio__container"}>
      <section className="inicio__section">
        <h1>¿Quieres ayudar a tener un lugar más limpio?</h1>
        <p>
          Usa nuestro barco y ayuda a tener unas fuentes más limpias mientras te
          diviertes manejandolo. Queda con tus amigos y compartelo para
          divertiros entre todos.
        </p>
      </section>
      <section className="inicio__section inicio__section__video">
        <ReactPlayer
        className="inicio__video__box"
        
          url="https://youtube.com/shorts/1AM2hjGy8-8?feature=share"
          controls
          loop
          mute="true"
        />
      </section>

      <section className="inicio__section">
        <h2>¿Quieres usarlo?</h2>
        <p>
          Reserva ahora el día y la hora que quieras para divertirte con tus
          amigos.
        </p>
        <div className="inicio__button">
          <Link to={"/userBooking"}>
            <div className="booking-button">Reservar ya</div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
