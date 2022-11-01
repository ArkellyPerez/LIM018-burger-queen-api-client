// import { json } from "react-router-dom";
//import{user}from '/json-server/db.json';
import "../components/header.css"
import imgUser from '../assets/imguser.png'
import whitelogo from '../assets/whitelogo.png'
import salir from '../assets/salir1.PNG'
import { useNavigate } from 'react-router-dom'
import {Login} from '..//pages/Login';
export const Header = () => {
//const navigate = useNavigate();
console.log("navigate")
  const email = localStorage.getItem('correo')

function closeSesion(){
 
console.log("ddd")
}

  return (
    <div className="headerViews" id="menu">
      <div className="userSection">
        {/* <div className="imageUser"> */}
        <img src={imgUser} alt="imgUser" />
        {/* </div> */}
        <div className="greetingContainer">
          <div className="greeting">Hola</div>
          <div className="userName">{email}</div>
        </div>
      </div>

      <div className="imgLogo"><img src={whitelogo} alt="logo"></img></div>
      <div className="imgSalir"> <img src={salir} alt="loginout"></img>
       <button><img src={salir} alt="loginout" onClick={closeSesion() } /></button>   
      
       {/* <li href="">Cerrar sesión</li> */}
      </div>
    </div>
  );
}
