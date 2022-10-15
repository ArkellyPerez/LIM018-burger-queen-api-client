import { NavLink} from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="waiterOptions" >
        <ul>
            <li><NavLink to="/Menu" className="waiterButtons" >Registrar Pedidos</NavLink></li>
            <li><NavLink to="/Menu/Pendientes" className="waiterButtons" >Pedidos Pendientes</NavLink></li>
            <li><NavLink to="/Menu/Preparados" className="waiterButtons" >Pedidos Preparados</NavLink></li>
            <li><NavLink to="/Menu/Entregados" className="waiterButtons" >Pedidos Entregados</NavLink></li>
        </ul>
    </div>
  )
}
