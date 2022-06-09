import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import AboutUs from './AboutUs';
import Admin from './Admin';
import AdminLayout from './AdminLayout';
import Donations from './Donations';
import Index from './Index';
import Layout from './Layout';
import EnterForm from './EnterForm';
import DonationForm from './DonationForm';

import Users from './Users';
import Cookies from './Cookies';

const Rutas = () => {
    const [currentUser, setCurrentUser ] = useState(null);
    
    useEffect(()=>{
        setCurrentUser(localStorage.getItem('currentUser'));
    },[])

    const handleBorrar = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentRole');
        setCurrentUser('');
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout setCurrentUser ={setCurrentUser} currentUser={currentUser} handleBorrar={handleBorrar} />}>
                    <Route index path="" element={<Index currentUser={currentUser}/>}></Route>
                    <Route path="donar" element={currentUser ? <DonationForm /> : <Index />}></Route>
                    <Route path="login" element={<EnterForm setCurrentUser ={setCurrentUser} currentUser={currentUser}/>}></Route>
                    <Route path="aboutUs" element={<AboutUs />}></Route>
                    <Route path="cookies" element={<Cookies />}></Route>
                    <Route path="admin" element={<AdminLayout />}>
                        <Route path="/admin/users" element={<Users />}></Route>
                        <Route path="/admin/donations" element={<Donations/>}></Route>
                    </Route>
                    {/* <Route path="register" element={<Register />}></Route> */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas