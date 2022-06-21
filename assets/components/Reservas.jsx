import React, { useEffect, useState } from "react";
import axios from "axios";

const Reservas = () => {
  const [turnos, setTurnos] = useState([]);

  const getTurnos = async () => {
    await axios.get("turns/list").then((response) => {
      if (response.data.data) {
        // console.log("response data",response.data.data);
        let data = response.data.data;
        // console.log("data",data)  ;
        setTurnos(data);
      }

      
    });
  };
  // console.log("turnos:", turnos);
  useEffect(() => {
    getTurnos();
  }, []);
  return (
    <div>
      <h3>Estás en Reservas</h3>
      <select name="turno" className="">
        <option value="default">Seleccionar Turno</option>
        {turnos.map((turno, key)=>(
          <option value={turno.id} key={key+1}>{turno.hour}</option>
        ))}
       
      </select>

      {turnos.map(turno=>console.log(turno.hour))}
{/* 
      <table>
        <thead>
          <tr>
            <th>Turno</th>
          </tr>
        </thead>

        <tbody>
          {turnos.map((turno, key) => {
            console.log(turno.hour);
            <tr key={key}>
              <td>{turno.hour}</td>
            </tr>;
          })}
        </tbody>
      </table> */}
      
      {/* <ul>
        {turnos.map((turno, key) => {
          <li key={key}>{turno.hour}</li>;
        })}
      </ul> */}
    </div>
  );
};

export default Reservas;
