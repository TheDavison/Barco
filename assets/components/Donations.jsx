import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/Donations.css";

const Donations = () => {
  const [donations, setDonations] = useState([]);

  let getDonaciones = () => {
    axios.get("../donation/list").then((response) => {
      if (response.data.data) {
        for (let donacion in response.data.data) {
          let { id, quantity, date } = response.data.data[donacion];
          let { username } = response.data.data[donacion].donator;
          let nextDonation = { id, username, quantity, date };

          setDonations((prev) => [...prev, nextDonation]);
        }
      }
    });
  };

  useEffect(() => {
    getDonaciones();
  }, []);

  return (
    <div>
      <h2>Listado de donaciones</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Usuario</th>
            <th>Cantidad</th>
            <th>Fecha</th>
          </tr>
        </thead>

        <tbody>
          {donations.map((donation, key) => (
            <tr key={key}>
              <td>{donation.id}</td>
              <td>{donation.username}</td>
              <td>{donation.quantity}</td>
              <td>{donation.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Donations;
