import React from 'react'
import './wPendientes.css'
import { useState, useEffect } from 'react';
import { ordersGet, orderPutReverse } from '../../helpers/api'

export const  WEntregados = () => {
  const tokenSaved = localStorage.getItem('llave');
  const [ordersArray, setOrdersuArray] = useState([])
  const [changeStatus1, setChangeStatus] = useState("delivered")

  useEffect(() => {
    ordersGet(tokenSaved)
      .then((res) => {
        const ordersGeneral = res.data;
        const ordersPending = ordersGeneral.filter(order=>order.status==="delivered")
        setOrdersuArray(ordersPending)
      }).catch(error => console.log(error))
  },[tokenSaved,changeStatus1])


  function changeStatus(idOrder){
    orderPutReverse(tokenSaved,idOrder)
    .then((res) => {
      if (res.status === 200) {
        alert('El estado del Pedido pasó de DELIVERED a DELIVERING...')
        setChangeStatus(`delivering -${idOrder}`)
      } 
    })
    .catch((err) => { console.log(err) })
  }
  return (
    <div className='areaPendientes3'>
    <div className='areaEntregados'>
      {ordersArray.map((order) => (
      <div className='pendienteCard' key={order.id}>
      <div className='datosCard'>
        <div>
          <p> Fecha: {order.dateEntry} </p>
          <p> Cliente: {order.client.split('/',1)} </p>
        </div>
        <div>
          <p> Nro de Mesa: </p>
          <p> Nº {order.client.split(':')[1]}</p>
        </div>
      </div>
      <br/>
      <div>
        <div className='estadoPedido'>
        <h1>Pedido Nº {order.id}</h1>
        <h2 className='statusOrder'>{order.status.toUpperCase()}</h2>
        </div>
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

        <p className="fechaDelivered">ENTREGADO EN {parseInt((new Date(order.dateProcessed)-new Date(order.dateEntry))/1000/60)} MINUTOS</p>
        <p className="fechaDelivering">LISTO EN {parseInt((new Date(order.dateDelivering)-new Date(order.dateEntry))/1000/60)} MINUTOS</p>
        <p className="fechaDelivering">(ENTREGADO: {order.dateProcessed})</p>
        <input type="submit" className="btnWaiterEntregar" onClick={(event)=>changeStatus(event.target.dataset.id)} data-id={order.id} value="ᐊ DELIVERING"></input>       
      </div>
    </div>
      ))}
    </div>
    </div>
  )
}