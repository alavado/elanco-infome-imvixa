import React from 'react'
import './Encabezado.css'
import logoImvixa from '../../../assets/images/logo-imvixa.svg'
import logoElanco from '../../../assets/images/logo-elanco.svg'
import tituloReporte1 from '../../../assets/images/Reporte Concentración en Alimento.svg'
import tituloReporte2 from '../../../assets/images/Reporte de Concentración en Músculo Piel.svg'
import tituloReporte3 from '../../../assets/images/Reporte Seguimiento por Centro de Mar.svg'
import tituloReporte4 from '../../../assets/images/Reporte de Seguimiento.svg'
import { useSelector } from 'react-redux'

const Encabezado = () => {
  const { reporte } = useSelector((state) => state.parametrosGenerales);
	let titulo, imgClassName;
	switch (reporte.id) {
		case 1:
			titulo = tituloReporte1
			imgClassName = "Reporte__logo_imagen_alimento"
			break;
		case 2:
			titulo = tituloReporte2
			imgClassName = "Reporte__logo_imagen_musculo"
			break;
		case 3:
			titulo = tituloReporte3
			imgClassName = "Reporte__logo_imagen_alimento"
			break;
		default:
			titulo = tituloReporte4
			imgClassName = "Reporte__logo_imagen_seguimiento"
			break;
	}

	return (
		<div className='Encabezado'>
			<img src={logoImvixa} className="Reporte__logo_imvixa" alt="Logo Imvixa" />
			<img src={titulo} className={imgClassName} alt={reporte.titulo} />
			<img src={logoElanco} className="Reporte__logo_elanco" alt="Logo Elanco" />
		</div>
	)
}

export default Encabezado