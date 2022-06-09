import React, { useState, useRef, useEffect } from "react";
import { Camera } from "react-camera-pro";
import { Link } from "react-router-dom";
import "../styles/Index.css";
// import bricoADD from "../img/bricodepotADD.jpg";
import axios from "axios";

const Index = ({ currentUser }) => {
  const camera = useRef(null);
  // const [image, setImage] = useState(null);
  const [donators, setDonators] = useState([]);

  const getTopDonators = async () => {
    await axios.get("/donation/getTop").then((response) => {
      for (let donador in response.data.data) {
        let { id, donator, quantity } = response.data.data[donador];
        let nextDonator = { id, donator, quantity };

        setDonators((prev) => [...prev, nextDonator]);
      }
    });
  };

  useEffect(() => {
    getTopDonators();
  }, []);

  console.log(donators[0]?.donator);
  return (
    <div className="index__container">
      {/* <aside className="index__add">
        <a href="https://www.bricodepot.es/">
          <img src={bricoADD} alt="publicidad de bricodepot" />
        </a>
      </aside> */}

      <div className="index__main">
        <div className="index__cam">
          <Camera ref={camera} aspectRatio={16 / 9} />
        </div>
        <div className="index__donator__container">
        <div className="index__donators">
          <div className="index__donators-podium">
            <div className="podium-position">
              <p>{donators[1]?.quantity}€</p>
              <div className="index__donador index__donador-2">
                {donators[1]?.donator}
              </div>
            </div>
            <div className="podium-position">
              <p>{donators[0]?.quantity}€</p>
              <div className="index__donador index__donador-1">
                {donators[0]?.donator}
              </div>
            </div>
            <div className="podium-position">
              <p>{donators[2]?.quantity}€</p>
              <div className="index__donador index__donador-3">
                {donators[2]?.donator}
              </div>
            </div>
          </div>
          <div>
            <Link to={"/donar"}>
              <div className="donators-button">Donar</div>
            </Link>
          </div>
        </div>
        </div>
      </div>

      {/* <aside className="index__add">
        <a href="https://www.bricodepot.es/">
          <img src={bricoADD} alt="publicidad de bricodepot" />
        </a>
      </aside> */}
    </div>
  );
};

export default Index;
