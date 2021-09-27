import { useSelector } from 'react-redux'
import MensajeError from '../../MensajeError'
import GraficoPecesTratados from './GraficoPecesTratados'
import GraficoPesoPromedio from './GraficoPesoPromedio'
import './InformacionGeneral.css'
import TablaResumen from './TablaResumen'

const InformacionGeneral = () => {

  const { graficos } = useSelector(state => state.graficos)
  const mostrarGraficoPecesTratados = graficos.find(g => g.id === 'GRAFICO_PECES_TRATADOS').visible
  const mostrarGraficoPesoPromedio = graficos.find(g => g.id === 'GRAFICO_PESO_PROMEDIO').visible

  return (
    <div className="InformacionGeneral">
      <h3 className="Reporte__titulo_seccion">
        Información General
      </h3>
      <MensajeError>
        <TablaResumen />
      </MensajeError>
      <MensajeError>
        {mostrarGraficoPecesTratados && <GraficoPecesTratados agrandar={!mostrarGraficoPesoPromedio} />}
      </MensajeError>
      <MensajeError>
        {mostrarGraficoPesoPromedio && <GraficoPesoPromedio agrandar={!mostrarGraficoPecesTratados} />}
      </MensajeError>
    </div>
  )
}

export default InformacionGeneral