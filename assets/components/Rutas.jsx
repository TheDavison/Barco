import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AboutUs from './AboutUs';
import Admin from './Admin';
import Donations from './Donations';
import Index from './Index';
import Layout from './Layout';
import Login from './Login';
import Register from './Register';
import Users from './Users';

const Rutas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index path="index" element={<Index />}></Route>
                    <Route path="login" element={<Login />}></Route>
                    <Route path="aboutUs" element={<AboutUs />}></Route>
                    <Route path="register" element={<Register />}></Route>
                    <Route path="admin" element={<Admin />}></Route>
                    <Route path="adminUsers" element={<Users />}></Route>
                    <Route path="adminDonations" element={<Donations />}></Route>
                    {/* <Route path="register" element={<Register />}></Route> */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas