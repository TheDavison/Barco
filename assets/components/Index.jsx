import React from 'react'
import "../styles/Index.css";

const Index = ({currentUser}) => {
  // console.log(currentUser);
  return (
    <div className="index__container">
      <div className="index__cam">Aquí irá la retransimisión de la cámara</div>
      {currentUser ? <div className="index__donador">Donador 1</div> : ""}
      {currentUser ? <div className="index__donador">Donador 2</div> : ""}
      {currentUser ? <div className="index__donador">Donador 3</div> : ""}
    </div>
  )
}

export default Index