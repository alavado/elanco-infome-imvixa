import { useSelector } from 'react-redux'
import MensajeError from '../../MensajeError'
import GraficoPecesTratados from './GraficoPecesTratados'
import GraficoPesoPromedio from './GraficoPesoPromedio'
import './InformacionGeneral.css'
import TablaResumen from './TablaResumen'
import { generalTexts } from "../generalTexts";

const InformacionGeneral = ({language}) => {

  const { graficos } = useSelector(state => state.graficos)
  const mostrarGraficoPecesTratados = graficos.find(g => g.id === 'GRAFICO_PECES_TRATADOS').visible
  const mostrarGraficoPesoPromedio = graficos.find(g => g.id === 'GRAFICO_PESO_PROMEDIO').visible
  const titulo1 = generalTexts.titulo1[language]
  return (
    <div className="InformacionGeneral">
      <h3 className="Reporte__titulo_seccion">
        {titulo1}
      </h3>
      <MensajeError>
        <TablaResumen language={language} />
      </MensajeError>
      <MensajeError>
        {mostrarGraficoPecesTratados && <GraficoPecesTratados agrandar={!mostrarGraficoPesoPromedio} language={language}/>}
      </MensajeError>
      <MensajeError>
        {mostrarGraficoPesoPromedio && <GraficoPesoPromedio agrandar={!mostrarGraficoPecesTratados} language={language}/>}
      </MensajeError>
    </div>
  )
}

export default InformacionGeneral