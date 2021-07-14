import './Tratamientos.css'
import { extraerUltimosPeriodos, groupBy, mean, divisionTemporalALetra } from '../../utilitiesReporte'
import { 
  colFechaEficacia, 
  colCentroEficacia, 
  colEficaciaEficacia, 
  colHexaEficacia,
  colFechaPeces,
  colCentroPeces
} from '../../../../constants'
import { useSelector } from 'react-redux'
export const TRATAMIENTOS_IMVIXA = 'Imvixa'
export const TRATAMIENTOS_HEXAFLUMURON = 'Hexaflumurón'

const getEficacia = (datos, decimales) => {
  return Math.round(mean(datos.map(obj => obj[colEficaciaEficacia])) * Math.pow(10, decimales)) / Math.pow(10, decimales)
}

const getEficaciaSegunFecha = (datos, centro, colFecha, fechaFinal) => {
  const diffTime = Math.abs(fechaFinal - new Date(datos[centro][colFecha]))
  if (diffTime < 0) return 0

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.5)); 
  return Math.round(diffDays * 100) / 100 
}

const Tratamientos = () => {

  const {
    datosFiltradosEficacia,
    datosFiltradosPeces,
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
  // ultimos 18 meses (3 semestres) y filtro los que no han usado alfaflux
  const datosIndustria = extraerUltimosPeriodos(
      'semestral', 
      datosFiltradosIndustriaEficacia, 
      colFechaEficacia, 
      fechaFinal,
      3).filter(obj => obj[colHexaEficacia] !== 'Si')

  const promedioIndustria = `${getEficacia(datosIndustria, 1)} meses`

  // filtro los datos empresa los que no han usado alfaflux para obtener el promedio
  const datosImvixaEmpresa = datosEmpresa.filter(obj => obj[colHexaEficacia] !== 'Si')
  const promedioEmpresa = `${getEficacia(datosImvixaEmpresa, 1)} meses`
  
  // Agrupo los datos por centro de mar
  const datosConHex = groupBy(datosEmpresa.filter(obj => obj[colHexaEficacia] === 'Si'), colCentroEficacia)
  const datosSinHex = groupBy(datosImvixaEmpresa, colCentroEficacia)
  
  // ultimos 2 años (4 semestres)
  const datosTratados = extraerUltimosPeriodos(
    'semestral', 
    datosFiltradosPeces, 
    colFechaPeces, 
    fechaFinal,
    4)
    
  let datosTratadosGrouped = groupBy(datosTratados, colCentroPeces)
  datosTratadosGrouped = {
    ...Object.keys(datosTratadosGrouped).reduce((prev, centro) => { return {
      ...prev,
      [centro] : datosTratadosGrouped[centro][0]
  }}, {})
  }
  const centrosSinTratamiento = Object.keys(datosTratadosGrouped).filter(centro => !(datosConHex[centro] || datosSinHex[centro]))
  console.log({datosTratadosGrouped})
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
    ...centrosSinTratamiento.map(nombre => {
      return {
        nombre,
        valor: getEficaciaSegunFecha(datosTratadosGrouped, nombre, colFechaPeces, fechaFinal)
      }
    })
    // {
    //   nombre: 'Pisc. 10',
    //   valor: 4.84
    // },
    // {
    //   nombre: 'Pisc. 11',
    //   valor: 1.78
    // },
    // {
    //   nombre: 'Pisc. 12',
    //   valor: .99
    // }
  ]

  const yMaximo = Math.ceil(Math.max(...datos.map(d => d.valor)) + 2)
  const datosImvixa = datos.filter(d => d.tratamiento === TRATAMIENTOS_IMVIXA)
  const datosHexa = datos.filter(d => d.tratamiento === TRATAMIENTOS_HEXAFLUMURON)
  const datosNada = datos.filter(d => [TRATAMIENTOS_HEXAFLUMURON, TRATAMIENTOS_IMVIXA].indexOf(d.tratamiento) < 0)

  return (
    <div className="Tratamientos">
      <div className="Tratamientos__titulo">
        Meses hasta primer Baño
      </div>
      <div className="Tratamientos__contenedor_grafico">
        <div className="Tratamientos__promedios">
          <p>Promedio Industria: {promedioIndustria}</p>
          <p>Promedio Empresa: {promedioEmpresa}</p>
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