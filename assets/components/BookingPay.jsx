import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BookingPay.css";
import axios from "axios";

const BookingPay = ({ groupSize, fecha, primerTurno, pagar, reservar }) => {
  let navigate = useNavigate();
  let expresion = new RegExp();

  const [type, setType] = useState("MasterCard");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");

  const correcto = () => {
    if (!reservar) {
      navigate("/reservar", { replace: true });
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "card-number") {
      setCardNumber(e.target.value);
    } else if (e.target.name === "card-holder") {
      setCardHolder(e.target.value);
    } else if (e.target.name === "card-date") {
      setCardDate(e.target.value);
    } else if (e.target.name === "card-cvv") {
      setCardCVV(e.target.value);
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

  const checkInputs = () => {
    let mayContinue = true;

    if (!type === "MasterCard" || !type === "Visa") {
      mayContinue = false;
      setError("Solo puede pagar via MasterCard o Visa.");
    }

    expresion =
      /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/gm;
    if (!expresion.test(cardNumber)) {
      mayContinue = false;
      setError("Número de tarjeta errónea.");
    }

    expresion = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]{2,}$/;
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

    if (!terms) {
      mayContinue = false;
      setError("Acepte los términos antes de continuar por favor.");
    }

    return mayContinue;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkInputs()) {
      axios
        .post("/bookings/new", {
          groupSize,
          fecha,
          primerTurno,
        })
        .then((response) => {
          navigate("/index", { replace: true });
        });
    }
  };

  useEffect(() => {
    correcto();
  }, []);

  return (
    <div className="payment__container">
      <div className="payment__main">
        <div className="payment__window">
          <div className="payment__left-column">
            <p>Métodos de pago</p>
            <div className="payment__payment-methods">
              <p
                className={
                  type == "MasterCard"
                    ? "payment__payment-method active-type"
                    : "payment__payment-method"
                }
                name="donation-type"
                onClick={() => handleTypeChange("MasterCard")}
              >
                MasterCard
              </p>
              <p
                className={
                  type == "Visa"
                    ? "payment__payment-method active-type"
                    : "payment__payment-method"
                }
                name="donation-type"
                onClick={() => handleTypeChange("Visa")}
              >
                Visa
              </p>
            </div>
            <div className="payment__quantity">
              <label htmlFor="cantidad" className="form-label">
                Cantidad a pagar:
              </label>
              <input type="number" value={pagar} disabled />
            </div>
          </div>

          <div className="payment__right-column">
            <form method="post" onSubmit={handleSubmit} className="payment">
              <div className="form__number form-field">
                <label htmlFor="card-number" className="form-label">
                  Número de la tarjeta:
                </label>
                <input
                  type="text"
                  className="payment__card-number form-input"
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
                  className="payment__card-holder form-input"
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
                  className="payment__card-expiring-date form-input"
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
                  className="payment__card-cvv form-input"
                  placeholder="XXX"
                  onChange={handleChange}
                  name="card-cvv"
                  id="card-cvv"
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
                <p onClick={handleSubmit}>Pagar {pagar}€</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPay;
