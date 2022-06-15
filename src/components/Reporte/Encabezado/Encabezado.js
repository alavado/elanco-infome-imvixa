import React from 'react'
import './Encabezado.css'
import logoImvixa from '../../../assets/images/logo-imvixa.svg'
import logoElanco from '../../../assets/images/logo-elanco.svg'
import tituloReporte1 from '../../../assets/images/REPORTE_Concentracion en Alimento IMVIXA.png'
import tituloReporte2 from '../../../assets/images/REPORTE_Concentracion en Musculo Piel IMVIXA.png'
import tituloReporte3 from '../../../assets/images/REPORTE_seguimiento por Centro de Mar IMVIXA.png'
import tituloReporte4 from '../../../assets/images/REPORTE_seguimiento IMVIXA.png'
import { useSelector } from 'react-redux'

const Encabezado = () => {
  const { reporte } = useSelector((state) => state.parametrosGenerales);
	let titulo;
	switch (reporte.id) {
		case 1:
			titulo = tituloReporte1
			break;
		case 2:
			titulo = tituloReporte2
			break;
		case 3:
			titulo = tituloReporte3
			break;
		default:
			titulo = tituloReporte4
			break;
	}

	return (
		<div className='Encabezado'>
			<img src={logoImvixa} className="Reporte__logo_imvixa" alt="Logo Imvixa" />
			<div className='Encabezado__titulo'>
			<img src={titulo} className="" alt={reporte.titulo} />
			</div>
			<img src={logoElanco} className="Reporte__logo_elanco" alt="Logo Elanco" />
		</div>
	)
}

export default Encabezado