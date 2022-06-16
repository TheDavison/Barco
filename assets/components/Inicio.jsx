import React from "react";
import "../styles/Inicio.css";
// import vd from "../img/videoBarco.mp4";

const Inicio = () => {
  return (
    <div className={"inicio__container"}>
      <section className="inicio__section">
        <h1>¿Quieres ayudar a tener un lugar más limpio?</h1>
        <p>Te ofrecemos la posibilidad de reservar unos días para que uses nuestro WallieShip con tus amigos</p>
      </section>
      {/* <video width="750" height="500" controls >
      <source src={video} type="video/mp4"/>
</video> */}
      <section className="inicio__section">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
        veritatis, quaerat ad odit earum accusantium a. Sint quis porro
        recusandae?
      </section>
    </div>
  );
};

export default Inicio;
