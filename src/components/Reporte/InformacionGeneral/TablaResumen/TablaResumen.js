import { useSelector } from 'react-redux'
import './TablaResumen.css'

const TablaResumen = () => {

  const { nombreEmpresa } = useSelector(state => state.reporte)
  const años = [2020, 2021]
  const filas = [
    ['N° visita piscicultura', 65, 22],
    ['N° visita a centros de mar', 15, 3],
    ['N° peces analizados', 1_600, 500],
    ['N° muestras alimento analizadas', 107, 33],
    [],
    ['N° peces tratados RAS', 1_000_000, 755_000],
    ['N° peces tratados - Flujo abierto', 2_500_000, 1_350_000],
    ['N° total de peces tratados', 3_500_000, 2_105_000]
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