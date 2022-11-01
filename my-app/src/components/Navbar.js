import { NavLink} from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
        <ul className="waiterOptionsMenu">
            <li  className="waiterButtonsMenu"><NavLink to="/Menu" className="waiterButtons">REGISTRAR</NavLink></li>
            <li  className="waiterButtonsMenu" ><NavLink to="/Menu/Pendientes" className="waiterButtons">PENDIENTES</NavLink></li>
            <li  className="waiterButtonsMenu" ><NavLink to="/Menu/Preparados" className="waiterButtons">PREPARADOS</NavLink></li>
            <li  className="waiterButtonsMenu" ><NavLink to="/Menu/Entregados" className="waiterButtons">ENTREGADOS</NavLink></li>
        </ul>
    </div>
  )
}
