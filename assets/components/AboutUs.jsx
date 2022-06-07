import React from "react";
import "../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="aboutUs__container">
      <div className={"aboutUs__content"}>
        <h2>¿Qué es este proyecto?</h2>
        <p>
          Este es un proyecto que hemos realizado entre distintos ciclos
          formativos de grado superior, aportando cada uno un poco de su ambito
          haciendo un proyecto con una parte física como es un barco y una parte
          menos tangible como es esta página web.
        </p>
      </div>
      <div className={"aboutUs__content"}>
        <h2>¿Qué buscamos?</h2>
        <p>
          Con este proyecto lo que buscamos es una forma de ayudar a reducir la
          contaminación y cumplir con algunas ods, aportando un barco capaz de
          quitar la suciedad de fuentes y pantanos.
        </p>
      </div>
      <div className={"aboutUs__content"}>
        <h2>¿Qué contiene el proyecto?</h2>
        <p>
          Decidimos ponerle una cámara para retransimitir lo que ve el barco a
          traves de esta web, para así concienciar a la gente.Por desgracia y
          por no tener los medios necesarios no hemos conseguido plasmarlo a la
          realiad. 
          
        </p>
        <p>Tiene una polea con una red que permitirá recoger la suciedad
          de fuentes y pantanos y, un panel solar con el que podrá recargarse.</p>
      </div>
      <div className={"aboutUs__content"}>
        <h2>¿Cómo puedes ayudarnos?</h2>
        <p>
          La posibilidad de donación ha sido incluida para aquellas personas que
          quieran aportar a la causa y ayudarnos a seguir mejorando nuestro
          proyecto para llegar cada vez más lejos. Con esta donación, tendrás
          acceso a un canal de discord para hablar con nosotros.
        </p>
        <p>También tenemos
          anuncions con los que conseguimos ingresos monetarios.</p>
      </div>
      <div className={"aboutUs__content"}>
        <h2>Realizado por:</h2>
        <p>
           Manuel González López(DAW), Zijie "David" Cheng(DAW),
          Alejandro Abril Coronado(TMV), David Cordón Romero(MITF), Raul Cívico
          Gil(MITF)
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
