import ProteccionMacrozonas from './ProteccionMacrozonas'
import './ResultadosEficacia.css'
import Tratamientos from './Tratamientos'

const ResultadosEficacia = () => {
  return (
    <div className="ResultadosEficacia">
      <h3 className="Reporte__titulo_seccion">
        Resultados de eficacia
      </h3>
      <Tratamientos />
      <ProteccionMacrozonas />
    </div>
  )
}

export default ResultadosEficacia