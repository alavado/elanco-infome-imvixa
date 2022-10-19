import { useSelector } from 'react-redux'
import './CumplimientoConcentracion.css'
import { generalTexts } from '../../generalTexts'

const CumplimientoConcentracion = ({language}) => {
  const languageLocale = generalTexts.languageLocale[language]
  const {titulo, yaxis, sindatos, industria} = generalTexts.gt_GraficoCumplimiento[language]
  
  const {
    datosCConcentracion
  } = useSelector(state => state.reporte)

  const datos = [...datosCConcentracion]
  
  if (datos.length === 0) {
    return (      
      <div className="CumplimientoConcentracion">
        <p className="CumplimientoConcentracion__titulo">
          {titulo}
        </p>
        <div className="CumplimientoConcentracion__contenedor_grafico">
          <div className="CumplimientoConcentracion__contenedor_grafico__error">
            {sindatos}
          </div>
        </div>
      </div>
    )
  }
  datos[0] = {
    nombre: industria,
    ...datos[0]
  }

  const vMax = Math.ceil(datos.reduce((max, v) => Math.max(max, v.max), 0))
  const vMin = Math.floor(datos.reduce((min, v) => Math.min(min, v.min), Infinity))
  const tick = Math.pow(10, Math.floor(Math.log10(vMin)))
  let yMax = Math.max(100, 10 * Math.ceil(vMax / tick))
  const yMin = Math.min(50, 10 * Math.floor(vMin / tick),vMin)
  const yLineas = [...Array(Math.round(1 + (yMax - yMin) / tick)).fill(0).map((_, i) => yMin + tick * i)].reverse()
  yMax = Math.max(...yLineas)

  return (
    <div className="CumplimientoConcentracion">
      <p className="CumplimientoConcentracion__titulo">
        {titulo}
      </p>
      <div className="CumplimientoConcentracion__contenedor_grafico">
        <p className="CumplimientoConcentracion__etiqueta_eje_y">
        {yaxis}
        </p>
        <div className="CumplimientoConcentracion__contenedor_lineas">
          {yLineas.map(y => (
            <div key={`lineay-${y}`} className="CumplimientoConcentracion__linea">
              <p className="CumplimientoConcentracion__etiqueta_linea">
                {y.toLocaleString(languageLocale)}
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
                '--porcentaje-bottom': `${Math.max(0, ((d.mediana - d.iqrMitadInferior - yMin) / (yMax - yMin)) * 100)}%`,
                '--porcentaje-top': `${((yMax - d.iqrMitadSuperior - d.mediana) / (yMax - yMin)) * 100}%`
              }}
            >
              {d.promedio.toLocaleString(languageLocale, { maximumFractionDigits: 1, minimumFractionDigits: 1 })}
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