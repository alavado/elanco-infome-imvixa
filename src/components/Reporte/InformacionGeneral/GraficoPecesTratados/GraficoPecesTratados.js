import { useSelector } from 'react-redux'
import './GraficoPecesTratados.css'
import { generalTexts } from "../../generalTexts";

const GraficoPecesTratados = ({language}) => {
  const { 
    datosGraficoPecesTratados: datos
  } = useSelector(state => state.reporte)
  const languageLocale = generalTexts.languageLocale[language]
  const { titulo, yaxis, sindatos } = generalTexts.gt_GraficoPecesTratados[language]

  if (datos.every(obj => obj.valor === 0)) {
    return (
      <div className="GraficoPecesTratados">
        <p className="GraficoPecesTratados__titulo">{titulo}</p>
        <div className="GraficoPecesTratados__contenedor_grafico">
          <div className="GraficoPecesTratados__contenedor_grafico_error">
            {sindatos}
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
    <div
      className="GraficoPecesTratados"
      // style={{ gridColumn: `span ${agrandar ? 2 : 1}` }}
    >
      <p className="GraficoPecesTratados__titulo">{titulo}</p>
      <div className="GraficoPecesTratados__contenedor_grafico">
        <p className="GraficoPecesTratados__etiqueta_eje_y">
          {yaxis}
        </p>
        <div className="GraficoPecesTratados__contenedor_lineas">
          {yLineas.map(y => (
            <div key={`lineay-${y}`} className="GraficoPecesTratados__linea">
              <p className="GraficoPecesTratados__etiqueta_linea">
                {y.toLocaleString(languageLocale)}
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
                {d.valor.toLocaleString(languageLocale, { minimumFractionDigits: 1 })}
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