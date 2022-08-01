import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import {
  agregarComentarioCentro,
  eliminarComentarioCentro,
} from "../../../redux/ducks/comentarios";
import MensajeError from '../../MensajeError';
import Sandalias from '../Sandalias';
import Encabezado from '../Encabezado';
import DatosEmpresa from '../DatosEmpresa';
import CuadroResumen from './CuadroResumen';
import Comentarios from '../Comentarios';
import './ReporteCentro.css'
import TablaAntecedentes from './TablaAntecedentes';
import GraficoCumplimiento from '../ReporteMusculo/GraficoCumplimiento';
import GraficoComparacion from '../ReporteMusculo/GraficoComparacion';
const { ipcRenderer } = window.require("electron");

const ReporteCentro = () => {
	const { comentariosCentro } = useSelector((state) => state.comentarios);
  const { nombreEmpresa, centro } = useSelector((state) => state.reporteCentro);
  const numeroDePaginas = 2;
  const nEmpresa = nombreEmpresa.label;
	const encabezado = centro.label + ' - ' + nEmpresa;
	useEffect(() => {
    ipcRenderer.send("datosReporte", {
			nombreEmpresa: nEmpresa,
      numeroDePaginas,
    });
  }, [nEmpresa]);

	const dimensions = {
    width: "100%",
    height: `calc(${numeroDePaginas} * 132.86vw)`,
    maxHeight: `calc(${numeroDePaginas} * 132.86vw)`,
  };
  const percentage = Math.round((100 / numeroDePaginas) * 100000) / 100000;
  const dimensionsPage = {
    minHeight: `${percentage}%`,
    maxHeight: `${percentage}%`,
  };
	return (
		<div className="ReporteCentro">
		<div className="ReporteCentro__contenedor" style={dimensions}>
			<div
				className="ReporteCentro__pagina ReporteCentro__pagina--1"
				style={dimensionsPage}
			>
				<Encabezado />
				<MensajeError>
					<DatosEmpresa nombreEmpresa={encabezado} />
				</MensajeError>
				<MensajeError>
					<CuadroResumen />
				</MensajeError>
				<MensajeError>
					<TablaAntecedentes />
				</MensajeError>
				<p className="ReporteCentro__titulo">
        I. Resumen de resultados obtenidos en alimento medicado y medicación de agua dulce
     	 </p>
				<div className="ReporteCentro__seccion">
				</div>
				<Sandalias pagina={1} />
			</div>
			<div
				className="ReporteCentro__pagina ReporteCentro__pagina--2"
				style={dimensionsPage}
			>
				<Encabezado />
				<Comentarios
					agregarComentario={agregarComentarioCentro}
					comentarios={comentariosCentro}
					eliminarComentario={eliminarComentarioCentro}
				/>
				<Sandalias pagina={2} />
			</div>
		</div>
	</div>
	)
}

export default ReporteCentro