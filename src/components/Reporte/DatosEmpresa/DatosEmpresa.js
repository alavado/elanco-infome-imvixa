import { useSelector } from 'react-redux'
import { divisionTemporalAPalabra } from '../utilitiesReporte'
import './DatosEmpresa.css'

const DatosEmpresa = () => {

  const { nombreEmpresa, fechaFinal, divisionTemporal } = useSelector(state => state.reporte)
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]
  return (
    <div className="DatosEmpresa">
      <h1 className="DatosEmpresa__nombre">{nombreEmpresa}</h1>
      <h2 className="DatosEmpresa__subtitulo">INFORME SEGUIMIENTO IMVIXA</h2>
      <p className="DatosEmpresa__bajada">
        <span className="DatosEmpresa__fecha">Fecha emisión informe: {meses[fechaFinal.getMonth()]} {fechaFinal.getFullYear()}</span> · Elaborado por Technical Services de Aqua Elanco · Para mayor información, contacte a su representante de Elanco.
        Los datos del presente informe son confidenciales y pertenecen a {nombreEmpresa}. Prohibida su distribución sin autorización de la empresa. 
      </p>
      {/* <p className="DatosEmpresa__bajada">
        Los gráficos de las secciones Información General y Resultado de concentración han sido elaborados con datos de los últimos 5 {divisionTemporalAPalabra(divisionTemporal)}
      </p>
      <p className="DatosEmpresa__bajada">
        Los gráficos de la sección Resultados de eficacia Imvixa han sido elaborados con datos de los últimos 18 meses
      </p> */}
    </div>
  )
}

export default DatosEmpresa