import { useSelector } from 'react-redux'
import { extraerUltimosPeriodos } from '../../utilitiesReporte'
import { groupBy } from '../../utilitiesReporte'
import { 
  colFechaPeces, 
  colPiscicultura, 
  colSampleOrigin,
  tipoFreshWater,
  colPeso1, 
  colPeso2 
} from '../../../../constants'
import './GraficoPesoPromedio.css'

const GraficoPesoPromedio = ({ agrandar }) => {

  const { 
    datosFiltradosPeces,
    divisionTemporal,
    fechaFinal
  } = useSelector(state => state.reporte)

  const datosGrafico = extraerUltimosPeriodos(
    divisionTemporal, 
    datosFiltradosPeces.filter(v => v[colSampleOrigin] === tipoFreshWater), 
    colFechaPeces, 
    fechaFinal)
  
  if (datosGrafico.length === 0) {
    return (
      <div className="GraficoPesoPromedio">
        <p className="GraficoPesoPromedio__titulo">
          Peso promedio pez (g) al tratamiento por piscicultura
        </p>
        <div className="GraficoPesoPromedio__contenedor_grafico">
          <div className="GraficoPesoPromedio__contenedor_grafico__error">
            Sin datos disponibles en el periodo seleccionado
          </div>
        </div>
      </div>
    )
  } 
  const datosGrouped = groupBy(datosGrafico, colPiscicultura)
  const datos = Object.keys(datosGrouped).map(piscicultura => {
    return {
      nombre: piscicultura,
      valor: Math.round(datosGrouped[piscicultura].map(row => {
        if (row[colPeso1]) return row[colPeso1]
        return row[colPeso2]
      }).reduce((prev, curr) => prev + curr, 0) / datosGrouped[piscicultura].length)
    }
  }).sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0))

  const vMax = Math.max(...datos.map(d => d.valor))
  const vMin = Math.min(...datos.map(d => d.valor))
  const tick = Math.pow(10, Math.floor(Math.log10(vMax))) / 10
  const yMin = 0 * Math.floor(vMin / tick)
  const yMax = 10 * Math.ceil(vMax / tick)
  const totalLineas = Math.round(1 + (yMax - yMin) / tick)
  const yLineas = [
    ...Array(totalLineas)
    .fill(0).map((_, i) => yMin + tick * i)]
    .filter((_, i) => i % Math.floor(totalLineas / 10) === 0 || i === totalLineas - 1)
    .reverse()

  return (
    <div
      className="GraficoPesoPromedio"
      style={{ gridColumn: `span ${agrandar ? 2 : 1}` }}
    >
      <p className="GraficoPesoPromedio__titulo">
        Peso promedio pez (g) al tratamiento por piscicultura
      </p>
      <div className="GraficoPesoPromedio__contenedor_grafico">
        <p className="GraficoPesoPromedio__etiqueta_eje_y">
          Gramos
        </p>
        <div className="GraficoPesoPromedio__contenedor_lineas">
          {yLineas.map(y => (
            <div key={`lineay-${y}`} className="GraficoPesoPromedio__linea">
              <p className="GraficoPesoPromedio__etiqueta_linea">
                {y.toLocaleString('de-DE')}
              </p>
            </div>
          ))}
        </div>
        {datos.map(d => (
          <div key={`barra-${d.nombre}`} className="GraficoPesoPromedio__contenedor_barra">
            <div
              className="GraficoPesoPromedio__barra"
              style={{ '--porcentaje-lleno': `${((d.valor - yMin) / (yMax - yMin)) * 100}%` }}
            >
              {d.valor.toFixed(0).toLocaleString('de-DE')}
            </div>
            <div className="GraficoPesoPromedio__etiqueta_barra">
              {d.nombre}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GraficoPesoPromedio