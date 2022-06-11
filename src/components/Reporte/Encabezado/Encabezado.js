import React from 'react'
import './Encabezado.css'
import logoImvixa from '../../../assets/images/logo-imvixa.svg'
import logoElanco from '../../../assets/images/logo-elanco.svg'

const Encabezado = ({titulo}) => {
	return (
		<div className='Encabezado'>
			<img src={logoImvixa} className="Reporte__logo_imvixa" alt="Logo Imvixa" />
			{titulo && <div className='Encabezado__titulo'>{titulo}</div>}
			<img src={logoElanco} className="Reporte__logo_elanco" alt="Logo Elanco" />
		</div>
	)
}

export default Encabezado