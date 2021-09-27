import { useSelector } from 'react-redux'
import MensajeError from '../../MensajeError'
import ProteccionMacrozonas from './ProteccionMacrozonas'
import './ResultadosEficacia.css'
import Tratamientos from './Tratamientos'

const ResultadosEficacia = () => {

  const { graficos } = useSelector(state => state.graficos)
  const mostrarGraficoTratamientos = graficos.find(g => g.id === 'GRAFICO_EFICACIA').visible
  const mostrarMapaMacrozonas = graficos.find(g => g.id === 'GRAFICO_MACROZONAS').visible

  if (!mostrarGraficoTratamientos && !mostrarMapaMacrozonas) {
    return null
  }

  return (
    <div className="ResultadosEficacia">
      <h3 className="Reporte__titulo_seccion">
        Resultados de eficacia Imvixa
      </h3>
      <MensajeError>
        {mostrarGraficoTratamientos && <Tratamientos />}
      </MensajeError>
      <MensajeError>
        {mostrarMapaMacrozonas && <ProteccionMacrozonas />}
      </MensajeError>
    </div>
  )
}

export default ResultadosEficacia