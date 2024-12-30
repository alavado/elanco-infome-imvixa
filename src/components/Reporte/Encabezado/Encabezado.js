import React from 'react'
import './Encabezado.css'
import logoImvixa from '../../../assets/images/logo-imvixa.svg'
import logoSlice from '../../../assets/images/Logo Slice.svg'
import logoElanco from '../../../assets/images/MDS.svg'
import tituloReporte1Imvixa from '../../../assets/images/spanish/2. REPORTE DE CONCENTRACIÓN EN ALIMENTO IMVIXA/2. Reporte de Concentración en Alimento_IMVIXA.svg'
import tituloReporte1Slice from '../../../assets/images/spanish/2.5 REPORTE CONCENTRACIÓN EN ALIMENTO SLICE/2.5.Reporte de Concentración en Alimento SLICE.svg'
import tituloReporte2Imvixa from '../../../assets/images/spanish/3. REPORTE DE CONCENTRACIÓN EN MÚSCULO Y PIEL IMVIXA/3. Reporte de concentración en Músculo y Piel_IMVIXA.svg'
import tituloReporte2Slice from '../../../assets/images/Reporte de Concentración en Músculo Piel.svg'
import tituloReporte3Imvixa from '../../../assets/images/spanish/4. REPORTE SEGUIMIENTO CENTROS DE MAR IMVIXA/4.Reporte de Seguimiento en Centro de Mar_IMVIXA.svg'
import tituloReporte3Slice from '../../../assets/images/spanish/4.5 REPORTE SEGUIMIENTO CENTROS DE MAR SLICE/4.5 Reporte de Seguimiento en Centros de Mar SLICE.svg'
import tituloReporte4Imvixa from '../../../assets/images/spanish/1. REPORTE DE SEGUIMIENTO/1. Reporte de Seguimiento.svg'
import tituloReporte4Slice from '../../../assets/images/spanish/1. REPORTE DE SEGUIMIENTO/1. Reporte de Seguimiento.svg'
import titleReporte1Imvixa from '../../../assets/images/english/2. IN-FEED CONCENTRATION REPORT IMVIXA/2. In-Feed Concentration Report_IMVIXA.svg'
import titleReporte1Slice from '../../../assets/images/english/2.5 IN-FEED CONCENTRATION REPORT SLICE/2.5 In-Feed Concentration Report_SLICE.svg'
import titleReporte2Imvixa from '../../../assets/images/english/3. MUSCLE SKIN CONCENTRATION REPORT IMVIXA/3. Muscle Skin Concentration Report_IMVIXA.svg'
import titleReporte2Slice from '../../../assets/images/english/3. MUSCLE SKIN CONCENTRATION REPORT IMVIXA/3. Muscle Skin Concentration Report_IMVIXA.svg'
import titleReporte3Imvixa from '../../../assets/images/english/4. MARINE SITE FOLLOW-UP REPORT IMVIXA/4.Marine Site Follow Up Report_IMVIXA.svg'
import titleReporte3Slice from '../../../assets/images/english/4.5 MARINE SITE FOLLOW-UP REPORT SLICE/4.5 Marine Site Follow Up Report_SLICE.svg'
import titleReporte4Imvixa from '../../../assets/images/english/1 . FOLLOW-UP REPORT/1. Follow Up Report.svg'
import titleReporte4Slice from '../../../assets/images/english/1 . FOLLOW-UP REPORT/1. Follow Up Report.svg'

const Encabezado = ({ reporteID, reporteNombre, language, product }) => {
	let titulo, imgClassName, title;
		switch (reporteID) {
			case 1:
				if (product?.titulo === 'Imvixa') {
					titulo = language === 'es' ? tituloReporte1Imvixa : titleReporte1Imvixa
					imgClassName = "Reporte__logo_imagen_alimento"
				} else {
					titulo = language === 'es' ? tituloReporte1Slice : titleReporte1Slice
					imgClassName = "Reporte__logo_imagen_alimento_slice"
				}
				title = 'IN-FEED CONCENTRATION REPORT'
				break;
			case 2:
				if (product?.titulo === 'Imvixa') {
					titulo = language === 'es' ? tituloReporte2Imvixa : titleReporte2Imvixa
					imgClassName = "Reporte__logo_imagen_musculo"
				} else {
					titulo = language === 'es' ? tituloReporte2Slice : titleReporte2Slice
					imgClassName = "Reporte__logo_imagen_musculo_slice"
				}
				title = 'MUSCLE/SKIN CONCENTRATION REPORT'
				break;
			case 3:
				if (product?.titulo === 'Imvixa') {
					titulo = language === 'es' ? tituloReporte3Imvixa : titleReporte3Imvixa
					imgClassName = "Reporte__logo_imagen_marino"
				} else {
					titulo = language === 'es' ? tituloReporte3Slice : titleReporte3Slice
					imgClassName = "Reporte__logo_imagen_marino_slice"
				}
				title = 'MARINE SITE FOLLOW-UP REPORT'
				break;
			default:
				if (product?.titulo === 'Imvixa') {
					titulo = language === 'es' ? tituloReporte4Imvixa : titleReporte4Imvixa
					imgClassName = language === 'es' ? "Reporte__logo_imagen_seguimiento" : "Reporte__logo_imagen_seguimiento_en"
				} else {
					titulo = language === 'es' ? tituloReporte4Slice : titleReporte4Slice
					imgClassName = "Reporte__logo_imagen_seguimiento_slice"
				}
				title = 'FOLLOW-UP REPORT IMVIXA'
				break;
		}
	return (
		<div className='Encabezado'>
			{(product?.titulo === 'Imvixa') && <img src={logoImvixa} className="Reporte__logo_imvixa" alt="Logo Imvixa"/>} 
			{product?.titulo === 'Slice' && <img src={logoSlice} className="Reporte__logo_slice" alt="Logo Slice"/>}
			<img src={titulo} className={imgClassName} alt={reporteNombre} />
			<img src={logoElanco} className="Reporte__logo_elanco" alt="Logo MDS" />
		</div>
	)
}

export default Encabezado