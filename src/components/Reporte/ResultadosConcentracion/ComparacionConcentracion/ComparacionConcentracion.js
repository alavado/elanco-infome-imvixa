import { useSelector } from 'react-redux'
import './ComparacionConcentracion.css'
import { 
  divisionTemporalALetra, 
  extraerUltimosPeriodos,
  mean,
  iqr,
  groupBy
} from '../../utilitiesReporte'
import { 
  colFechaPeces, 
  colPiscicultura, 
  colSampleOrigin, 
  tipoFreshWater,
  colPPB 
} from '../../../../constants'

const getBoxPlotData = (datos, nombre) => {
  if (datos.length === 0) {
    return {
      nombre,
      promedio: 0,
      iqr: 0,
      max: 0,
      min: 0,
    }
  }
  const values = datos.map(obj => obj[colPPB] / 1000)
  return {
    nombre,
    promedio: Math.round(mean(values)),
    iqr: iqr(values),
    max: Math.max(...values),
    min: Math.min(...values),
  }
}

const ComparacionConcentracion = () => {

  const { 
    divisionTemporal,
    datosFiltradosPeces,
    datosFiltradosIndustriaPeces,
    fechaFinal
  } = useSelector(state => state.reporte)

  const inicio = 'Abril \'21', fin = 'Mayo \'21'
  const periodo = `últimos 5${divisionTemporalALetra(divisionTemporal)}`

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
  console.log(datosPorPiscicultura)
  const datos = [
    getBoxPlotData(datosIndustria, 'Industria'),
    getBoxPlotData(datosEmpresa, 'Empresa'),
    ...Object.keys(datosPorPiscicultura).map(pisc => getBoxPlotData(datosPorPiscicultura[pisc], pisc))

  ]

  const xMax = datos.reduce((max, d) => {
    return d.max > max ? (5 * Math.floor((d.max + 5) / 5)) : max
  }, 0)
  const separaciones = xMax / 5

  return (
    <div className="ComparacionConcentracion">
      <p className="ComparacionConcentracion__titulo">
        Comparación concentración (ppb) 
        en músculo
      </p>
      <div className="ComparacionConcentracion__contenedor_grafico">
        {[...datos, { nombre: '' }].map((d, i) => (
          <div key={`categoria-cc-${i}`} className="ComparacionConcentracion__categoria">
            <div className="ComparacionConcentracion__etiqueta_categoria">{d.nombre}</div>
            {d.nombre &&
              <div
                className="ComparacionConcentracion__contenedor_caja"
                style={{
                  left: `calc(5.5rem + ${100 * d.min / xMax}%)`,
                  right: `calc(.5rem + ${100 * (xMax- d.max) / xMax}%)`,
                }}
              >
                <div
                  className="ComparacionConcentracion__bigote_inferior"
                  style={{ width: `${100 * (d.promedio - d.iqr / 2 - d.min) / xMax}%` }}
                />
                <div
                  className="ComparacionConcentracion__caja"
                >
                  {d.promedio}M
                </div>
                <div
                  className="ComparacionConcentracion__bigote_superior"
                  style={{ width: `${100 * (d.max - d.iqr / 2 - d.promedio) / xMax}%` }}
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
              {i % 2 > 0 ? '' : (i * xMax / separaciones)}
            </div>
          ))}
        </div>
      </div>
      <div className="ComparacionConcentracion__eje">
        <p>Miles </p>
      </div>
      {/* <div className="ComparacionConcentracion__bajada">
        <p>Promedio {periodo}</p>
      </div> */}
    </div>
  )
}

export default ComparacionConcentracion