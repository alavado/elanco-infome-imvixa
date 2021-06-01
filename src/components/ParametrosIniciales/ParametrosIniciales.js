import { Link } from 'react-router-dom'
import './ParametrosIniciales.css'

const ParametrosIniciales = () => {
  return (
    <div className="ParametrosIniciales">
      <h1>Ingrese parámetros</h1>
      <Link className="ParametrosIniciales__link_siguiente" to="/reporte">Siguiente ❯</Link>
    </div>
  )
}

export default ParametrosIniciales