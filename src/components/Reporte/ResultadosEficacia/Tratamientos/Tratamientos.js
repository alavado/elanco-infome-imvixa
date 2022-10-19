import './Tratamientos.css'
import { extraerUltimosPeriodos, groupBy, mean } from '../../utilitiesReporte'
import { 
  colFechaEficacia, 
  colCentroEficacia, 
  colEficaciaEficacia, 
  colHexaEficacia,
} from '../../../../constants'
import { useSelector } from 'react-redux'
import { generalTexts } from '../../generalTexts'
export const TRATAMIENTOS_IMVIXA = 'Imvixa'
export const TRATAMIENTOS_HEXAFLUMURON = 'Hexaflumurón'

const getEficacia = (datos, decimales) => {
  if (datos.every(obj => obj[colEficaciaEficacia])) {
    const promedioEficacia = mean(datos.map(obj => obj[colEficaciaEficacia])) * Math.pow(10, decimales)
    return Math.round(promedioEficacia) / Math.pow(10, decimales) 
  }
  else {
    return 0
  }
}

const getDiferenciaMeses = (fechaFinal, fechaInicial) => {
  const diffTime = Math.abs(fechaFinal - new Date(fechaInicial))
  if (diffTime < 0) return 0
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.4)); 
  return Math.round(diffDays * 100) / 100 
}

const getEficaciaSegunFecha = (datos, fechaFinal, decimales) => {
  const promedioEficacia = mean(datos.map(e => getDiferenciaMeses(fechaFinal, e[colFechaEficacia])))
  return Math.round(promedioEficacia * Math.pow(10, decimales)) / Math.pow(10, decimales)
}

