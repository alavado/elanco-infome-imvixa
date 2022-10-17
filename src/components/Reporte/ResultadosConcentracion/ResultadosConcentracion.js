import MensajeError from '../../MensajeError'
import ComparacionConcentracion from './ComparacionConcentracion'
import ConcentracionEnMusculo from './ConcentracionEnMusculo'
import CumplimientoConcentracion from './CumplimientoConcentracion'
import { useSelector } from 'react-redux'
import './ResultadosConcentracion.css'
import { generalTexts } from '../generalTexts'

const ResultadosConcentracion = ({language}) => {

  const { graficos } = useSelector(state => state.graficos)
  const mostrarGraficoCumplimientoConcentracion = graficos.find(g => g.id === 'GRAFICO_CUMPLIMIENTO').visible
  const mostrarGraficoConcentracionMusculo = graficos.find(g => g.id === 'GRAFICO_CONCENTRACION_MUSCULO').visible
  const mostrarGraficoComparacionConcentracion = graficos.find(g => g.id === 'GRAFICO_COMPARACION_CONCENTRACION').visible
  const texto = generalTexts.ResultadosConcentracion[language]

  if (!mostrarGraficoCumplimientoConcentracion && !mostrarGraficoConcentracionMusculo && !mostrarGraficoComparacionConcentracion) {
    return <div />
  }

  return (
    <div className="ResultadosConcentracion">
      <h3 className="Reporte__titulo_seccion">
        {texto}
      </h3>
      <MensajeError>
        {mostrarGraficoCumplimientoConcentracion && <CumplimientoConcentracion  language={language} />}
      </MensajeError>
      <MensajeError>
        {mostrarGraficoConcentracionMusculo && <ConcentracionEnMusculo language={language} />}
      </MensajeError>
      <MensajeError>
        {mostrarGraficoComparacionConcentracion && <ComparacionConcentracion agrandar={!mostrarGraficoCumplimientoConcentracion || !mostrarGraficoConcentracionMusculo}  language={language}  />}
      </MensajeError>
    </div>
  )
}

export default ResultadosConcentracion