import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './Index';
import Layout from './Layout';

const Rutas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index path="" element={<Index />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas