import React, { useState } from 'react'
import logo from '../assets/logo.png'
import './login.css'//ejecuta login sin importar ningun elemento

import { auth } from '../helpers/api'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate();
    const [myLogin, setLogin] = useState("false");
    const [correo, setCorreo] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, seterrorMessage] = useState("");

    function iniciarSesion(e) {
        e.preventDefault();
        if (correo.length === 0 || password.length === 0) {
            seterrorMessage("Completa tus datos...");
        } else {
            auth(correo, password)
                .then((res) => {
                    if (res.status === 200) {
                        localStorage.setItem('llave', res.data.token); //guardar datos en el navegador
                        //const tokenSaved = localStorage.getItem('llave') //para obtener la var
                        // guardar el token: se puede guardar en el localStorage o en el sessionStorage
                        // tener en cuenta que la mejor man era es en una cookie
                        console.log("busand",res)
                        localStorage.setItem('correo', correo)//guardo en locaStorage el correo
                        document.getElementById("viewLogin").style.display = "none";
                       
                        navigate("/Menu");
              
                      

                    } else if (res.status === 400) {
                        setLogin("false");
                        seterrorMessage("El usuario o contraseña son incorrectos...");
                        document.getElementById("emailInput").value = "";
                        document.getElementById("passwordInput").value = "";
                        document.getElementById("emailInput").focus();
                    }
                })
                .catch((err) => {
                    seterrorMessage("Por favor ingresa los datos correctos.");
                })
        }
    }



    return (  //return html y antes de return logica js
        <div className='viewLogin' id='viewLogin'>
            <div className='spaceLogin'>
                <div className="logoFastFood">
                    <img src={logo} alt="logo"></img>
                </div>
                <div className='areaDatosLogin'>
                    <div className='instructions'>
                        <p> Escribe tu usuario y contraseña para iniciar sesión.</p>
                    </div>
                    <div className='email'>
                        <img src='https://cdn-icons-png.flaticon.com/512/64/64572.png' alt="usuario" className='usuarioImagen'></img>
                        <input type='email' id='emailInput' placeholder=' Correo electrónico' className='loginEmail' onChange={(e) => setCorreo(e.target.value)}></input>
                    </div>
                    <div className='password'>
                        <img src='https://cdn-icons-png.flaticon.com/512/5134/5134230.png' alt="contraseña"></img>
                        <input type='password' id='passwordInput' placeholder=' Contraseña' className='loginPassword' onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <input type="submit" className="btnLogin" onClick={iniciarSesion} value="INGRESAR"></input>
                    <div className='errorMessage'>{errorMessage} </div>
                </div>
            </div>
        </div>
    );
}