const Tratamientos = ({language}) => {
  const {cuadradito2, sb, titulo, sindatos, sd, meses, prind, premp, nota} = generalTexts.gt_Tratamiento[language]

  const {
    datosFiltradosEficacia,
    datosFiltradosIndustriaEficacia,
    fechaFinal
  } = useSelector((state) => state.reporte)

  // ultimos 18 meses (3 semestres)
  const datosEmpresa = extraerUltimosPeriodos(
    'semestral', 
    datosFiltradosEficacia, 
    colFechaEficacia, 
    fechaFinal,
    3)
  // ultimos 18 meses (3 semestres) 
  // y filtro los que no han usado alfaflux y los que ya han reportado eficacia
  const datosIndustria = extraerUltimosPeriodos(
      'semestral', 
      datosFiltradosIndustriaEficacia, 
      colFechaEficacia, 
      fechaFinal,
      3).filter(obj => !obj[colHexaEficacia] && obj[colEficaciaEficacia])

  const promedioIndustria = getEficacia(datosIndustria, 1)

  // filtro los datos empresa los que no han usado alfaflux
  const datosImvixaEmpresa = datosEmpresa.filter(obj => !obj[colHexaEficacia])
  // Para calcular el promedio filtro los datos que tienen reportada eficacia
  const promedioEmpresa = getEficacia(datosImvixaEmpresa.filter(obj => obj[colEficaciaEficacia]), 1)
  
  // Agrupo los datos por centro de mar
  const datosConHex = groupBy(datosEmpresa.filter(obj => obj[colHexaEficacia]), colCentroEficacia)
  const datosSinHex = groupBy(datosImvixaEmpresa.filter(obj => obj[colEficaciaEficacia]), colCentroEficacia)
  const datosSinEficacia = groupBy(datosImvixaEmpresa.filter(obj => !obj[colEficaciaEficacia]), colCentroEficacia)
  const datos = [
    ...Object.keys(datosSinHex).map(nombre => {
      return {
        nombre,
        valor: getEficacia(datosSinHex[nombre], 1),
        tratamiento: TRATAMIENTOS_IMVIXA
      }
    }).sort((a, b) => a.nombre.localeCompare(b.nombre)),
    ...Object.keys(datosConHex).map(nombre => {
      return {
        nombre,
        valor: getEficacia(datosConHex[nombre], 1),
        tratamiento: TRATAMIENTOS_HEXAFLUMURON
      }
    }).sort((a, b) => a.nombre.localeCompare(b.nombre)),
    ...Object.keys(datosSinEficacia).map(nombre => {
      return {
        nombre,
        valor: getEficaciaSegunFecha(datosSinEficacia[nombre], fechaFinal, 1),
      }
    }).sort((a, b) => a.nombre.localeCompare(b.nombre)) ,
  ]

  if (datos.length === 0) {
    return (
    <div className="Tratamientos">
      <div className="Tratamientos__titulo">
        {titulo}
      </div>
      <div className="Tratamientos__contenedor_grafico">
        <div className="GraficoPecesTratados__contenedor_grafico_error">
          {sindatos}
        </div>
      </div>
    </div>
    )
  }

  const yMaximo = Math.ceil(Math.max(...datos.map(d => d.valor)) + 2)
  const datosImvixa = datos.filter(d => d.tratamiento === TRATAMIENTOS_IMVIXA)
  const datosHexa = datos.filter(d => d.tratamiento === TRATAMIENTOS_HEXAFLUMURON)
  const datosNada = datos.filter(d => [TRATAMIENTOS_HEXAFLUMURON, TRATAMIENTOS_IMVIXA].indexOf(d.tratamiento) < 0)

  return (
    <div className="Tratamientos">
      <div className="Tratamientos__titulo">
        {titulo}
      </div>
      <div className="Tratamientos__subtitulo">
        {promedioIndustria ? <p><span className="Tratamientos__label_promedio">{prind}</span>: {promedioIndustria.toLocaleString(language === 'es' ? 'de-DE' : 'en')} {meses}</p> : null }
        {promedioEmpresa ? <p><span className="Tratamientos__label_promedio">{premp}</span>: {promedioEmpresa.toLocaleString(language === 'es' ? 'de-DE' : 'en')} {meses}</p> : null }
      </div>
      <div className="Tratamientos__contenedor_grafico">
        <div className="Tratamientos__leyenda">
          <p cuadradito="imvixa">IMVIXA</p>
          <p cuadradito="hexa">{cuadradito2}</p>
          <p cuadradito="sb">{sb}</p>
        </div>
        <div className="Tratamientos__lineas_grafico">
          {Array(yMaximo + 1).fill(0).map((_, i) => (
            <div valor={yMaximo - i} key={`linea-grafico-tratamientos-${i}`} className="Tratamientos__linea_grafico" />
          ))}
        </div>
        <div className="Tratamientos__barras_grafico">
          {datosImvixa.map((d, i) => {
            if (d.valor === 0) {
              return (
                <div
                  key={`barra-tratamientos-${i}`}
                  className="Tratamientos__barra Tratamientos__barra--imvixa"
                >
                  <div className="Tratamientos__barra__si">{sd}</div>
                  <div className="Tratamientos__etiqueta_barra">{d.nombre}</div>
                </div>
              )
            }
            return (
            <div
              key={`barra-tratamientos-${i}`}
              style={{ height: `${100 * d.valor / yMaximo}%` }}
              className="Tratamientos__barra Tratamientos__barra--imvixa"
            >
              <div className="Tratamientos__valor_barra">{d.valor.toLocaleString(language === 'es' ? 'de-DE' : 'en')}</div>
              <div className="Tratamientos__etiqueta_barra">{d.nombre}</div>
            </div>
          )})}
          <div className="Tratamientos__separador_grupo_barras" />
          {datosHexa.map((d, i) => {
            if (d.valor === 0) {
              return (
                <div
                  key={`separador-tratamientos-${i}`}
                  className="Tratamientos__barra Tratamientos__barra--hexa"
                >
                  <div className="Tratamientos__barra__si">{sd}</div>
                  <div className="Tratamientos__etiqueta_barra">{d.nombre}</div>  
                </div>
              )
            }
            return (
            <div
              key={`separador-tratamientos-${i}`}
              style={{ height: `${100 * d.valor / yMaximo}%` }}
              className="Tratamientos__barra Tratamientos__barra--hexa"
            >
              <div className="Tratamientos__valor_barra">{d.valor.toLocaleString(language === 'es' ? 'de-DE' : 'en')}</div>
              <div className="Tratamientos__etiqueta_barra">{d.nombre}</div>
            </div>
          )})}
          <div className="Tratamientos__separador_grupo_barras" />
          {datosNada.map((d, i) => {
            if (d.valor === 0) {
              return (
                <div
                  key={`separador-tratamientos-nada-${i}`}
                  className="Tratamientos__barra Tratamientos__barra--nada"
                >
                  <div className="Tratamientos__barra__si">{sd}</div>
                  <div className="Tratamientos__etiqueta_barra">{d.nombre}</div>  
                </div>
              )
            }
            return (
            <div
              key={`separador-tratamientos-nada-${i}`}
              style={{ height: `${100 * d.valor / yMaximo}%` }}
              className="Tratamientos__barra Tratamientos__barra--nada"
            >
              <div className="Tratamientos__valor_barra">{d.valor.toLocaleString(language === 'es' ? 'de-DE' : 'en')}</div>
              <div className="Tratamientos__etiqueta_barra">{d.nombre}</div>
            </div>
          )})}
        </div>
      </div>
      <p className="Tratamientos__nota">{nota}</p>
    </div>
  )
}

export default Tratamientos