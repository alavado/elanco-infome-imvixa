import { useSelector } from 'react-redux'
import { dividirDatosSegun } from '../../utilitiesReporte'
import { colFechaPeces, colPPB, colSampleOrigin, tipoFreshWater } from '../../../../constants'
import { mean, iqr } from '../../utilitiesReporte'
import './ConcentracionEnMusculo.css'

const ConcentracionEnMusculo = () => {

  const {
    datosFiltradosPeces,
    divisionTemporal,
    fechaFinal
  } = useSelector(state => state.reporte)

  const datosDivididos = dividirDatosSegun(
    divisionTemporal, 
    datosFiltradosPeces.filter(dato => dato[colSampleOrigin] === tipoFreshWater), 
    colFechaPeces, 
    fechaFinal
  )

  if (datosDivididos.datos.every(obj => obj.length === 0)) {
    return (
      <div className="ConcentracionEnMusculo">
        <p className="ConcentracionEnMusculo__titulo">Concentración (ppb) en músculo post tratamiento</p>
        <div className="ConcentracionEnMusculo__contenedor_grafico">
          <div className="ConcentracionEnMusculo__contenedor_grafico_error">
            Sin datos disponibles para el periodo seleccionado
          </div>
        </div>
      </div>
    )
  }

  const datos = datosDivididos.labels.map((nombre, index) => { 
    if (datosDivididos.datos[index].length === 0) {
      return {
        nombre,
        promedio: 0,
        iqr: 0,
        max: 0,
        min: 0,
      }
    }
    const values = datosDivididos.datos[index].map(obj => obj[colPPB] / 1000)
    return {
      nombre,
      promedio: mean(values),
      iqr: iqr(values),
      max: Math.max(...values),
      min: Math.min(...values),
  }})

  const vMin = Math.min(...datos.map(v => v.promedio))
  const vMax = Math.max(...datos.map(v => v.promedio))
  const tick = 5 //Math.pow(10, Math.floor(Math.log10(vMin)))
  const yMax = Math.max(vMax + 5, 10 * Math.ceil(vMax / tick))
  const yMin = Math.min(0, 10 * Math.floor(vMin / tick))
  const yLineas = [
    ...Array(Math.round(1 + (yMax - yMin) / tick))
    .fill(0).map((_, i) => yMin + tick * i)
  ].reverse()

  console.log({datos})

  console.log({
    vMin,
vMax,
tick,
yMax,
yMin,

  })

  return (
    <div className="ConcentracionEnMusculo">
      <p className="ConcentracionEnMusculo__titulo">
        Concentración (ppb) en músculo
        post tratamiento
      </p>
      <div className="ConcentracionEnMusculo__contenedor_grafico">
        <p className="ConcentracionEnMusculo__etiqueta_eje_y">
          Miles
        </p>
        <div className="ConcentracionEnMusculo__contenedor_lineas">
          {yLineas.map(y => (
            <div key={`lineay-${y}`} className="ConcentracionEnMusculo__linea">
              <p className="ConcentracionEnMusculo__etiqueta_linea">
                {y.toLocaleString('de-DE')}
              </p>
            </div>
          ))}
        </div>
        {datos.map(d => {
          if (d.promedio === 0) {
            return (
                <div key={`caja-cc-${d.nombre}`} className="ConcentracionEnMusculo__contenedor_caja">
                  <div className="ConcentracionEnMusculo__si">sin datos</div>
                <div className="ConcentracionEnMusculo__etiqueta_caja">
                  {d.nombre.split(' ').map((n, i) => <div key={`${d.nombre}-${i}`}>{n}</div>)}
                </div>
              </div>
            )
          }
          return (
            <div key={`caja-cc-${d.nombre}`} className="ConcentracionEnMusculo__contenedor_caja">
              <div
                className="ConcentracionEnMusculo__bigote"
                style={{
                  '--porcentaje-top': `${((yMax - d.max) / (yMax - yMin)) * 100}%`,
                  '--porcentaje-bottom': `${((d.min) / (yMax - yMin)) * 100}%`,
                }}
              />
              <div
                className="ConcentracionEnMusculo__caja"
                style={{
                  '--porcentaje-bottom': `${(Math.max(0, (d.promedio - d.iqr / 2 - yMin)) / (yMax - yMin)) * 100}%`,
                  '--porcentaje-top': `${((yMax - d.iqr / 2 - d.promedio) / (yMax - yMin)) * 100}%`
                }}
              >
                {d.promedio.toFixed(0).toLocaleString('de-DE')}M
              </div>
              <div className="ConcentracionEnMusculo__etiqueta_caja">
                {d.nombre.split(' ').map((n, i) => <div key={`${d.nombre}-${i}`}>{n}</div>)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ConcentracionEnMusculo