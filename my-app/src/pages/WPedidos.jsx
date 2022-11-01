import React from 'react'
import Navbar from '../components/Navbar'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { WPendientes } from './WPendientes'
import { WPreparados } from './WPreparados'
import { Header } from '../components/Header'
import { Footer} from '../components/Footer'
import { Menu } from './Menu'
import { WEntregados } from './WEntregados'


import '../pages/WPedidos.css'
export const WPedidos = () => {

  return (
    <div className='pedidosMenuView'>
      <Header/>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          {/* <Route path="/Menu" element={<Header/>}/> */}
          <Route path="/Menu" element={<Menu/>}/>
          <Route path="/Menu/Pendientes" element={<WPendientes/>}/>
          <Route path="/Menu/Preparados" element={<WPreparados/>}/>
          {/* <Route path="/Menu/Entregados" element={<WEntregados/>}/> */}
          <Route path="/Menu/Entregados" element={<WEntregados/>}/>

        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  )
}

