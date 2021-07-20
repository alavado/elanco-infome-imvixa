import MensajeError from '../../MensajeError'
import GraficoPecesTratados from './GraficoPecesTratados'
import GraficoPesoPromedio from './GraficoPesoPromedio'
import './InformacionGeneral.css'
import TablaResumen from './TablaResumen'

const InformacionGeneral = () => {
  return (
    <div className="InformacionGeneral">
      <h3 className="Reporte__titulo_seccion">
        Información General
      </h3>
      <MensajeError>
        <TablaResumen />
      </MensajeError>
      <MensajeError>
        <GraficoPecesTratados />
      </MensajeError>
      <MensajeError>
        <GraficoPesoPromedio />
      </MensajeError>
    </div>
  )
}

export default InformacionGeneral