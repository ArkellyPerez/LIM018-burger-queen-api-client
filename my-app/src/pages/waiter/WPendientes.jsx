import React from 'react'
import './wPendientes.css'
import { useState, useEffect } from 'react';
import { ordersGet } from '../../helpers/api'
import './WaiterPendiente&Preparados.css'

export const WPendientes = () => {
  const tokenSaved = localStorage.getItem('llave');
  const [ordersArray, setOrdersuArray] = useState([])

  useEffect(() => {
    ordersGet(tokenSaved)
      .then((res) => {
        const ordersGeneral = res.data;
        const ordersPending = ordersGeneral.filter(order=>order.status==="pending")
        setOrdersuArray(ordersPending)
      }).catch(error => console.log(error))
  },[tokenSaved])
  return (
    <div className='areaPendientes3'>
    <div className='areaPendientes'>
      {ordersArray.map((order) => (
      <div className='pendienteCardView' key={order.id}>
        <div className='estadoPedido'>
        <h1>Pedido Nº {order.id}</h1>
        <h2 className='statusOrder'>POR PREPARAR</h2>
        </div>
      <div>
        <div className='datosCardPendiente'>
        <div>
          <p> Fecha: {order.dateEntry} </p>
          <p> Cliente: {order.client.split('/',1)} </p>
        </div>
        <div>
          <p> Nro de Mesa: </p>
          <p> Nº {order.client.split(':')[1]}</p>
        </div>
        </div>
        <br></br>
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
      </div>
    </div>
      ))}

    </div>
    </div>
  )
}