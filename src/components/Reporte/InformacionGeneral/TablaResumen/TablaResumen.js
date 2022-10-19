import { useSelector } from 'react-redux'
import './TablaResumen.css'
import { generalTexts } from "../../generalTexts";

const TablaResumen = ({language}) => {
  const { 
    nombreEmpresa, 
    fechaFinal,
    filasTablaResumen
  } = useSelector(state => state.reporte)
  const esteAño = new Date(fechaFinal).getFullYear()
  const añoPasado = esteAño - 1
  const años = [añoPasado, esteAño]
  const languageLocale = generalTexts.languageLocale[language]
  const { titulo, filas: filasLabels } = generalTexts.gt_TablaResumen[language]
  const filas = filasTablaResumen.map((f, i) => [filasLabels[i], ...f])

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
            <div>{fila[1]?.toLocaleString(languageLocale)}</div>
            <div>{fila[2]?.toLocaleString(languageLocale)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TablaResumen