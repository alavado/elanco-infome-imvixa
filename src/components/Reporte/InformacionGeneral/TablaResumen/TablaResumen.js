import { useSelector } from 'react-redux'
import './TablaResumen.css'
import {
  colTipoPMV,
  colNPecesPMV,
  colFechaAlimento,
  colFechaPeces,
  colFechaPMV,
  colSampleOrigin,
  colNMuestrasAlimento,
  tipoFreshWater,
  tipoSeaWater,
  tipoFAPMV,
  tipoRecPMV
} from '../../../../constants'
import { onlyUnique } from "../../../../redux/ducks/utilities"
import { reemplazarNullPorCero } from '../../utilitiesReporte'
import { generalTexts } from "../../generalTexts";

const esAño = (fecha, año) => {
  if (fecha) return new Date(fecha).getFullYear() === año
  return false
}

const contarPMVSiEs = (tipo, row) => {
  if (row[colTipoPMV].includes(tipo)) {
    return reemplazarNullPorCero(row[colNPecesPMV])
  }
  return 0
};

const TablaResumen = ({language}) => {

  const { 
    nombreEmpresa, 
    datosFiltradosAlimento,
    datosFiltradosPeces,
    datosFiltradosPecesTratados,
    datosPecesTratados,
    fechaFinal
  } = useSelector(state => state.reporte)
  const esteAño = new Date(fechaFinal).getFullYear()
  const añoPasado = esteAño - 1
  const años = [añoPasado, esteAño]
  const {titulo, filas: filasLabels} = generalTexts.gt_TablaResumen[language]
  // Separar datos por año
  const datosAñoPasado = {
    alimento: datosFiltradosAlimento.filter(obj => esAño(obj[colFechaAlimento], añoPasado)),
    peces: datosFiltradosPeces.filter(obj => esAño(obj[colFechaPeces], añoPasado)),
    pmv: datosFiltradosPecesTratados.filter(obj => esAño(obj[colFechaPMV], añoPasado)),
    pmvSinFiltro: datosPecesTratados.filter(obj => esAño(obj[colFechaPMV], añoPasado)),
  }
  const datosAñoActual = {
    alimento: datosFiltradosAlimento.filter(obj => esAño(obj[colFechaAlimento], esteAño)),
    peces: datosFiltradosPeces.filter(obj => esAño(obj[colFechaPeces], esteAño)),
    pmv: datosFiltradosPecesTratados.filter(obj => esAño(obj[colFechaPMV], esteAño)),
    pmvSinFiltro: datosPecesTratados.filter(obj => esAño(obj[colFechaPMV], esteAño))
  }

  // Calcular valores de cada fila
  const filas = [
    [
      filasLabels[0], 
      datosAñoPasado.peces
      .filter(row => row[colSampleOrigin] === tipoFreshWater)
      .map(row => row[colFechaPeces].substring(0, 10))
      .filter(onlyUnique)
      .length, 
      datosAñoActual.peces
      .filter(row => row[colSampleOrigin] === tipoFreshWater)
      .map(row => row[colFechaPeces].substring(0, 10))
      .filter(onlyUnique)
      .length, 
    ],
    [
      filasLabels[1], 
      datosAñoPasado.peces
      .filter(row => row[colSampleOrigin] === tipoSeaWater)
      .map(row => row[colFechaPeces].substring(0, 10))
      .filter(onlyUnique)
      .length, 
      datosAñoActual.peces
      .filter(row => row[colSampleOrigin] === tipoSeaWater)
      .map(row => row[colFechaPeces].substring(0, 10))
      .filter(onlyUnique)
      .length, 
    ],
    [
      filasLabels[2], 
      datosAñoPasado.peces
      .filter(row => row[colSampleOrigin] === tipoFreshWater)
      .length, 
      datosAñoActual.peces
      .filter(row => row[colSampleOrigin] === tipoFreshWater)
      .length
    ],
    [
      filasLabels[3], 
      datosAñoPasado.peces
      .filter(row => row[colSampleOrigin] === tipoSeaWater)
      .length, 
      datosAñoActual.peces
      .filter(row => row[colSampleOrigin] === tipoSeaWater)
      .length
    ],
    [
      filasLabels[4], 
      datosAñoPasado.alimento.reduce((prev, curr) => curr[colNMuestrasAlimento] + prev, 0), 
      datosAñoActual.alimento.reduce((prev, curr) => curr[colNMuestrasAlimento] + prev, 0)
    ],
    [
      filasLabels[5], 
      datosAñoPasado.pmvSinFiltro.reduce((prev, curr) => Math.round(contarPMVSiEs(tipoRecPMV, curr)) + prev, 0), 
      datosAñoActual.pmvSinFiltro.reduce((prev, curr) => Math.round(contarPMVSiEs(tipoRecPMV, curr)) + prev, 0), 
    ]
    ,
    [
      filasLabels[6], 
      datosAñoPasado.pmvSinFiltro.reduce((prev, curr) => Math.round(contarPMVSiEs(tipoFAPMV, curr)) + prev, 0), 
      datosAñoActual.pmvSinFiltro.reduce((prev, curr) => Math.round(contarPMVSiEs(tipoFAPMV, curr)) + prev, 0), 
    ],
    [
      filasLabels[7], 
      datosAñoPasado.pmvSinFiltro.reduce((prev, curr) => Math.round(reemplazarNullPorCero(curr[colNPecesPMV])) + prev, 0), 
      datosAñoActual.pmvSinFiltro.reduce((prev, curr) => Math.round(reemplazarNullPorCero(curr[colNPecesPMV])) + prev, 0)
    ]
  ]

  return (
    <div className="TablaResumen">
      <h4 className="TablaResumen__titulo">
        {titulo} {nombreEmpresa}
      </h4>
      <div className="TablaResumen__tabla">
        <div className="TablaResumen__encabezados">
          <div />
          {años.map(año => <div key={`encabezado-año-${año}`}>{año}</div>)}
        </div>
        {filas.map((fila, i) => (
          <div
            key={`fila-resumen-${i}`}
            className="TablaResumen__fila"
          >
            <div>{fila[0]}</div>
            <div>{fila[1]?.toLocaleString('de-DE')}</div>
            <div>{fila[2]?.toLocaleString('de-DE')}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TablaResumen