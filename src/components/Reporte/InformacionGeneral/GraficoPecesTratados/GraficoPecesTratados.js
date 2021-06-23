import { useSelector } from 'react-redux'
import './GraficoPecesTratados.css'
import { dividirDatosSegun } from '../../utilitiesReporte'
import { colFechaPMV, colNPecesPMV } from '../../../../constants'

const GraficoPecesTratados = () => {
  const { 
    datosFiltradosPMV,
    divisionTemporal,
    fechaFinal
  } = useSelector(state => state.reporte)

  const datosDivididos = dividirDatosSegun(divisionTemporal, datosFiltradosPMV, colFechaPMV, fechaFinal)
  console.log(datosDivididos)
  // valor en millones
  const datos = datosDivididos.labels.map((nombre, index) => { return {
    nombre,
    valor: Math.round(datosDivididos.datos[index].reduce((prev, curr) => curr[colNPecesPMV] + prev, 0) / 100000) / 10
  }})

  // const datos = [
  //   {
  //     nombre: 'Q1 2020',
  //     valor: .8
  //   },
  //   {
  //     nombre: 'Q2 2020',
  //     valor: 1.2
  //   },
  //   {
  //     nombre: 'Q3 2020',
  //     valor: 1.8
  //   },
  //   {
  //     nombre: 'Q4 2020',
  //     valor: 1.4
  //   },
  //   {
  //     nombre: 'Q1 2021',
  //     valor: 1.7
  //   }
  // ]

  const yMax = Math.ceil(datos.reduce((max, v) => Math.max(max, v.valor), 0))
  const yLineas = [...Array(yMax * 2).fill(0).map((_, i) => i * .5), yMax].reverse()

  return (
    <div className="GraficoPecesTratados">
      <p className="GraficoPecesTratados__titulo">N° de peces tratados</p>
      <div className="GraficoPecesTratados__contenedor_grafico">
        <p className="GraficoPecesTratados__etiqueta_eje_y">
          Millones
        </p>
        <div className="GraficoPecesTratados__contenedor_lineas">
          {yLineas.map(y => (
            <div key={`lineay-${y}`} className="GraficoPecesTratados__linea">
              <p className="GraficoPecesTratados__etiqueta_linea">
                {y.toLocaleString('de-DE')}
              </p>
            </div>
          ))}
        </div>
        {datos.map(d => (
          <div key={`barra-${d.nombre}`} className="GraficoPecesTratados__contenedor_barra">
            <div
              className="GraficoPecesTratados__barra"
              style={{ '--porcentaje-lleno': `${(d.valor / yMax) * 100}%` }}
            >
              {d.valor.toLocaleString('de-DE', { minimumFractionDigits: 1 })}
            </div>
            <div className="GraficoPecesTratados__etiqueta_barra">
              {d.nombre}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GraficoPecesTratados