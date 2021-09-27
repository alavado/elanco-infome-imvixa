import MensajeError from '../../MensajeError'
import ComparacionConcentracion from './ComparacionConcentracion'
import ConcentracionEnMusculo from './ConcentracionEnMusculo'
import CumplimientoConcentracion from './CumplimientoConcentracion'
import { useSelector } from 'react-redux'
import './ResultadosConcentracion.css'

const ResultadosConcentracion = () => {

  const { graficos } = useSelector(state => state.graficos)
  const mostrarGraficoCumplimientoConcentracion = graficos.find(g => g.id === 'GRAFICO_CUMPLIMIENTO').visible
  const mostrarGraficoConcentracionMusculo = graficos.find(g => g.id === 'GRAFICO_CONCENTRACION_MUSCULO').visible
  const mostrarGraficoComparacionConcentracion = graficos.find(g => g.id === 'GRAFICO_COMPARACION_CONCENTRACION').visible

  if (!mostrarGraficoCumplimientoConcentracion && !mostrarGraficoConcentracionMusculo && !mostrarGraficoComparacionConcentracion) {
    return <div />
  }

  return (
    <div className="ResultadosConcentracion">
      <h3 className="Reporte__titulo_seccion">
        Resultado de concentración en alimento y agua dulce
      </h3>
      <MensajeError>
        {mostrarGraficoCumplimientoConcentracion && <CumplimientoConcentracion />}
      </MensajeError>
      <MensajeError>
        {mostrarGraficoConcentracionMusculo && <ConcentracionEnMusculo />}
      </MensajeError>
      <MensajeError>
        {mostrarGraficoComparacionConcentracion && <ComparacionConcentracion agrandar={!mostrarGraficoCumplimientoConcentracion || !mostrarGraficoConcentracionMusculo} />}
      </MensajeError>
    </div>
  )
}

export default ResultadosConcentracion