import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  agregarComentarioCentro,
  eliminarComentarioCentro,
} from "../../../redux/ducks/comentarios";
import MensajeError from "../../MensajeError";
import Sandalias from "./Sandalias";
import Encabezado from "../Encabezado";
import DatosEmpresa from "../DatosEmpresa";
import CuadroResumen from "./CuadroResumen";
import Comentarios from "../Comentarios";
import "./ReporteCentro.css";
import TablaAntecedentes from "./TablaAntecedentes";
import GraficoCumplimiento from "./GraficoCumplimiento";
import GraficoComparacion from "./GraficoComparacion";
import TablaMuestras from "./TablaMuestras";
import CurvaPorUTAs from "./CurvaPorUTAs";
import CurvaPorPeso from "./CurvaPorPeso";
import { REPORTE_ID_CENTRO, REPORTE_NOMBRE_CENTRO } from "../../../helpers/reportes";
import { generalTexts } from "./generalTexts";
import {
  guardarComentarios
} from "../../../redux/ducks/reporteCentro";
const { ipcRenderer } = window.require("electron");

const ReporteCentro = ({ language }) => {
  const { comentariosCentro, preViz } = useSelector((state) => state.comentarios);
  const { 
    empresa, 
    seasite, 
    fechaValor,
    datosPorInforme, 
    parametrosGraficoPeso, 
    parametrosGraficoUTAs, 
    datosGraficoComparacion } = useSelector((state) => state.reporteCentro);
  const numeroDePaginas = 2;
  const encabezado = seasite + " - " + empresa;
  const titulo1 = generalTexts.seccion1[language]

  useEffect(() => {
    ipcRenderer.send("datosReporte", {
      nombreEmpresa: empresa,
      numeroDePaginas,
    });
  }, [empresa]);

  const datos = {
    seasite,
    fechaValor,
    datosPorInforme,
    parametrosGraficoPeso,
    parametrosGraficoUTAs,
    datosGraficoComparacion, 
    comentarios: comentariosCentro
  }

  useEffect(() => {
    ipcRenderer.removeAllListeners("reporteCentroImpreso")
    ipcRenderer.on("reporteCentroImpreso", async (e, data) => {
      ipcRenderer.send('guardarReporteCentro', {
        tipoID: REPORTE_ID_CENTRO,
        fecha: today.toISOString(),
        empresa: empresa,
        datos 
      })
    });
  }, [datos, empresa]);

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
  const today = new Date();
  return (
    <div className="ReporteCentro">
      <div className="ReporteCentro__contenedor" style={dimensions}>
        <div
          className="ReporteCentro__pagina ReporteCentro__pagina--1"
          style={dimensionsPage}
        >
          <Encabezado reporteID={REPORTE_ID_CENTRO} reporteNombre={REPORTE_NOMBRE_CENTRO} language={language}/>
          <MensajeError>
            <DatosEmpresa nombreEmpresa={encabezado} fecha={today} language={language}/>
          </MensajeError>
          <MensajeError>
            <CuadroResumen language={language}/>
          </MensajeError>
          <MensajeError>
            <TablaAntecedentes language={language}/>
          </MensajeError>
          <div className="ReporteCentro__seccion">
            <p className="ReporteCentro__titulo">
              {titulo1}
            </p>
            <div className="ReporteCentro__seccion_contenedor">
              <MensajeError>
                <GraficoCumplimiento language={language}/>
              </MensajeError>
              <MensajeError>
                <GraficoComparacion language={language}/>
              </MensajeError>
            </div>
          </div>
          <Sandalias pagina={1} language={language} />
        </div>
        <div
          className="ReporteCentro__pagina ReporteCentro__pagina--2"
          style={dimensionsPage}
        >
          <Encabezado reporteID={REPORTE_ID_CENTRO} reporteNombre={REPORTE_NOMBRE_CENTRO} language={language}/>
          <MensajeError>
            <TablaMuestras language={language} />
          </MensajeError>
          <div className="ReporteCentro__seccion_contenedor">
            <MensajeError>
              <CurvaPorPeso language={language}/>
            </MensajeError>
            <MensajeError>
              <CurvaPorUTAs language={language}/>
            </MensajeError>
          </div>
          <Comentarios
            reporteID={REPORTE_ID_CENTRO}
            agregarComentario={agregarComentarioCentro}
            comentarios={comentariosCentro}
            eliminarComentario={eliminarComentarioCentro}
            guardarComentarios={guardarComentarios}
            language={language}
          />
          <Sandalias pagina={2}
          language={language}
          />
        </div>
      </div>
    </div>
  );
};

export default ReporteCentro;
