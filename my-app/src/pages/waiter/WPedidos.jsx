import React from 'react'
import jwt_decode from "jwt-decode";
import {
  Routes,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import { WPendientes } from './WPendientes'
import { WPreparados } from './WPreparados'
import { Header } from '../../components/header'
import { Footer } from '../../components/Footer'
import { Menu } from './Menu'
import { WEntregados } from './WEntregados'
import {ChefPendientes} from '../chef/ChefPendientes'
import {ChefPreparados} from '../chef/ChefPreparados'
import {Modal} from '../../components/Modal'
import {ModalError} from '../../components/ModalError'

import './WPedidos.css'
export const WPedidos = () => {

  function getUser() {
    if (localStorage.getItem('llave') === null) {
      console.log(" Ningún usuario logueado")
    } else {
      console.log(" usuario logueado")
    }
  }
  const tokenSaved = localStorage.getItem('llave');
  const user = jwt_decode(tokenSaved);
  console.log(user.roles.mesero)
  if(user.roles.mesero===true){
    return (
    <>  
      <div className='pedidosMenuView'>
        <Header />
        <div className='pedidosButtons'>
          {user.roles.mesero===true}
          <Link to="/Menu" className="waiterButtonsPrincipal">
            REGISTRAR
          </Link>
          <NavLink to="/Menu/Pendientes" className="waiterButtonsPrincipal" activeClassName="active">
            PENDIENTES
          </NavLink>
          <NavLink to="/Menu/Preparados" className="waiterButtonsPrincipal" activeClassName="active">
            PREPARADOS
          </NavLink>
          <NavLink to="/Menu/Entregados" className="waiterButtonsPrincipal" activeClassName="active">
            ENTREGADOS
          </NavLink>
        </div>
  
        <Routes>
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Menu/Pendientes" element={<WPendientes />} />
          <Route path="/Menu/Preparados" element={<WPreparados />} />
          <Route path="/Menu/Entregados" element={<WEntregados />} />
        </Routes>
  
        <Footer />
      </div>
      <Modal/>
      <ModalError/>
   </>
    )
  } else if(user.roles.chef===true){
    return (
      <>
      <div className='pedidosMenuView'>
        <Header />
        <div className='pedidosButtons'>
          <NavLink to="/Menu/ChefPendientes" className="waiterButtonsPrincipal" activeClassName="active">
           CHEF PENDIENTES
          </NavLink>
          <NavLink to="/Menu/ChefPreparados" className="waiterButtonsPrincipal" activeClassName="active">
           CHEF PREPARADOS
          </NavLink>

        </div>
        <Routes>
          <Route path="/Menu/ChefPendientes" element={<ChefPendientes/>} />
          <Route path="/Menu/ChefPreparados" element={<ChefPreparados/>} />
        </Routes>
        <Footer/>
      </div>
      <Modal/>
      <ModalError/>
      </>
    )
  }
  // return (
  //   <div className='pedidosMenuView'>
  //     <Header />
  //     {/* <div className='pedidosButtons'> /////////////*/}
  //     <div className='pedidosButtons'>
  //       {user.roles.mesero===true}
  //       <Link to="/Menu" className="waiterButtonsPrincipal">
  //         REGISTRAR
  //       </Link>
  //       <NavLink to="/Menu/Pendientes" className="waiterButtonsPrincipal" activeClassName="active">
  //         PENDIENTES
  //       </NavLink>
  //       <NavLink to="/Menu/Preparados" className="waiterButtonsPrincipal" activeClassName="active">
  //         PREPARADOS
  //       </NavLink>
  //       <NavLink to="/Menu/Entregados" className="waiterButtonsPrincipal" activeClassName="active">
  //         ENTREGADOS
  //       </NavLink>
  //       <NavLink to="/Menu/ChefPendientes" className="waiterButtonsPrincipal" activeClassName="active">
  //        CHEF PENDIENTES
  //       </NavLink>
  //       <NavLink to="/Menu/ChefPreparados" className="waiterButtonsPrincipal" activeClassName="active">
  //        CHEF PREPARADOS
  //       </NavLink>

  //     </div>

  //     <Routes>
  //       <Route path="/Menu" element={<Menu />} />
  //       <Route path="/Menu/Pendientes" element={<WPendientes />} />
  //       <Route path="/Menu/Preparados" element={<WPreparados />} />
  //       <Route path="/Menu/Entregados" element={<WEntregados />} />
  //       <Route path="/Menu/ChefPendientes" element={<ChefPendientes/>} />
  //       <Route path="/Menu/ChefPreparados" element={<ChefPreparados/>} />


  //     </Routes>

  //     <Footer />
  //   </div>

  // )
}

