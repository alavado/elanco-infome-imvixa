import { useSelector } from 'react-redux'
import './GraficoPecesTratados.css'
import { dividirDatosSegun, reemplazarNullPorCero } from '../../utilitiesReporte'
import { colFechaPMV, colNPecesPMV } from '../../../../constants'


const GraficoPecesTratados = () => {
  const { 
    datosFiltradosTratamiento,
    divisionTemporal,
    fechaFinal
  } = useSelector(state => state.reporte)

  const datosDivididos = dividirDatosSegun(divisionTemporal, datosFiltradosTratamiento, colFechaPMV, fechaFinal)
  // valor en millones
  const datos = datosDivididos.labels.map((nombre, index) => { return {
    nombre,
    valor: Math.round(datosDivididos.datos[index].reduce((prev, curr) => reemplazarNullPorCero(curr[colNPecesPMV]) + prev, 0) / 100000) / 10
  }})

  if (datos.every(obj => obj.valor === 0)) {
    return (
      <div className="GraficoPecesTratados">
        <p className="GraficoPecesTratados__titulo">N° de peces tratados</p>
        <div className="GraficoPecesTratados__contenedor_grafico">
          <div className="GraficoPecesTratados__contenedor_grafico_error">
            Sin datos disponibles para el periodo seleccionado
          </div>
        </div>
      </div>
    )
  }

  const yMax = Math.max(Math.ceil(datos.reduce((max, v) => Math.max(max, v.valor), 0)), 1)
  const ticks =  yMax <= 5
    ? [...Array(yMax * 2).fill(0).map((_, i) => i * .5), yMax]
    : [...Array(yMax).fill(0).map((_, i) => i), yMax]
  const yLineas = ticks.reverse()

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
            {
            d.valor === 0

            ? <div className="GraficoPecesTratados__si">sin datos</div>
            : (
              <div
                className="GraficoPecesTratados__barra"
                style={{ '--porcentaje-lleno': `${(d.valor / yMax) * 100}%` }}
              >
                {d.valor.toLocaleString('de-DE', { minimumFractionDigits: 1 })}
              </div>
            )
            }

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