import React, { useState } from 'react'
import logo from '../assets/logo.png'
import './login.css'
import { WPedidos } from './WPedidos'


import { auth } from '../helpers/api'
import { useNavigate } from 'react-router-dom'


// console.log(axios.get(baseUrl))


export const Login = () => {
    const navigate = useNavigate();
    const [myLogin, setLogin] = useState("false");
    const [correo, setCorreo] = useState();
    const [password, setPassword] = useState();

    function iniciarSesion(e) {
        e.preventDefault();
        const txtEmail = document.getElementById("emailInput").value;
        const txtPassword = document.getElementById("passwordInput").value;
        if (txtEmail.length === 0 || txtPassword.length === 0) {
            alert("Completa tus datos...");
        } else {
            auth(txtEmail, txtPassword)
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.headers)
                        console.log(res.data.token!= null)
                        localStorage.setItem('llave', res.data.token); //guardar datos en el navegador
                        const tokenSaved =localStorage.getItem('llave') //para obtener la var
                        // guardar el token: se puede guardar en el localStorage o en el sessionStorage
                        // tener en cuenta que la mejor man era es en una cookie
                        setLogin("true");
                        document.getElementById("viewLogin").style.display = "none";
                        navigate("/Menu")

                    } else if (res.status === '400') {
                        setLogin("false");
                        alert("El usuario o contraseña son incorrectos...");
                        document.getElementById("emailInput").value = "";
                        document.getElementById("passwordInput").value = "";
                        document.getElementById("emailInput").focus();
                    }
                })
                .catch((err)=>{alert('error')})
        }
    }


    return (  //return html y antes de return logica js
        <>
            <div className='viewLogin' id='viewLogin'>
                <div className='spaceLogin'>
                    <div className="logoFastFood">
                        <img src={logo} alt="logo"></img>
                    </div>
                    <div className='areaDatosLogin'>
                        <p className='instructions'>Escribe tu usuario y contraseña para iniciar sesión.</p>
                        <div className='email'>
                            {/* <img src={require('../assets/usuario.png')} alt="usuario" className='usuarioImagen'></img> */}
                            <input type='email' id='emailInput' placeholder='Correo electrónico' className='loginEmail' onChange={(e) => setCorreo(e.target.value)}></input>
                        </div>
                        <div className='password'>
                            {/* <img src='../assets/contraseña.png' alt="contraseña"></img> */}
                            <input type='password' id='passwordInput' placeholder='Contraseña' className='loginPassword' onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        <input type="submit" className="btnLogin" onClick={iniciarSesion}></input>
                    </div>
                </div>
            </div>
            {/* {myLogin === "true" && <WPedidos usuario={correo} />} */}
            {/* {myLogin === "true" && <WPedidos usuario={correo} />} */}
        </>

    );
}

