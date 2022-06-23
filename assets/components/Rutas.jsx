import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AboutUs from "./AboutUs";
import Admin from "./Admin";
import AdminLayout from "./AdminLayout";
import Donations from "./Donations";
import Index from "./Index";
import Layout from "./Layout";
import EnterForm from "./EnterForm";
import DonationForm from "./DonationForm";
import Reservas from "./Reservas";
import BookingPay from "./BookingPay";
import Users from "./Users";
import Cookies from "./Cookies";
import Inicio from "./Inicio";
import AdminBookings from "./AdminBookings";
import axios from "axios";

const Rutas = () => {
  const [currentUser, setCurrentUser] = useState(null);

  //-----------------Reservas-----------------
  const [turnos, setTurnos] = useState([]);
  const [groupSize, setGroupSize] = useState(1);
  const [fecha, setFecha] = useState("");
  const [mostrar, setMostrar] = useState(false);
  const [primerTurno, setPrimerTurno] = useState("");
  const [pagar, setPagar] = useState(2);
  const [reservar, setReservar] = useState(false);

  useEffect(() => {
    setCurrentUser(localStorage.getItem("currentUser"));
  }, []);

  const handleBorrar = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentRole");
    setCurrentUser("");
    axios.post("/logout").then(/*console.log('he salido')*/);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
              handleBorrar={handleBorrar}
            />
          }
        >
          <Route index path="" element={<Inicio />}></Route>
          <Route
            path="index"
            element={<Index currentUser={currentUser} />}
          ></Route>
          <Route
            path="donar"
            element={currentUser ? <DonationForm /> : <Index />}
          ></Route>
          <Route
            path="login"
            element={
              <EnterForm
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            }
          ></Route>
          <Route path="aboutUs" element={<AboutUs />}></Route>
          <Route path="cookies" element={<Cookies />}></Route>
          <Route
            path="reservar"
            element={
              <Reservas
                turnos={turnos}
                setTurnos={setTurnos}
                groupSize={groupSize}
                setGroupSize={setGroupSize}
                fecha={fecha}
                setFecha={setFecha}
                mostrar={mostrar}
                setMostrar={setMostrar}
                primerTurno={primerTurno}
                setPrimerTurno={setPrimerTurno}
                pagar={pagar}
                setPagar={setPagar}
                setReservar={setReservar}
              />
            }
          ></Route>
          <Route
            path="pagarReserva"
            element={
              <BookingPay
                turnos={turnos}
                setTurnos={setTurnos}
                groupSize={groupSize}
                setGroupSize={setGroupSize}
                fecha={fecha}
                setFecha={setFecha}
                mostrar={mostrar}
                setMostrar={setMostrar}
                primerTurno={primerTurno}
                setPrimerTurno={setPrimerTurno}
                pagar={pagar}
                setPagar={setPagar}
                reservar={reservar}
                setReservar={setReservar}
              />
            }
          ></Route>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="/admin/users" element={<Users />}></Route>
            <Route path="/admin/donations" element={<Donations />}></Route>
            <Route path="/admin/reservas" element={<AdminBookings />}></Route>
          </Route>
          {/* <Route path="reservas" element={<AdminBookings/>}></Route> */}
          {/* <Route path="register" element={<Register />}></Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Rutas;
