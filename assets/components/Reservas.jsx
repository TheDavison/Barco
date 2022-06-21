import React, { useEffect, useState } from "react";
import axios from "axios";

const Reservas = () => {
  const [turnos, setTurnos] = useState([]);

  const getTurnos = async () => {
    await axios.get("turns/list").then((response) => {
      if (response.data.data) {
        setTurnos((prev) => [...response.data.data]);
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

        {/* {turnos.map((turno, key) => {
          console.log(turno.id, turno.hour, key);
          <option value={turno.id} id={key}>{turno.hour}</option>;
        })} */}
      </select>

      <table>
        <thead>
          <tr>
            <th>Turno</th>
          </tr>
        </thead>

        <tbody>
          {turnos.map((turno, key) => {
        console.log(turno);
            <tr key={key}>
              <td>{turno.id}</td>
            </tr>;
            // <li key={key}>{turno.hour}</li>
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Reservas;
