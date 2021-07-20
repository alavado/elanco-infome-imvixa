import MensajeError from '../../MensajeError'
import ProteccionMacrozonas from './ProteccionMacrozonas'
import './ResultadosEficacia.css'
import Tratamientos from './Tratamientos'

const ResultadosEficacia = () => {
  return (
    <div className="ResultadosEficacia">
      <h3 className="Reporte__titulo_seccion">
        Resultados de eficacia Imvixa
      </h3>
      <MensajeError>
        <Tratamientos />
      </MensajeError>
      <MensajeError>
        <ProteccionMacrozonas />
      </MensajeError>
    </div>
  )
}

export default ResultadosEficacia