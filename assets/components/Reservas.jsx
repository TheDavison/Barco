import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Reservas.css";
import { useNavigate } from "react-router-dom";

const Reservas = ({
  groupSize,
  setGroupSize,
  fecha,
  setFecha,
  primerTurno,
  setPrimerTurno,
  pagar,
  setPagar,
  setReservar,
}) => {
  let navigate = useNavigate();

  const [turnos, setTurnos] = useState([]);
  const [mostrar, setMostrar] = useState(false);

  const getTurnos = async () => {
    setTurnos([]);
    await axios
      .post("turns/list", {
        fecha: fecha,
      })
      .then((response) => {
        // let {id, hour, booked } = response.data.data;
        // let nextTurn = {id,hour,booked};
        // let data = response.data.data;
        // console.log('response data',data);
        // response.data.data ? setTurnos((prev)=>[...prev,response.data.data]) : setTurnos([]);
        if (response.data.data) {
          for (let t in response.data.data) {
            let { id, hour, booked } = response.data.data[t];

            let nextTurn = { id, hour, booked };
            setTurnos((prev) => [...prev, nextTurn]);
          }
        }
      })
      .catch((error) => {})
      .finally(() => {
        setMostrar(true);
      });
  };

  const handleGroupSize = (e) => {
    if (e.target.value >= 1) {
      setGroupSize(parseInt(e.target.value));
    }
  };

  const handleFecha = (e) => {
    setMostrar(false);
    let fecha = new Date();
    let fechaEleccion = new Date(e.target.value);
    let fechaFormat =
      fechaEleccion.getFullYear() +
      "-" +
      ("0" + (fechaEleccion.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + fechaEleccion.getDate()).slice(-2);
    fechaEleccion > fecha ? setFecha(fechaFormat) : setFecha("");
  };

  const handleTurno = (e) => {
    setPrimerTurno(e.target.value);
  };

  const handlePagar = () => {
    setReservar(true);
    navigate("/pagarReserva", { replace: true });
  };

  useEffect(() => {
    fecha != "" ? getTurnos() : "";
    // console.log('turnos',turnos);
  }, [fecha]);

  useEffect(() => {
    setPagar(2 * groupSize);
  }, [groupSize]);

  return (
    <div className="booking__container">
      <section className="booking__section">
        <h3>Estás en Reservas</h3>
        <label htmlFor="groupSize">Tamaño del grupo: </label>
        <input
          type="number"
          min="1"
          onChange={handleGroupSize}
          value={groupSize}
          id="groupSize"
        />
      </section>
      <section className="booking__section">
        <label htmlFor="fechaReserva">Fecha de la reserva: </label>
        <input type="date" onChange={handleFecha} id="fechaReserva" />
      </section>
      {mostrar != "" ? (
        <select name="turno" className="" onChange={handleTurno}>
          <option value="default">Seleccionar Turno</option>

          {turnos.map((turno, key) =>
            turno.booked ? (
              <option value={turno.id} key={key + 1} disabled>
                Reservado
              </option>
            ) : (
              <option value={turno.id} key={key + 1}>
                {turno.hour}
              </option>
            )
          )}
        </select>
      ) : (
        <p>El dia seleccionado no es válido</p>
      )}

      {primerTurno != 0 ? (
        <div className="booking__pay" onClick={handlePagar}>
          <p>Pagar {pagar}€</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Reservas;
