import React from 'react'
import Navbar from '../components/Navbar'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { WPendientes } from './WPendientes'
import { WPreparados } from './WPreparados'
import { WEntregados } from './WEntregados'
import '../pages/WPedidos.css'

export const WPedidos = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/Menu" element='Pedidos'/>
          <Route path="/Menu/Pendientes" element={<WPendientes/>}/>
          <Route path="/Menu/Preparados" element={<WPreparados/>}/>
          <Route path="/Menu/Entregados" element={<WEntregados/>}/>
        </Routes>
       </BrowserRouter>
       qPedidos
    </div>

  )
}


// export default WPedidos
