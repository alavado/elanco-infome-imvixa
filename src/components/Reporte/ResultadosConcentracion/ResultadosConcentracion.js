import ComparacionConcentracion from './ComparacionConcentracion'
import ConcentracionEnMusculo from './ConcentracionEnMusculo'
import CumplimientoConcentracion from './CumplimientoConcentracion'
import './ResultadosConcentracion.css'

const ResultadosConcentracion = () => {
  return (
    <div className="ResultadosConcentracion">
      <h3 className="Reporte__titulo_seccion">
        Resultado de concentración en alimento y agua dulce
      </h3>
      <CumplimientoConcentracion />
      <ConcentracionEnMusculo />
      <ComparacionConcentracion />
    </div>
  )
}

export default ResultadosConcentracion