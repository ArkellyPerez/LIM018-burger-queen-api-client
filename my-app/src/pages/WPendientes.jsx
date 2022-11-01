import React from 'react'
import './wPendientes.css'
import { useState, useEffect } from 'react';
import { ordersGet } from '../helpers/api'

export const WPendientes = () => {
  const tokenSaved = localStorage.getItem('llave');
  const [ordersArray, setOrdersuArray] = useState([])

  useEffect(() => {
    ordersGet(tokenSaved)
      .then((res) => {
        const ordersGeneral = res.data;
        setOrdersuArray(ordersGeneral)
      }).catch(error => console.log(error))
  },[tokenSaved])
  //console.log(ordersArray)
  return (
    <div className='areaPendientes'>
      {ordersArray.map((order) => (
      <div className='pendienteCard' key={order._id}>
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
        <h1>Pedido Nº {order._id}</h1>
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
            <td>{product.product.split('-')[1]}</td>
            <td>{product.qty}</td>
          </tr>
            ))}
          </tbody>

        </table>
        <h2>{order.status}</h2>
      </div>
    </div>
      ))}

    </div>
  )
}

// {productosMenuArray.map((producto) => (
//   <div className="product" key={producto._id}>
//     <div className="productName">{producto.name}</div>
//     <div className="productCost">`S/{producto.price}`</div>
//     <div className="imgProduct">
//       <img src={producto.image} alt="sanwich"></img>
//     </div>
//     <div className="buttonAñadir" onClick={() => {
//         ClientOrderAdd(producto);
//       }
//       }>+ Añadir
//     </div>
//   </div>
// ))}
// export default WPendientes
