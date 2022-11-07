import React from 'react'
import './wPendientes.css'
import { useState, useEffect } from 'react';
import { ordersGet, orderPut } from '../../helpers/api'

export const WPreparados = () => {
  const tokenSaved = localStorage.getItem('llave');
  const [ordersArray, setOrdersuArray] = useState([])
  const [changeStatus1, setChangeStatus] = useState("delivering")

  useEffect(() => {
    ordersGet(tokenSaved)
      .then((res) => {
        const ordersGeneral = res.data;
        const ordersPending = ordersGeneral.filter(order=>order.status==="delivering")
        setOrdersuArray(ordersPending)
      }).catch(error => console.log(error))
  },[tokenSaved,changeStatus1])

  function changeStatus(idOrder){
    orderPut(tokenSaved,idOrder)
    .then((res) => {
      if (res.status === 200) {
        alert('El pedido fue entregado :)')
        setChangeStatus(`delivered -${idOrder}`)
      } 
    })
    .catch((err) => { console.log(err) })
  }

  return (
    <div className='areaPendientes3'>
    <div className='areaPreparados'>
      {ordersArray.map((order) => (
      <div className='pendienteCard' key={order.id}>
        <div className='estadoPedido'>
          <div className='datosCard'>
            <h1>Pedido Nº {order.id}</h1>
            <p> Mesa: Nº {order.client.split(':')[1]}</p>
            <p> Cliente: {order.client.split('/',1)} </p>
            <p> Fecha Ingreso: {order.dateEntry} </p>
            <p> Pedido Listo: {order.dateDelivering}</p>

          </div>
          <div className='statusOrderPreparado'>
            <h2>¡LISTO!</h2>
            <img className="cronometro" src="https://cdn-icons-png.flaticon.com/512/3877/3877672.png" alt="ir a pendientes"/>
            <p className="fechaDelivered">{parseInt((new Date(order.dateDelivering)-new Date(order.dateEntry))/1000/60)} min</p>

          </div>
        </div>
      <div>
         <table className='tableOrder'>
        <thead>
            <tr className="rowHead">
              <th className="rowHeadTable">Código</th>
              <th className="rowHeadTable">Descripción</th>
              <th className="rowHeadTable">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map ((product) => (
            <tr>
            <td>{product.product.split('-')[0]}</td>
            <td className="productDescription">{product.product.split('-')[1]}</td>
            <td>{product.qty}</td>
          </tr>
            ))}
          </tbody>
        </table>
        <div className='btns'>
         <div type="submit" className="btnChefPendientes" onClick={(event)=>changeStatus(event.target.dataset.id)} data-id={order.id}>
            ENVIAR A ENTREGADOS <img className="enviarIMGwaitPrep" src="https://cdn-icons-png.flaticon.com/128/5166/5166431.png" alt="ir a Entregador"/> 
         </div>       
        </div>
      </div>
    </div>
      ))}

    </div>
    </div>
  )
}
