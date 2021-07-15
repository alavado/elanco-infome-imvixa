import './Tratamientos.css'
import { extraerUltimosPeriodos, groupBy, mean, divisionTemporalALetra } from '../../utilitiesReporte'
import { 
  colFechaEficacia, 
  colCentroEficacia, 
  colEficaciaEficacia, 
  colHexaEficacia,
} from '../../../../constants'
import { useSelector } from 'react-redux'
export const TRATAMIENTOS_IMVIXA = 'Imvixa'
export const TRATAMIENTOS_HEXAFLUMURON = 'Hexaflumurón'

const getEficacia = (datos, decimales) => {
  const promedioEficacia = mean(datos.map(obj => obj[colEficaciaEficacia])) * Math.pow(10, decimales)
  return Math.round(promedioEficacia) / Math.pow(10, decimales)
}

const getDiferenciaMeses = (fechaFinal, fechaInicial) => {
  const diffTime = Math.abs(fechaFinal - new Date(fechaInicial))
  if (diffTime < 0) return 0
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.5)); 
  return Math.round(diffDays * 100) / 100 
}

const getEficaciaSegunFecha = (datos, fechaFinal, decimales) => {
  const promedioEficacia = mean(datos.map(getDiferenciaMeses(fechaFinal, datos[colFechaEficacia])))
  return Math.round(promedioEficacia * Math.pow(10, decimales)) / Math.pow(10, decimales)
}

const Tratamientos = () => {

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
      3).filter(obj => obj[colHexaEficacia] !== 'Si' && obj[colEficaciaEficacia])

  const promedioIndustria = `${getEficacia(datosIndustria, 1)} meses`

  // filtro los datos empresa los que no han usado alfaflux
  const datosImvixaEmpresa = datosEmpresa.filter(obj => obj[colHexaEficacia] !== 'Si')
  // Para calcular el promedio filtro los datos que tienen reportada eficacia
  const promedioEmpresa = getEficacia(datosImvixaEmpresa.filter(obj => obj[colEficaciaEficacia]), 1)
  
  // Agrupo los datos por centro de mar
  const datosConHex = groupBy(datosEmpresa.filter(obj => obj[colHexaEficacia] === 'Si'), colCentroEficacia)
  const datosSinHex = groupBy(datosImvixaEmpresa.filter(obj => obj[colEficaciaEficacia]), colCentroEficacia)
  const datosSinEficacia = groupBy(datosImvixaEmpresa.filter(obj => !obj[colEficaciaEficacia]), colCentroEficacia)
  console.log({datosSinEficacia})
  console.log({datosSinHex})
  console.log({datosConHex})
  const datos = [
    ...Object.keys(datosSinHex).map(nombre => {
      return {
        nombre,
        valor: getEficacia(datosSinHex[nombre], 2),
        tratamiento: TRATAMIENTOS_IMVIXA
      }
    }),
    ...Object.keys(datosConHex).map(nombre => {
      return {
        nombre,
        valor: getEficacia(datosConHex[nombre], 2),
        tratamiento: TRATAMIENTOS_HEXAFLUMURON
      }
    }),
    ...Object.keys(datosSinEficacia).map(nombre => {
      return {
        nombre,
        valor: getEficaciaSegunFecha(datosSinEficacia[nombre], fechaFinal, 2),
      }
    }),
  ]

  if (datos.length === 0) {
    return (
    <div className="Tratamientos">
      <div className="Tratamientos__titulo">
        Meses hasta primer Baño
      </div>
      <div className="Tratamientos__contenedor_grafico">
        <div className="GraficoPecesTratados__contenedor_grafico_error">
          Sin datos de eficacia disponibles en los últimos 18 meses
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
        Meses hasta primer Baño
      </div>
      <div className="Tratamientos__subtitulo">El gráfico muestra la eficacia de Imvixa hasta el primer baño en centros que fueron tratados solo con Imvixa, con Imvixa y otro producto antes del término de la eficacia de Imvixa, y centros que aún no han tenido baños.</div>
      <div className="Tratamientos__contenedor_grafico">
        <div className="Tratamientos__promedios">
          <p>Promedio Industria: {promedioIndustria}</p>
          {promedioEmpresa ? <p>Promedio Empresa: {promedioEmpresa} meses</p> : null }
          <p cuadradito="imvixa">IMVIXA</p>
          <p cuadradito="hexa">IMVIXA + otro</p>
          <p cuadradito="sb">Sin baño</p>
        </div>
        <div className="Tratamientos__lineas_grafico">
          {Array(yMaximo + 1).fill(0).map((_, i) => (
            <div valor={yMaximo - i} key={`linea-grafico-tratamientos-${i}`} className="Tratamientos__linea_grafico" />
          ))}
        </div>
        <div className="Tratamientos__barras_grafico">
          {datosImvixa.map((d, i) => (
            <div
              key={`barra-tratamientos-${i}`}
              style={{ height: `${100 * d.valor / yMaximo}%` }}
              className="Tratamientos__barra Tratamientos__barra--imvixa"
            >
              <div className="Tratamientos__valor_barra">{d.valor}</div>
              <div className="Tratamientos__etiqueta_barra">{d.nombre}</div>
            </div>
          ))}
          <div className="Tratamientos__separador_grupo_barras" />
          {datosHexa.map((d, i) => (
            <div
              key={`separador-tratamientos-${i}`}
              style={{ height: `${100 * d.valor / yMaximo}%` }}
              className="Tratamientos__barra Tratamientos__barra--hexa"
            >
              <div className="Tratamientos__valor_barra">{d.valor}</div>
              <div className="Tratamientos__etiqueta_barra">{d.nombre}</div>
            </div>
          ))}
          <div className="Tratamientos__separador_grupo_barras" />
          {datosNada.map(d => (
            <div
              style={{ height: `${100 * d.valor / yMaximo}%` }}
              className="Tratamientos__barra Tratamientos__barra--nada"
            >
              <div className="Tratamientos__valor_barra">{d.valor}</div>
              <div className="Tratamientos__etiqueta_barra">{d.nombre}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tratamientos