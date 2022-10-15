import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Login} from './pages/Login';
import { WPedidos } from './pages/WPedidos'


function App() {
  const tokenSaved =localStorage.getItem("llave") //para obtener la var
  console.log('aaaa',tokenSaved!= null)
  // if (tokenSaved != null){<Navigate to='/Menu'/>}// WPedidos()

  return (
    <div className="App">

    <BrowserRouter>
     <Routes>
    <Route index element={<Login/>}/>
    </Routes> 
    </BrowserRouter>
    {/* {<Login/>} */}
    {<WPedidos/>}
    </div>
  );
}

export default App;
