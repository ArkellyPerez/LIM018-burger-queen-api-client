import React from 'react';
import { useState, useEffect } from 'react';
import { productsGet, orderPost } from '../../helpers/api'
import './Menu.css'
import {Modal} from '../../components/Modal'

export const Menu = () => {
  const [productosMenuArray, setProductosMenuArray] = useState([])
  const tokenSaved = localStorage.getItem('llave')
  const [OrderArray, setOrderArray] = useState([])
  const [desayuno, setDesayuno] = useState('false');
  const [almuerzo, setAlmuerzo] = useState('false');
  const [cliente, setCliente] = useState();
  const [mesa, setMesa] = useState();

  let totalOrder = 0;
  useEffect(() => {
    productsGet(tokenSaved)
      .then((res) => {
        const productosMenu = res.data;
        if (desayuno === 'true' && almuerzo === 'false') {
          return setProductosMenuArray(productosMenu.filter((item) => {
            return item.type === "desayuno"
          }))
        } else if (desayuno === 'false' && almuerzo === 'true') {
          return setProductosMenuArray(productosMenu.filter((item) => {
            return item.type === "tentempié"
          }))
        } else {
          setProductosMenuArray(productosMenu)
        }
      }).catch(error => console.log(error))

  }, [desayuno, almuerzo, tokenSaved])

  function filterDesayuno() {
    setDesayuno('true');
    setAlmuerzo('false')
  }
  function filterAlmuerzo() {
    setDesayuno('false');
    setAlmuerzo('true')
  }

  //-----------Añadir productos al pedido------------------------------------------------------------------------

  const ClientOrderAdd = (producto) => {
    const existInOrder = OrderArray.find((item) => {
      return item._id === producto._id
    })
    if (existInOrder) {
      const newArrayOrderAdd = OrderArray.map((item) => {
        if (item._id === producto._id) {
          return { ...producto, quantity: item.quantity + 1, priceTotal: item.priceTotal + producto.price }
        }
        return item;
      })
      setOrderArray(newArrayOrderAdd)
    } else {
      setOrderArray([...OrderArray, { ...producto, quantity: 1, priceTotal: producto.price }]);

    }
  }
  //-----------Sumar el total del pedido-------------------------------------------------------------------------

  // const TotalAmountOrder = () => {
  OrderArray.map((product, i) => {
    const item = product;
    totalOrder += item.priceTotal;
  })
  //----------Borrar pedidos--------------------------------------------------------------------------------------

  const deleteItemOrder = (product) => {
    const existInOrder = OrderArray.find((value) => {
      return value._id === product._id
    });

    if (existInOrder.quantity === 1) {
      setOrderArray(OrderArray.filter(itemInOrder => itemInOrder._id !== product._id))

    } else if (existInOrder.quantity > 1) {
      const newArrayOrderSustract = OrderArray.map((item) => {
        if (item._id === product._id) {
          return { ...product, quantity: item.quantity - 1, priceTotal: item.priceTotal - product.price }
        }
        return item;
      })
      setOrderArray(newArrayOrderSustract)
    }
  };

  function enviarPedido(e) {
    e.preventDefault();
    const today = new Date();
    const productsAndQty = OrderArray.map((item) => {
      return (
        {
          product: item._id, //cambiar por productId si no funciona
          qty: item.quantity,
        })
    })
    // console.log(cliente===undefined)
    // console.log(cliente !== undefined)
    // const clienteOk=`${cliente}/mesa:${mesa}`;
    const clienteName = (cliente !== undefined)?(cliente.trim() === ""):true;
    const mesaName = (mesa !== undefined)?(mesa.trim() === ""):true;
    const clienteFinal=(clienteName||mesaName)?"":`${cliente}/mesa:${mesa}`;

    // const clienteFinal=(cliente.trim() === ""||mesa.trim() === ""||clienteOk.includes('undefined');
    console.log(clienteFinal)
    const resumenPedido = {
      userId: `${today.toLocaleString()}-${cliente}`, // si queremos despues modificar por un numero en el id
      // client: `${cliente}/mesa:${mesa} : ${totalOrder} SOLES`,
      // client: `${cliente}/mesa:${mesa}`,
      client: clienteFinal,
      products: productsAndQty
    }
    //console.log(resumenPedido)
    orderPost(localStorage.getItem('llave'), resumenPedido)
      .then((res) => {
        if (res.status === 200) {
          // alert('Su pedido fue agregado exitosamente.')
          const modalPage = document.getElementById("modalPage")
          modalPage.style.display = 'flex';
          cleanPedido()
        } 
        // else if(res.status === 400){
        //   alert('No se indica userId(nombre de usuario o mesa) o se intenta crear una orden sin productos.')
        // }else { 
        //   alert(' No hay cabecera de autenticación.') 
        // }
      })
      .catch((err) => {
        // Modal("Poceso cancelado","ERROR");
        const modalPage = document.getElementById("modalPage2");
        modalPage.style.display = 'flex';
        // alert(err.response.data) 
      })
  }

  function cleanPedido() {
    //document.getElementsByClassName('text').value='';
    document.getElementById('textName').value = '';
    document.getElementById('textMesa').value = '';
    setOrderArray([])

  }
  //console.log('aaaaaaaaa',OrderArray);

  return (
    <div className='viewWaiterPedidos' id='viewWPedidos'>
      <div className="waiterContainer">
        < div className="waiterOptions" >
          <button type="submit" className="waiterButtons" onClick={filterDesayuno}>DESAYUNO</button>
          <button type="submit" className="waiterButtons" onClick={filterAlmuerzo}>ALMUERZO</button>
        </div>
        <div className="menuConstainer">
          {productosMenuArray.map((producto) => (
            <div className="product" key={producto._id}>
              <div className="productName">{producto.name}</div>
              <div className="productCost">S/{producto.price}</div>
              <div className="imgProduct">
                <img src={producto.image} alt="sanwich"></img>
              </div>
              <div className="buttonAñadir" onClick={() => {
                ClientOrderAdd(producto);
              }
              }>+ Añadir
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="waiterList">
        <h1 className='subtituloPedido'>DETALLE DEL PEDIDO</h1>
        <div className='datos' >
          <input type='text' placeholder='CLIENTE:' className='text' id='textName' onChange={(e) => setCliente(e.target.value)}
          ></input>
          <input type='text' placeholder='MESA Nº:' className='text' id='textMesa' onChange={(e) => setMesa(e.target.value)}
          ></input>
        </div>
        <div className="divOrder">
          <table className="TableOrder">
            <thead>
              <tr className="rowHead">
                <th className="rowHeadTable">Cantidad</th>
                <th className="rowHeadTable">Descripción</th>
                <th className="rowHeadTable">Importe S/.</th>
              </tr>
            </thead>
            <tbody>
              {OrderArray.map((product, i) => (
                <tr key={i}>
                  <td className="itemsOrderTable">{product.quantity} unid.</td>
                  <td className="itemsOrderTable">{product.name}</td>
                  <td className="itemsOrderTable">{product.priceTotal}</td>
                  <button className="ButonDeleteItem" type="button" onClick={() => deleteItemOrder(product)}>
                    <img src="https://cdn-icons-png.flaticon.com/512/1175/1175088.png" alt="borrar" />
                  </button>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <th className="itemsOrderTable">TotalPedido</th>
              <td className="itemsOrderTable">{totalOrder} soles</td>
            </tfoot>
          </table>
        </div>
        <div className="btnsMenu">
          <input type="submit" className="btnEnviar" onClick={enviarPedido} value="ENVIAR"></input>
          <input type="submit" className="btnClear" onClick={cleanPedido} value="CANCELAR"></input>
        </div>
      </div>
    </div>
  );

}