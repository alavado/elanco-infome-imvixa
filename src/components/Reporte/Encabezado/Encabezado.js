import React from 'react'
import './Encabezado.css'
import logoImvixa from '../../../assets/images/logo-imvixa.svg'
import logoElanco from '../../../assets/images/logo-elanco.svg'
import tituloReporte1 from '../../../assets/images/Reporte Concentración en Alimento.svg'
import tituloReporte2 from '../../../assets/images/Reporte de Concentración en Músculo Piel.svg'
import tituloReporte3 from '../../../assets/images/Reporte Seguimiento por Centro de Mar.svg'
import tituloReporte4 from '../../../assets/images/Reporte de Seguimiento.svg'

const Encabezado = ({ reporteID, reporteNombre, language }) => {
	let titulo, imgClassName, title;
		switch (reporteID) {
			case 1:
				titulo = tituloReporte1
				imgClassName = "Reporte__logo_imagen_alimento"
				title = 'IN-FEED CONCENTRATION REPORT'
				break;
			case 2:
				titulo = tituloReporte2
				imgClassName = "Reporte__logo_imagen_musculo"
				title = 'MUSCLE/SKIN CONCENTRATION REPORT'
				break;
			case 3:
				titulo = tituloReporte3
				imgClassName = "Reporte__logo_imagen_alimento"
				title = 'MARINE SITE FOLLOW-UP REPORT'
				break;
			default:
				titulo = tituloReporte4
				imgClassName = "Reporte__logo_imagen_seguimiento"
				title = 'FOLLOW-UP REPORT'
				break;
		}
	if (language === 'es') {
		return (
			<div className='Encabezado'>
				<img src={logoImvixa} className="Reporte__logo_imvixa" alt="Logo Imvixa" />
				<img src={titulo} className={imgClassName} alt={reporteNombre} style={{paddingLeft:'0.25rem'}}/>
				<img src={logoElanco} className="Reporte__logo_elanco" alt="Logo Elanco" />
			</div>
		)
	}
	return (
		<div className='Encabezado'>
			<img src={logoImvixa} className="Reporte__logo_imvixa" alt="Logo Imvixa" />
			<h1 className={imgClassName} alt={title} style={{paddingLeft:'0rem'}}>{title} </h1>
			<img src={logoElanco} className="Reporte__logo_elanco" alt="Logo Elanco" />
		</div>
	)
}

export default Encabezado