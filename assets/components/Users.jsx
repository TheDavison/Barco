import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  let getUsuarios = () => {
    axios.get("/user/list").then((response) => {
      if (response.data.data) {
        for (let usuario in response.data.data) {
          let { id, username, roles } = response.data.data[usuario];
          let nextUser = { id, username, roles };

          setUsers((prev) => [...prev, nextUser]);
        }
      }
    });
  };

  useEffect(() => {
    getUsuarios();
    // console.log("iniciando app")
  }, []);

  return (
    <div className="users__container">
      <h2>Listado de usuarios</h2>
      <table className="adminUser__table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Roles</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, key) => (
            <tr key={key}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.roles}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
