import React, { useEffect, useState } from 'react'
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
    const [currentUser,setCurrentUser ] = useState(null);
    useEffect(()=>{
        setCurrentUser(localStorage.getItem('currentUser'));
    },[])
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout setCurrentUser ={setCurrentUser} currentUser={currentUser}/>}>
                    <Route index path="" element={<Index currentUser={currentUser}/>}></Route>
                    <Route path="login" element={<Login setCurrentUser ={setCurrentUser} currentUser={currentUser}/>}></Route>
                    <Route path="aboutUs" element={<AboutUs />}></Route>
                    <Route path="register" element={<Register />}></Route>
                    <Route path="admin" element={<Admin />}></Route>
                    <Route path="adminUsers" element={<Users />}></Route>
                    <Route path="adminDonations" element={<Donations/>}></Route>
                    {/* <Route path="register" element={<Register />}></Route> */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas