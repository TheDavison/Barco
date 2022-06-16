import React, { useEffect, useState } from "react";
import axios from "axios";

const Reservas = () => {
  const [turnos, setTurnos] = useState([]);

  const getTurnos = async () => {
    await axios.get("turns/list").then((response) => {
      if (response.data.data) {
        for (let turno in response.data.data) {
            
          let { id, hour } = response.data.data[turno];
          let nextTurn = { id, hour };
          setTurnos((prev) => [...prev, nextTurn]);
        }
      }
    });
  };

  useEffect(() => {
    getTurnos();
  }, []);
  return (
    <div>
      <h3>Estás en Reservas</h3>
      <select name="turno" className="">
        <option value="default">Seleccionar Turno</option>

        {turnos.map((turno) => {console.log(turno);
          <option value={turno.id}>{turno.hour}</option>;
        })}
      </select>
    </div>
  );
};

export default Reservas;
