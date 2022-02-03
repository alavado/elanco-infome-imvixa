import { useSelector } from 'react-redux'
import { groupBy, mean, extraerUltimosPeriodos, iqrValues, iqr } from '../../utilitiesReporte'
import { colFechaAlimento, colCumplimiento, colPlanta } from '../../../../constants'
import './CumplimientoConcentracion.css'

const CumplimientoConcentracion = () => {
  
  const { 
    datosFiltradosAlimento,
    datosFiltradosIndustriaAlimento,
    divisionTemporal,
    fechaFinal
  } = useSelector(state => state.reporte)
  
  // const datosDivididos = dividirDatosSegun(divisionTemporal, datosFiltradosAlimento, colFechaAlimento, fechaFinal)
  const ultimosDatos = extraerUltimosPeriodos(divisionTemporal, datosFiltradosAlimento, colFechaAlimento, fechaFinal)
  const datosGrouped = groupBy(ultimosDatos, colPlanta)
  const plantas = Object.keys(datosGrouped)
  if (plantas.length === 0) {
    return (      
      <div className="CumplimientoConcentracion">
        <p className="CumplimientoConcentracion__titulo">
          Cumplimiento (%) concentración en alimento (logrado / intentado)
        </p>
        <div className="CumplimientoConcentracion__contenedor_grafico">
          <div className="CumplimientoConcentracion__contenedor_grafico__error">
            Sin datos disponibles en el periodo seleccionado
          </div>
        </div>
      </div>
    )
  }
  const ultimosDatosIndustria = extraerUltimosPeriodos(divisionTemporal, datosFiltradosIndustriaAlimento, colFechaAlimento, fechaFinal)
  const cumplimientosIndustria = ultimosDatosIndustria.map(obj => obj[colCumplimiento] * 100)
  const datosIndustria = {
    nombre: "Industria",
    promedio: mean(cumplimientosIndustria),
    ...iqrValues(cumplimientosIndustria),
    max: Math.max(...cumplimientosIndustria),
    min: Math.min(...cumplimientosIndustria),
  }
  
  const datos = [
    datosIndustria,
    ...plantas.map(planta => {
      const values = datosGrouped[planta].map((obj) => obj[colCumplimiento] * 100)
      return {
        nombre: planta,
        promedio: mean(values),
        ...iqrValues(values),
        max: Math.max(...values),
        min: Math.min(...values),
      }
    }).sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0))
  ]

  const vMax = Math.ceil(datos.reduce((max, v) => Math.max(max, v.max), 0))
  const vMin = Math.floor(datos.reduce((min, v) => Math.min(min, v.promedio), Infinity))
  const tick = Math.pow(10, Math.floor(Math.log10(vMin)))
  let yMax = Math.max(100, 10 * Math.ceil(vMax / tick))
  const yMin = Math.min(50, 10 * Math.floor(vMin / tick))
  const yLineas = [...Array(Math.round(1 + (yMax - yMin) / tick)).fill(0).map((_, i) => yMin + tick * i)].reverse()
  yMax = Math.max(...yLineas)

  return (
    <div className="CumplimientoConcentracion">
      <p className="CumplimientoConcentracion__titulo">
        Cumplimiento (%) concentración en alimento (logrado / intentado)
      </p>
      <div className="CumplimientoConcentracion__contenedor_grafico">
        <p className="CumplimientoConcentracion__etiqueta_eje_y">
        % de cumplimiento
        </p>
        <div className="CumplimientoConcentracion__contenedor_lineas">
          {yLineas.map(y => (
            <div key={`lineay-${y}`} className="CumplimientoConcentracion__linea">
              <p className="CumplimientoConcentracion__etiqueta_linea">
                {y.toLocaleString('de-DE')}
              </p>
            </div>
          ))}
        </div>
        {datos.map(d => (
          <div key={`caja-cc-${d.nombre}`} className="CumplimientoConcentracion__contenedor_caja">
            <div
              className="CumplimientoConcentracion__bigote"
              style={{
                '--porcentaje-top': `${((yMax - d.max) / (yMax - yMin)) * 100}%`,
                'height': `${((d.max - d.min) / (yMax - yMin)) * 100}%`
              }}
            />
            <div
              className="CumplimientoConcentracion__caja"
              style={{
                '--porcentaje-bottom': `${((d.mediana - d.iqrMitadInferior - yMin) / (yMax - yMin)) * 100}%`,
                '--porcentaje-top': `${((yMax - d.iqrMitadSuperior - d.mediana) / (yMax - yMin)) * 100}%`
              }}
            >
              {d.promedio.toFixed(1).toLocaleString('de-DE')}
            </div>
            <div className="CumplimientoConcentracion__etiqueta_caja">
              {d.nombre.split(' ').map((n, i) => <div key={`${d.nombre}-${i}`}>{n}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CumplimientoConcentracion