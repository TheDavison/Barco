import React, {useState,useRef} from "react";
import { Camera } from "react-camera-pro";
import "../styles/Index.css";

const Index = ({ currentUser }) => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  // console.log(currentUser);
  return (
    <div className="index__container">
      <aside className="index__add">Aqui irá un anuncio</aside>

      <div className="index__main">
        <div className="index__cam">
          <Camera ref={camera}  aspectRatio={16 / 9}/>
          
        </div>
        <div className="index__donators">
          <div className="index__donador index__donador-1">
            Donador 1
          </div>
          <div className="index__donador index__donador-2">Donador 2</div>
          <div className="index__donador index__donador-3">Donador 3</div>
        </div>
      </div>

      <aside className="index__add">Aqui irá un anuncio</aside>
    </div>
  );
};

export default Index;
