import { useSelector } from 'react-redux'
import './ComparacionConcentracion.css'
import { 
  extraerUltimosPeriodos,
  mean,
  iqrValues,
  groupBy,
  iqrValuesFixed
} from '../../utilitiesReporte'
import { 
  colFechaPeces, 
  colPisciculturaPeces as colPiscicultura, 
  colSampleOrigin, 
  tipoFreshWater,
  colPPB 
} from '../../../../constants'
import classNames from 'classnames'
import { generalTexts } from '../../generalTexts'

const getBoxPlotData = (datos, nombre, concentracion = null) => {
  if (datos.length === 0) {
    return {
      nombre,
      promedio: 0,
      iqr: 0,
      iqrMitadInferior: 0,
      iqrMitadSuperior: 0,
      mediana: 0,
      max: 0,
      min: 0,
    }
  }
  const values = datos.map(obj => obj[colPPB] / 1000)
  const args = { maximumFractionDigits: 1, minimumFractionDigits: 1 }
  let dat = {
    nombre,
    promedio: concentracion !== null && concentracion.prom !== "" ? concentracion.prom.toLocaleString('de-DE', args) : mean(values).toLocaleString('de-DE', args),
    ...iqrValues(values),
    max: concentracion !== null && concentracion.max !== "" ? concentracion.max : Math.max(...values),
    min: concentracion !== null && concentracion.min !== "" ? concentracion.min : Math.min(...values),
  }
  if (concentracion !== null && concentracion.q2 !== "" ) {
    dat = {
      ...dat,
      ...iqrValuesFixed(concentracion.q2, concentracion.q3, concentracion.q4)
    }
  }
  return dat;
}

const ComparacionConcentracion = ({ agrandar, language }) => {
  const {titulo, yaxis, sindatos, industria, empresa} = generalTexts.gt_GraficoComparacion[language]

  const { 
    divisionTemporal,
    datosFiltradosPeces,
    datosFiltradosIndustriaPeces,
    concentracion,
    fechaFinal
  } = useSelector(state => state.reporte)

  const datosEmpresa = extraerUltimosPeriodos(
    divisionTemporal, 
    datosFiltradosPeces.filter(dato => dato[colSampleOrigin] === tipoFreshWater), 
    colFechaPeces, 
    fechaFinal)
    
  const datosIndustria = extraerUltimosPeriodos(
    divisionTemporal, 
    datosFiltradosIndustriaPeces.filter(dato => dato[colSampleOrigin] === tipoFreshWater), 
    colFechaPeces, 
    fechaFinal)

  const datosPorPiscicultura = groupBy(datosEmpresa, colPiscicultura)

  if (Object.values(datosPorPiscicultura).every(obj => obj.length === 0)) {
    return (
      <div className="ComparacionConcentracion">
        <p className="ComparacionConcentracion__titulo">{titulo} </p>
        <div className="ComparacionConcentracion__contenedor_grafico">
          <div className="ComparacionConcentracion__contenedor_grafico_error">
           {sindatos}
          </div>
        </div>
      </div>
    )
  }
  
  const datos = [
    getBoxPlotData(datosIndustria, industria, concentracion),
    getBoxPlotData(datosEmpresa, empresa),
    ...Object.keys(datosPorPiscicultura).map(pisc => getBoxPlotData(datosPorPiscicultura[pisc], pisc)).sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0))

  ]

  const xMax = datos.reduce((max, d) => {
    return d.max > max ? (5 * Math.floor((d.max + 5) / 5)) : max
  }, 0)
  let datosPlus = datos.map(d => ({ ...d, x: d.q25 - d.min, y:  d.max - d.q75}))
  const separaciones = 1 + xMax / 5

  var peque = datosPlus.some(d => (d.iqr / xMax) < 0.1)

  return (
    <div
      className="ComparacionConcentracion"
      style={{ gridColumn: `span ${agrandar ? 2 : 1}` }}
    >
      <p className="ComparacionConcentracion__titulo">
        {titulo}
      </p>
      <div className="ComparacionConcentracion__contenedor_grafico">
        {[...datosPlus, { nombre: '' }].map((d, i) => (
          <div key={`categoria-cc-${i}`} className="ComparacionConcentracion__categoria">
            <div className="ComparacionConcentracion__etiqueta_categoria">{d.nombre}</div>
            {d.nombre &&
              <div
                className="ComparacionConcentracion__contenedor_caja"
                style={{
                  left: `calc(5.5rem + (100% - 6rem) * ${d.min / xMax})`,
                  right: `calc(.5rem + (100% - 6rem) * ${(xMax - d.max) / xMax})`,
                }}
              >
                <div
                  className="ComparacionConcentracion__bigote_inferior"
                  style={{ width: `${100 * d.x / (d.max - d.min)}%` }}
                />
                <div
                  className={classNames({
                    "ComparacionConcentracion__caja": true,
                    "ComparacionConcentracion__caja--chica": (d.iqr / xMax) < 0.1,
                  })}
                 
                >
                  <span className={
                    classNames({
                      "ComparacionConcentracion__caja_peque": peque
                    })
                  }>{d.promedio }</span> 
                </div>
                <div
                  className="ComparacionConcentracion__bigote_superior"
                  style={{ width: `${100 * d.y /  (d.max - d.min)}%` }}
                />
              </div>
            }
            {Array(separaciones).fill(0).map((_, i) => (
              <div key={`sep-cc-${i}`} className="ComparacionConcentracion__separacion" />
            ))}
          </div>
        ))}
        <div className="ComparacionConcentracion__valores">
          <div className="ComparacionConcentracion__etiqueta_categoria" />
          {Array(separaciones).fill(0).map((_, i) => (
            <div key={`etiqueta-cc-${i}`} className="ComparacionConcentracion__valor">
              {i % 2 > 0 ? '' : (i * xMax / (separaciones - 1))}
            </div>
          ))}
        </div>
      </div>
      <div className="ComparacionConcentracion__eje">
        <p>{yaxis} </p>
      </div>
      {/* <div className="ComparacionConcentracion__bajada">
        <p>Promedio {periodo}</p>
      </div> */}
    </div>
  )
}

export default ComparacionConcentracion