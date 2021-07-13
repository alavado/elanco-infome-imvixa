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

const esAño = (fecha, año) => {
  if (fecha) return new Date(fecha).getFullYear() === año
  return false
}

const contarPMVSiEs = (tipo, row) => {
  if (row[colTipoPMV] === tipo) {
    return reemplazarNullPorCero(row[colNPecesPMV])
  }
  return 0
};

const TablaResumen = () => {

  const { 
    nombreEmpresa, 
    datosFiltradosAlimento,
    datosFiltradosPeces,
    datosFiltradosTratamiento
  } = useSelector(state => state.reporte)

  const esteAño = new Date().getFullYear()
  const añoPasado = esteAño - 1
  const años = [añoPasado, esteAño]
  // Separar datos por año
  const datosAñoPasado = {
    alimento: datosFiltradosAlimento.filter(obj => esAño(obj[colFechaAlimento], añoPasado)),
    peces: datosFiltradosPeces.filter(obj => esAño(obj[colFechaPeces], añoPasado)),
    pmv: datosFiltradosTratamiento.filter(obj => esAño(obj[colFechaPMV], añoPasado))
  }
  const datosAñoActual = {
    alimento: datosFiltradosAlimento.filter(obj => esAño(obj[colFechaAlimento], esteAño)),
    peces: datosFiltradosPeces.filter(obj => esAño(obj[colFechaPeces], esteAño)),
    pmv: datosFiltradosTratamiento.filter(obj => esAño(obj[colFechaPMV], esteAño))
  }
  // Calcular valores de cada fila
  const filas = [
    [
      'N° visita piscicultura', 
      datosAñoPasado.peces
      .filter(row => row[colSampleOrigin] === tipoFreshWater)
      .map(row => row[colFechaPeces].toLocaleDateString())
      .filter(onlyUnique)
      .length, 
      datosAñoActual.peces
      .filter(row => row[colSampleOrigin] === tipoFreshWater)
      .map(row => row[colFechaPeces].toLocaleDateString())
      .filter(onlyUnique)
      .length, 
    ],
    [
      'N° visita a centros de mar', 
      datosAñoPasado.peces
      .filter(row => row[colSampleOrigin] === tipoSeaWater)
      .map(row => row[colFechaPeces].toLocaleDateString())
      .filter(onlyUnique)
      .length, 
      datosAñoActual.peces
      .filter(row => row[colSampleOrigin] === tipoSeaWater)
      .map(row => row[colFechaPeces].toLocaleDateString())
      .filter(onlyUnique)
      .length, 
    ],
    [
      'N°peces analizados en piscicultura', 
      datosAñoPasado.peces
      .filter(row => row[colSampleOrigin] === tipoFreshWater)
      .length, 
      datosAñoActual.peces
      .filter(row => row[colSampleOrigin] === tipoFreshWater)
      .length
    ],
    [
      'N°peces analizados en centros de mar', 
      datosAñoPasado.peces
      .filter(row => row[colSampleOrigin] === tipoSeaWater)
      .length, 
      datosAñoActual.peces
      .filter(row => row[colSampleOrigin] === tipoSeaWater)
      .length
    ],
    [
      'N° muestras alimento analizadas', 
      datosAñoPasado.alimento.reduce((prev, curr) => curr[colNMuestrasAlimento] + prev, 0), 
      datosAñoActual.alimento.reduce((prev, curr) => curr[colNMuestrasAlimento] + prev, 0)
    ],
    [],
    [
      'N° peces tratados RAS', 
      datosAñoPasado.pmv.reduce((prev, curr) => Math.round(contarPMVSiEs(tipoRecPMV, curr)) + prev, 0), 
      datosAñoActual.pmv.reduce((prev, curr) => Math.round(contarPMVSiEs(tipoRecPMV, curr)) + prev, 0), 
    ]
    ,
    [
      'N° peces tratados - Flujo abierto', 
      datosAñoPasado.pmv.reduce((prev, curr) => Math.round(contarPMVSiEs(tipoFAPMV, curr)) + prev, 0), 
      datosAñoActual.pmv.reduce((prev, curr) => Math.round(contarPMVSiEs(tipoFAPMV, curr)) + prev, 0), 
    ],
    [
      'N° total de peces tratados', 
      datosAñoPasado.pmv.reduce((prev, curr) => Math.round(reemplazarNullPorCero(curr[colNPecesPMV])) + prev, 0), 
      datosAñoActual.pmv.reduce((prev, curr) => Math.round(reemplazarNullPorCero(curr[colNPecesPMV])) + prev, 0)
    ]
  ]

  return (
    <div className="TablaResumen">
      <h4 className="TablaResumen__titulo">
        Resumen {nombreEmpresa}
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