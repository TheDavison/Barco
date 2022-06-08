import React, { useState } from "react";
import "../styles/DonationForm.css";
import axios from "axios";
import bricoADD from "../img/bricodepotADD.jpg";
import { useNavigate } from "react-router-dom";

const DonationForm = () => {
  const [type, setType] = useState("MasterCard");
  const [quantity, setQuantity] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();

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

    setError("");
  };

  const handleTypeChange = (type) => {
    setType(type);
    setError("");
  };

  const handleAcceptTerms = () => {
    setTerms(!terms);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checkInputs()) {
      let donatedSuccesfully = await addDonation();

      if (donatedSuccesfully) {
        setQuantity(1);
        setCardNumber("");
        setCardHolder("");
        setCardDate("");
        setCardCVV("");
        setDiscordUsername("");
        navigate("/", { replace: true });
      }
    }
  };

  const checkInputs = () => {
    let mayContinue = true;

    if (!type === "MasterCard" || !type === "Visa") {
      mayContinue = false;
      setError("Solo puede pagar via MasterCard o Visa.");
    }

    if (quantity <= 0) {
      mayContinue = false;
      setError("No puede donar una cantidad menor o igual a 0€.");
    }

    expresion = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/gm;
    if (!expresion.test(cardNumber)) {
      mayContinue = false;
      setError("Número de tarjeta errónea.");
    }

    expresion = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    if (!expresion.test(cardHolder)) {
      mayContinue = false;
      setError("Nombre erróneo.");
    }

    expresion = /^(\d{2}\/\d{4})$/gm;
    if (!expresion.test(cardDate)) {
      mayContinue = false;
      setError("Fecha formato MM/YYYY.");
    }

    expresion = /^(\d{3})$/gm;
    if (!expresion.test(cardCVV)) {
      mayContinue = false;
      setError("Tres numeros de detrás de la tarjeta.");
    }

    expresion = /^([a-zA-Z0-9]{2,32})#(\d{4})$/gm;
    if(discordUsername.trim().length > 0){
      if (!expresion.test(discordUsername)) {
        mayContinue = false;
        setError("No ha escrito bien su id de discord.");
      }
    }else{
      setDiscordUsername("NoDiscord")
    }

    if (!terms) {
      mayContinue = false;
      setError("Acepte los términos antes de continuar por favor.");
    }

    return mayContinue;
  };

  const addDonation = async () => {
    let haveDonated = false;
    await axios
      .post("/donation/new", {
        type: type,
        quantity: quantity,
        cardNumber: cardNumber.split(" ").join(""),
        cardHolder: cardHolder,
        cardDate: cardDate,
        cardCVV: cardCVV,
        discordUsername: discordUsername,
      })
      .then((haveDonated = true))
      .catch((error) => {
        console.log(error);
      });
    return haveDonated;
  };

  return (
    <div className="donation-form__container">
      <aside className="donation-form__add">
        <a href="https://www.bricodepot.es/">
          <img src={bricoADD} alt="publicidad de bricodepot" />
        </a>
      </aside>

      <div className="donation-form__main">
        <div className="donation-form__window">
          <div className="donation-form__left-column">
            <p>Métodos de pago</p>
            <div className="donation-form__payment-methods">
              <p
                className={
                  type == "MasterCard"
                    ? "donation-form__payment-method active-type"
                    : "donation-form__payment-method"
                }
                name="donation-type"
                onClick={() => handleTypeChange("MasterCard")}
              >
                MasterCard
              </p>
              <p
                className={
                  type == "Visa"
                    ? "donation-form__payment-method active-type"
                    : "donation-form__payment-method"
                }
                name="donation-type"
                onClick={() => handleTypeChange("Visa")}
              >
                Visa
              </p>
            </div>
            <div className="donation-form__quantity">
              <label htmlFor="cantidad" className="form-label">
                Cantidad que va a donar:
              </label>
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
                <label htmlFor="card-number" className="form-label">
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
                <label htmlFor="card-holder" className="form-label">
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
                <label htmlFor="card-date" className="form-label">
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
                <label htmlFor="card-cvv" className="form-label">
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
                <label htmlFor="discord-username" className="form-label">
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

              <div className="form__checkbox form-field">
                <label htmlFor="accept-terms" className="form-label">
                  Acceto los términos:{" "}
                </label>
                <input
                  type="checkbox"
                  id="accept-terms"
                  onClick={handleAcceptTerms}
                />
              </div>

              {error ? <p className="error_message">{error}</p> : ""}

              <div className="form-button">
                <p onClick={handleSubmit}>Donar</p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <aside className="donation-form__add">
        <a href="https://www.bricodepot.es/">
          <img src={bricoADD} alt="publicidad de bricodepot" />
        </a>
      </aside>
    </div>
  );
};

export default DonationForm;
