import React, { useEffect, useState } from "react";
import axios from "axios";

const Reservas = () => {
  const [turnos, setTurnos] = useState([]);
  const [groupSize, setGroupSize] = useState(1);
  const [fecha, setFecha] = useState("");
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
         if(response.data.data){
            for (let t in response.data.data) {
            let { id, hour, booked } = response.data.data[t];
            
            let nextTurn = { id, hour, booked };
            setTurnos((prev)=>[...prev,nextTurn]);

            
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
    console.log(fechaFormat);
    fechaEleccion > fecha ? setFecha(fechaFormat) : setFecha("");
  };

  const handleTurno = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    fecha != "" ? getTurnos() : "";
    // console.log('turnos',turnos);
  }, [fecha]);

  return (
    <div>
      <h3>Estás en Reservas</h3>
      <label htmlFor="groupSize">Tamaño del grupo: </label>
      <input type="number" min="1" onChange={handleGroupSize} value={groupSize} id="groupSize"/>
      <label htmlFor="fechaReserva">Fecha de la reserva: </label>
      <input type="date" onChange={handleFecha} id="fechaReserva"/>
      {mostrar != "" ? (
        <select name="turno" className="" onChange={handleTurno}>
          <option value="default">Seleccionar Turno</option>
          {/* {turnos.map(turno=>console.log('Turnos',turnos))} */}
          {turnos.map(turno=>console.log('Turno hora2',turno.hour))}
          {/* {turnos.map(turno=>console.log('Turno hora',turno[1].hour))} */}
          {/* {turnos.map((turno,key)=>(
            <option value={turno.id} key={key+1}>{turno}</option>
          ))} */}
          
          {turnos.map((turno, key) => (
            <option value={turno.id} key={key + 1}>
              {turno.hour}
            </option>
          ))}
        </select>
      ) : (
        <p>El dia seleccionado no es válido</p>
      )}
    </div>
  );
};

export default Reservas;
