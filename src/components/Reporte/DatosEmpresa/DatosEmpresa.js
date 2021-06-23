import { useSelector } from 'react-redux'
import './DatosEmpresa.css'

const DatosEmpresa = () => {

  const { nombreEmpresa } = useSelector(state => state.reporte)

  return (
    <div className="DatosEmpresa">
      <h1 className="DatosEmpresa__nombre">{nombreEmpresa}</h1>
      <h2 className="DatosEmpresa__subtitulo">INFORME SEGUIMIENTO IMVIXA</h2>
      <p className="DatosEmpresa__bajada">
        <span className="DatosEmpresa__fecha">MARZO.2021</span> · Elaborado por Technical Services de Aqua Elanco · Para mayor información, contacte a su representante de Elanco.
      </p>
      <p className="DatosEmpresa__bajada">
        Los datos del presente informe son confidenciales y pertenecen a {nombreEmpresa}. Prohibida su distribución sin autorización de la empresa.
      </p>
    </div>
  )
}

export default DatosEmpresa