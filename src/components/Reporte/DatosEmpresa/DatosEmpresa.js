import { useSelector } from 'react-redux'
import { getFechaInicio } from '../utilitiesReporte'
import './DatosEmpresa.css'

const DatosEmpresa = () => {

  const { nombreEmpresa, fechaInicio, fechaFinal, divisionTemporal } = useSelector(state => state.reporte)
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]
  const today = new Date();
  const fechaInicial = getFechaInicio(fechaInicio, fechaFinal, divisionTemporal)
  const fechaDatosInicial = `${meses[fechaInicial.getMonth()]} ${fechaInicial.getFullYear()}`
  const fechaDatosFinal = `${meses[fechaFinal.getMonth()]} ${fechaFinal.getFullYear()}`
  const fechaDatos = `${fechaDatosInicial} - ${fechaDatosFinal}`
  return (
    <div className="DatosEmpresa">
      <h1 className="DatosEmpresa__nombre">{nombreEmpresa}</h1>
      <div className="DatosEmpresa__titulo">
        <h2 className="DatosEmpresa__subtitulo">INFORME SEGUIMIENTO IMVIXA</h2>
        <div className="DatosEmpresa__fechadatos">{fechaDatos}</div>
      </div>
      <p className="DatosEmpresa__bajada">
        <span className="DatosEmpresa__fecha">Fecha emisión informe: {meses[today.getMonth()]} {today.getFullYear()}</span> · Elaborado por Technical Services de Aqua Elanco · Para mayor información, contacte a su representante de Elanco.
        Los datos del presente informe son confidenciales y pertenecen a {nombreEmpresa}. Prohibida su distribución sin autorización de la empresa. 
      </p>

    </div>
  )
}

export default DatosEmpresa