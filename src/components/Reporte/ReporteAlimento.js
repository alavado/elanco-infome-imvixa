import React from 'react'
import { useSelector } from 'react-redux'
import Sandalias from './Sandalias'
import MensajeError from '../MensajeError'
import DatosEmpresa from './DatosEmpresa/DatosEmpresa'
import InformacionGeneral from './InformacionGeneral'
import Encabezado from './Encabezado/Encabezado'

const ReporteAlimento = ({titulo}) => {
  const { nombreEmpresa } = useSelector(state => state.reporteAlimento)

	return (
		<div className="Reporte">
      <div className="Reporte__contenedor">
        <div className="Reporte__pagina Reporte__pagina--1">
          <Encabezado titulo={titulo}/>
          <MensajeError>
            <DatosEmpresa
							nombreEmpresa={nombreEmpresa}/>
          </MensajeError>
          <Sandalias pagina={1} />
        </div>
      </div>
    </div>
	)
}

export default ReporteAlimento