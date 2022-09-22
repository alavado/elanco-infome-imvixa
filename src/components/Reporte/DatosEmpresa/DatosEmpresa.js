import './DatosEmpresa.css'
import { meses } from '../utilitiesReporte'

const DatosEmpresa = ({ nombreEmpresa, fechaDatos, fecha }) => {
  const today = new Date(fecha);
  return (
    <div className="DatosEmpresa">
      <div className="DatosEmpresa__titulo">
      <h1 className="DatosEmpresa__nombre">{nombreEmpresa}</h1>
       { fechaDatos !== null && <div className="DatosEmpresa__fechadatos">{fechaDatos}</div>}
      </div>
      <p className="DatosEmpresa__bajada">
        <span className="DatosEmpresa__fecha">Fecha emisión informe: {today.getDate()} de {meses[today.getMonth()]} {today.getFullYear()}</span> · Elaborado por Technical Services de Aqua Elanco · Para mayor información, contacte a su representante de Elanco.
        Los datos del presente informe son confidenciales y pertenecen a {nombreEmpresa}. Prohibida su distribución sin autorización de la empresa. 
      </p>

    </div>
  )
}

export default DatosEmpresa