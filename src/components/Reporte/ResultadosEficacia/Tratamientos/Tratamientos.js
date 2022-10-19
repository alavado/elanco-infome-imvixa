import './Tratamientos.css'
import { useSelector } from 'react-redux'
import { generalTexts } from '../../generalTexts'
export const TRATAMIENTOS_IMVIXA = 'Imvixa'
export const TRATAMIENTOS_HEXAFLUMURON = 'Hexaflumurón'

const Tratamientos = ({language}) => {
  const {cuadradito2, sb, titulo, sindatos, sd, meses, prind, premp, nota} = generalTexts.gt_Tratamiento[language]
  const languageLocale = generalTexts.languageLocale[language]

  const {
    datosTratamientos
  } = useSelector((state) => state.reporte)

  const {
    datosTratamientos: datos,
    promedioIndustria,
    promedioEmpresa
  } = datosTratamientos

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
              <div className="Tratamientos__valor_barra">{d.valor.toLocaleString(languageLocale)}</div>
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
              <div className="Tratamientos__valor_barra">{d.valor.toLocaleString(languageLocale)}</div>
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
              <div className="Tratamientos__valor_barra">{d.valor.toLocaleString(languageLocale)}</div>
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