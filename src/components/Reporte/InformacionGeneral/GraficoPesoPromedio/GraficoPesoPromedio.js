import { useSelector } from 'react-redux'
import { dividirDatosSegun } from '../../utilitiesReporte'
import { groupBy } from '../../utilitiesReporte'
import { 
  colFechaPeces, 
  colPiscicultura, 
  colPeso1, 
  colPeso2 
} from '../../../../constants'
import './GraficoPesoPromedio.css'

const GraficoPesoPromedio = () => {

  const { 
    datosFiltradosPeces,
    divisionTemporal,
    fechaFinal
  } = useSelector(state => state.reporte)

  const datosDivididos = dividirDatosSegun(divisionTemporal, datosFiltradosPeces, colFechaPeces, fechaFinal)
  const datosGrafico = datosDivididos.datos.slice(-1)[0]
  
  if (datosGrafico.length === 0) {
    return (
      <div className="GraficoPesoPromedio">
        <p className="GraficoPesoPromedio__titulo">
          Peso promedio pez (g) al tratamiento por piscicultura
        </p>
        <div className="GraficoPesoPromedio__contenedor_grafico">
          <div className="GraficoPesoPromedio__contenedor_grafico__error">
            Sin datos disponibles<br/> en {datosDivididos.labels.slice(-1)[0]}
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
  })

  const vMax = Math.ceil(datos.reduce((max, v) => Math.max(max, v.valor), 0))
  const vMin = Math.floor(datos.reduce((min, v) => Math.min(min, v.valor), Infinity))
  const tick = Math.pow(10, Math.floor(Math.log10(vMin))) / 10
  const yMin = 10 * Math.floor(vMin / tick)
  const yMax = 10 * Math.ceil(vMax / tick)
  const yLineas = [...Array(Math.round(1 + (yMax - yMin) / tick)).fill(0).map((_, i) => yMin + tick * i)].reverse()

  return (
    <div className="GraficoPesoPromedio">
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