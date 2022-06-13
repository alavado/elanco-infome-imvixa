import React from 'react'
import { useSelector } from 'react-redux'
import { colConcentracionObjetivo, colInformeAlimento, colLoteAlimento, colPlanta, colRecetaAlimento } from '../../../constants'
import './TablaResumenAlimento.css'

const TablaResumenAlimento = () => {

	const { 
    fecha,
    piscicultura,
    datosLotes,
    datosFiltradosAlimento
  } = useSelector(state => state.reporteAlimento)

  const datos = datosLotes[0];
	const filas = [
    [
      'ID. Reporte laboratorio', 
      datos[colInformeAlimento]
    ],
		[
      'Piscicultura', 
      piscicultura.value
    ],
		[
      'Planta de alimento', 
      datos[colPlanta]
    ],
		[
      'Fecha de elaboración', 
      fecha.value
    ],
		[
      'Receta', 
      datos[colRecetaAlimento]
    ],
		[
      'Lote de alimento', 
      datos[colLoteAlimento]
    ],
		[
      'Concentración objetivo PMV (ppm)', 
      datos[colConcentracionObjetivo]
    ],
  ]
	return (
		<div className="TablaResumen">
		<h4 className="TablaResumen__titulo">
			Reporte de concentración en alimento
		</h4>
		<div className="TablaResumenAlimento__tabla">
			{filas.map((fila, i) => (
				<div
					key={`fila-resumen-${i}`}
					className="TablaResumenAlimento__fila"
				>
					<div>{fila[0]}:</div>
					<div>{fila[1]}</div>
				</div>
			))}
		</div>
	</div>
	)
}

export default TablaResumenAlimento