// import { json } from "react-router-dom";
//import{user}from '/json-server/db.json';
import "../components/header.css"
import imgUser from '../assets/imguser.png'
import whitelogo from '../assets/whitelogo.png'
import salir from '../assets/salir1.PNG'
import { useNavigate } from 'react-router-dom'
import { Login } from '..//pages/Login';

import { useUser } from "../App"

export const Header = () => {
  //const navigate = useNavigate();

  const { getUser, logout } = useUser()

  console.log("navigate")

  function closeSesion() {

    console.log("ddd")
  }

  return (
    <div className="headerViews" id="menu">
      <div className="userSection">
        {/* <div className="imageUser"> */}
        <img className="userImage" src="https://cdn-icons-png.flaticon.com/512/4490/4490403.png" alt="imgUser" />
        {/* </div> */}
        <div className="greetingContainer">
          <div className="greeting">Hola!</div>
          <div className="userName">{getUser().email}</div>
        </div>
      </div>

      <div className="imgLogo"><img src="https://static.takeaway.com/images/restaurants/fr/R0R0R5R1/logo_465x320.png" alt="logo"></img></div>
      <div className="imgSalir" onClick={() => logout()}> <img className="cerrarSesion" src="https://cdn-icons-png.flaticon.com/512/6062/6062709.png" alt="loginout"></img>
        {/* <button><img src={salir} alt="loginout" onClick={closeSesion() } /></button>    */}

        {/* <li href="">Cerrar sesión</li> */}
      </div>
    </div>
  );
}
