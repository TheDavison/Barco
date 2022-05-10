import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './Index';
import Layout from './Layout';
import Login from './Login';

const Rutas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index path="index" element={<Index />}></Route>
                    <Route path="login" element={<Login />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas