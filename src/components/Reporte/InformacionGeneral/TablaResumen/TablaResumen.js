import { useSelector } from 'react-redux'
import './TablaResumen.css'

const esAño = (fecha, año) => {
  return new Date(fecha).getFullYear() === año;
};

const contarPMVSiEs = (tipo, row) => {
  if (row['Tipo de Piscicultura'] === tipo) {
    return row['n Peces tratados FW'];
  }
  return 0
};

const TablaResumen = () => {

  const { 
    nombreEmpresa, 
    datosFiltradosAlimento,
    datosFiltradosPeces,
    datosFiltradosPMV
  } = useSelector(state => state.reporte)
  const esteAño = new Date().getFullYear()
  const añoPasado = esteAño - 1
  const años = [añoPasado, esteAño]
  const datosAñoPasado = {
    alimento: datosFiltradosAlimento.filter(obj => esAño(obj['Fecha de Fabricación'], añoPasado)),
    peces: datosFiltradosPeces.filter(obj => esAño(obj['Sampling date'], añoPasado)),
    pmv: datosFiltradosPMV.filter(obj => esAño(obj['Fecha PMV/fab. Medicado'], añoPasado))
  }
  const datosAñoActual = {
    alimento: datosFiltradosAlimento.filter(obj => esAño(obj['Fecha de Fabricación'], esteAño)),
    peces: datosFiltradosPeces.filter(obj => esAño(obj['Sampling date'], esteAño)),
    pmv: datosFiltradosPMV.filter(obj => esAño(obj['Fecha PMV/fab. Medicado'], esteAño))
  }
  const filas = [
    ['N° visita piscicultura', 65, 22],
    ['N° visita a centros de mar', 15, 3],
    ['N° peces analizados', datosAñoPasado.peces.length, datosAñoActual.peces.length],
    [
      'N° muestras alimento analizadas', 
      datosAñoPasado.alimento.reduce((prev, curr) => curr['N° de Muestras'] + prev, 0), 
      datosAñoActual.alimento.reduce((prev, curr) => curr['N° de Muestras'] + prev, 0)
    ],
    [],
    [
      'N° peces tratados RAS', 
      datosAñoPasado.pmv.reduce((prev, curr) => contarPMVSiEs('Recirculación', curr) + prev, 0), 
      datosAñoActual.pmv.reduce((prev, curr) => contarPMVSiEs('Recirculación', curr) + prev, 0), 
    ]
    ,
    [
      'N° peces tratados - Flujo abierto', 
      datosAñoPasado.pmv.reduce((prev, curr) => contarPMVSiEs('Flujo Abierto', curr) + prev, 0), 
      datosAñoActual.pmv.reduce((prev, curr) => contarPMVSiEs('Flujo Abierto', curr) + prev, 0), 
    ],
    [
      'N° total de peces tratados', 
      datosAñoPasado.pmv.reduce((prev, curr) => curr['n Peces tratados FW'] + prev, 0), 
      datosAñoActual.pmv.reduce((prev, curr) => curr['n Peces tratados FW'] + prev, 0)
    ]
  ]

  return (
    <div className="TablaResumen">
      <h4 className="TablaResumen__titulo">
        Resumen
      </h4>
      <div className="TablaResumen__tabla">
        <div className="TablaResumen__nombre_empresa">
          <div />
          <div>{nombreEmpresa}</div>
        </div>
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