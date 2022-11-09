import React from 'react'
import { useState, useEffect } from 'react';
import { ordersGet,orderPutChef } from '../../helpers/api'
// import {Modal} from '../../components/Modal'

export const ChefPendientes = () => {
  const tokenSaved = localStorage.getItem('llave');
  const [ordersArray, setOrdersuArray] = useState([])
  const [changeStatus1, setChangeStatus] = useState("delivered")

  useEffect(() => {
    ordersGet(tokenSaved)
      .then((res) => {
        const ordersGeneral = res.data;
        const ordersPending = ordersGeneral.filter(order=>order.status==="pending")
        setOrdersuArray(ordersPending)
      }).catch(error => console.log(error))
  },[tokenSaved,changeStatus1])

  function changeStatus(idOrder){
    orderPutChef(tokenSaved,idOrder)
    .then((res) => {
      if (res.status === 200) {
        const modalPage = document.getElementById("modalPage")
        modalPage.style.display = 'flex';
        // Modal("OKS","OK")
        setChangeStatus(`delivering -${idOrder}`)
      } 
    })
    .catch((err) => { console.log(err) })
  }

  return (
    <>
     <div className='areaPendientes3'>
    <div className='areaPendientes'>
      {ordersArray.map((order) => (
      <div className='pendienteCard' key={order.id}>
        <div className='estadoPedido'>
          <h1>Pedido Nº {order.id}</h1>
          <h2 className='statusOrder'>EN PROCESO</h2>
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
      <br/>
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
            ENVIAR A PREPARADOS <img className="enviarIMGchefPend" src="https://cdn-icons-png.flaticon.com/128/5166/5166431.png" alt="preparadoOK"/> 
          </div>
        </div>
      </div>
    </div>
      ))}
    </div>
     </div>
    </>

  )
}
