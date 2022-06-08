import React, { useState } from "react";
import "../styles/DonationForm.css";
import axios from "axios";
import bricoADD from '../img/bricodepotADD.jpg';

const DonationForm = () => {
  const [type, setType] = useState("MasterCard");
  const [quantity, setQuantity] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");

  let expresion = new RegExp();
  //--------------------------------------------------------------------------
  const handleChange = (e) => {
    if (e.target.name === "card-number") {
      setCardNumber(e.target.value);
    } else if (e.target.name === "card-holder") {
      setCardHolder(e.target.value);
    } else if (e.target.name === "card-date") {
      setCardDate(e.target.value);
    } else if (e.target.name === "card-cvv") {
      setCardCVV(e.target.value);
    } else if (e.target.name === "discord-username") {
      setDiscordUsername(e.target.value);
    } else if (e.target.name === "cantidad") {
      setQuantity(e.target.value);
    }
  };

  const handleTypeChange = (type) => {
    setType(type);
  };

  // const checkInputs = () => {
  //   let correctos = true;
  //   if(type != "Visa" || type != "MasterCard"){
  //     correctos = false;
  //   }

  //   if(quantity <= 0){
  //     correctos = false;
  //   }

  //   expresion = /((\d{4} ){3}\d{4}|^\d{16}$)/gm;
  //   if(expresion.text(cardNumber)){
  //     correctos = false;
  //   }

  //   expresion = //;
  //   expresion = //;
  //   expresion = //;
  //   expresion = //;
  //   expresion = //;
  //   expresion = //;
  //   expresion = //;
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    // checkInputs();

    addDonation();
  };

  const addDonation = () => {
    axios
      .post("/donation/new", {
        type: type,
        quantity: quantity,
        cardNumber: cardNumber.split(" ").join(""),
        cardHolder: cardHolder,
        cardDate: cardDate,
        cardCVV: cardCVV,
        discordUsername: discordUsername,
      })
      .then(console.log("Todo OK"))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="donation-form__container">
      <aside className="donation-form__add">
        <a href="https://www.bricodepot.es/"><img src={bricoADD} alt="publicidad de bricodepot"/></a>
      </aside>

      <div className="donation-form__main">
        <div className="donation-form__window">
          <div className="donation-form__left-column">
            <p>Métodos de pago</p>
            <div className="donation-form__payment-methods">
              <p
                className="donation-form__payment-method"
                name="donation-type"
                onClick={() => handleTypeChange("MasterCard")}
              >
                MasterCard
              </p>
              <p
                className="donation-form__payment-method"
                name="donation-type"
                onClick={() => handleTypeChange("Visa")}
              >
                Visa
              </p>
            </div>
            <div className="donation-form__quantity">
              <label htmlFor="cantidad">Cantidad que va a donar:</label>
              <input
                type="number"
                min="1"
                className="donation-form__quantity"
                id="cantidad"
                onChange={handleChange}
                name="cantidad"
                placeholder="1,00€"
              />
            </div>
          </div>

          <div className="donation-form__right-column">
            <form
              method="post"
              onSubmit={handleSubmit}
              className="donation-form"
            >
              <div className="form__number form-field">
                <label htmlFor="card-number form-label">
                  Número de la tarjeta:
                </label>
                <input
                  type="text"
                  className="donation-form__card-number form-input"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  onChange={handleChange}
                  name="card-number"
                  id="card-number"
                />
              </div>

              <div className="form__holder form-field">
                <label htmlFor="card-holder form-label">
                  Nombre del propietario de la tarjeta:
                </label>
                <input
                  type="text"
                  className="donation-form__card-holder form-input"
                  placeholder="Nombre Apellido Apellido"
                  onChange={handleChange}
                  name="card-holder"
                  id="card-holder"
                />
              </div>

              <div className="form__date form-field">
                <label htmlFor="card-date form-label">
                  Fecha de caducidad de la tarjeta:
                </label>
                <input
                  type="text"
                  className="donation-form__card-expiring-date form-input"
                  placeholder="MM/YYYY"
                  onChange={handleChange}
                  name="card-date"
                  id="card-date"
                />
              </div>

              <div className="form__cvv form-field">
                <label htmlFor="card-cvv form-label">
                  Numero de seguridad de la tarjeta:
                </label>
                <input
                  type="text"
                  className="donation-form__card-cvv form-input"
                  placeholder="XXX"
                  onChange={handleChange}
                  name="card-cvv"
                  id="card-cvv"
                />
              </div>

              <div className="form__discord-username form-field">
                <label htmlFor="discord-username form-label">
                  Usurio de discord (Opcional):
                </label>
                <input
                  type="text"
                  className="donation-form__discord-username form-input"
                  placeholder="nombre#tag"
                  onChange={handleChange}
                  name="discord-username"
                  id="discord-username"
                />
              </div>

              <div className="form-button">
                <p onClick={handleSubmit}>Donar</p> 
              </div>
            </form>
          </div>
        </div>
      </div>

      <aside className="donation-form__add">
        <a href="https://www.bricodepot.es/"><img src={bricoADD} alt="publicidad de bricodepot"/></a>
      </aside>
    </div>
  );
};

export default DonationForm;
