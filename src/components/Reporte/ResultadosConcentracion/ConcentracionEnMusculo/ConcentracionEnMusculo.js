import { useSelector } from 'react-redux'
import './ConcentracionEnMusculo.css'
import { generalTexts } from '../../generalTexts'

const ConcentracionEnMusculo = ({language}) => {

  const {
    datosCMusculo: datos
  } = useSelector(state => state.reporte)

  const languageLocale = generalTexts.languageLocale[language]
  const {titulo, yaxis, sindatos, sd} = generalTexts.gt_GraficoConcentracionEnMusculo[language]


  if (datos.length === 0) {
    return (
      <div className="ConcentracionEnMusculo">
        <p className="ConcentracionEnMusculo__titulo">{titulo}</p>
        <div className="ConcentracionEnMusculo__contenedor_grafico">
          <div className="ConcentracionEnMusculo__contenedor_grafico_error">
            {sindatos}
          </div>
        </div>
      </div>
    )
  }


  const vMin = Math.min(...datos.map(v => v.min))
  const vMax = Math.max(...datos.map(v => v.max))
  const tick = 5 //Math.pow(10, Math.floor(Math.log10(vMin)))
  let yMax = Math.min(vMax + 5, 10 * Math.ceil(vMax / tick))
  const yMin = Math.min(0,vMin)
  const yLineas = [
    ...Array(Math.round(1 + (yMax - yMin) / tick))
    .fill(0).map((_, i) => yMin + tick * i)
  ].reverse()
  yMax = Math.max(...yLineas)
  return (
    <div className="ConcentracionEnMusculo">
      <p className="ConcentracionEnMusculo__titulo">
        {titulo}
      </p>
      <div className="ConcentracionEnMusculo__contenedor_grafico">
        <p className="ConcentracionEnMusculo__etiqueta_eje_y" style={{left: language === 'es' ? "-3.5rem" : "-4.8rem"}}>
          {yaxis}
        </p>
        <div className="ConcentracionEnMusculo__contenedor_lineas">
          {yLineas.map(y => (
            <div key={`lineay-${y}`} className="ConcentracionEnMusculo__linea">
              <p className="ConcentracionEnMusculo__etiqueta_linea">
                {y.toLocaleString(languageLocale)}
              </p>
            </div>
          ))}
        </div>
        {datos.map(d => {
          if (d.promedio === 0) {
            return (
                <div key={`caja-cc-${d.nombre}`} className="ConcentracionEnMusculo__contenedor_caja">
                  <div className="ConcentracionEnMusculo__si">{sd}</div>
                <div className="ConcentracionEnMusculo__etiqueta_caja">
                  {d.nombre.split(' ').map((n, i) => <div key={`${d.nombre}-${i}`}>{n}</div>)}
                </div>
              </div>
            )
          }
          var size_box = (d.mediana + d.iqrMitadSuperior) - (d.mediana - d.iqrMitadInferior);
          var prom_dmin = d.promedio - (d.mediana - d.iqrMitadInferior);
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
                  '--porcentaje-bottom': `${(Math.max(0, (d.mediana - d.iqrMitadInferior - yMin)) / (yMax - yMin)) * 100}%`,
                  '--porcentaje-top': `${((yMax - d.iqrMitadSuperior - d.mediana) / (yMax - yMin)) * 100}%`
                }}
              >
                  <div 
                    className="ConcentracionEnMusculo__caja_item"
                    style={{
                      '--porcentaje-bottom': `${(Math.max(0, prom_dmin) / size_box) * 100}%`,
                    }}
                  >
                    {d.promedio.toLocaleString(languageLocale, { maximumFractionDigits: 1, minimumFractionDigits: 1 })}
                  </div>
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