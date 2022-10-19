import { useSelector } from 'react-redux'
import './GraficoPesoPromedio.css'
import { generalTexts } from "../../generalTexts";


const GraficoPesoPromedio = ({ agrandar, language }) => {
  const {titulo, yaxis, sindatos} = generalTexts.gt_GraficoPesoPromedio[language]

  const { 
    datosGraficoPesoPromedio: datos
  } = useSelector(state => state.reporte)

  if (datos.length === 0) {
    return (
      <div className="GraficoPesoPromedio">
        <p className="GraficoPesoPromedio__titulo">
          {titulo}
        </p>
        <div className="GraficoPesoPromedio__contenedor_grafico">
          <div className="GraficoPesoPromedio__contenedor_grafico__error">
            {sindatos}
          </div>
        </div>
      </div>
    )
  } 

  const vMax = Math.max(...datos.filter(v => v.valor).map(d => d.valor))
  const vMin = Math.min(...datos.filter(v => v.valor).map(d => d.valor))
  const tick = Math.min(10, Math.pow(10, Math.floor(Math.log10(vMax))) / 10)
  const yMin = 0 * Math.floor(vMin / tick)
  const yMax = 10 * Math.ceil(vMax / tick)
  const totalLineas = Math.round(1 + (yMax - yMin) / tick)
  const yLineas = [
    ...Array(totalLineas)
    .fill(0).map((_, i) => yMin + tick * i)]
    .filter((_, i) => i % Math.floor(totalLineas / 10) === 0 || i === totalLineas - 1)
    .reverse()

  return (
    <div
      className="GraficoPesoPromedio"
      style={{ gridColumn: `span ${agrandar ? 2 : 1}` }}
    >
      <p className="GraficoPesoPromedio__titulo">
        {titulo}
      </p>
      <div className="GraficoPesoPromedio__contenedor_grafico">
        <p className="GraficoPesoPromedio__etiqueta_eje_y">
          {yaxis}
        </p>
        <div className="GraficoPesoPromedio__contenedor_lineas">
          {yLineas.map(y => (
            <div key={`lineay-${y}`} className="GraficoPesoPromedio__linea">
              <p className="GraficoPesoPromedio__etiqueta_linea">
                {y.toLocaleString('de-DE')}
              </p>
            </div>
          ))}
        </div>
        {datos.map(d => {
          if (d.valor && d.valor !== 0) {
            return (
              <div key={`barra-${d.nombre}`} className="GraficoPesoPromedio__contenedor_barra">
                <div
                  className="GraficoPesoPromedio__barra"
                  style={{ '--porcentaje-lleno': `${((d.valor - yMin) / (yMax - yMin)) * 100}%` }}
                >
                  {d.valor.toFixed(0).toLocaleString('de-DE')}
                </div>
                <div className="GraficoPesoPromedio__etiqueta_barra">
                  {d.nombre}
                </div>
              </div>
            )
          } else {
            return (
              <div key={`barra-${d.nombre}`} className="GraficoPesoPromedio__contenedor_barra">
                <div className="GraficoPesoPromedio__si">{sindatos}</div>
                <div className="GraficoPesoPromedio__etiqueta_barra">
                  {d.nombre}
                </div>
              </div>
            )
          }
          })}
      </div>
    </div>
  )
}

export default GraficoPesoPromedio