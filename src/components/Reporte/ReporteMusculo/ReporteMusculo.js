import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MensajeError from "../../MensajeError";
import DatosEmpresa from "../DatosEmpresa/DatosEmpresa";
import Encabezado from "../Encabezado/Encabezado";
import Sandalias from "./Sandalias";
import Comentarios from "../ReporteAlimento/Comentarios";
import "./ReporteMusculo.css";
import CuadroResumen from "./CuadroResumen";
import TablaAntecedentes from "./TablaAntecedentes";
import GraficoCumplimiento from "./GraficoCumplimiento";
import GraficoComparacion from "./GraficoComparacion";
import TablaMuestras from "./TablaMuestras";
const { ipcRenderer } = window.require("electron");

const ReporteMusculo = () => {
  const { nombreEmpresa } = useSelector((state) => state.reporteMusculo);
  const numeroDePaginas = 2;
  useEffect(() => {
    ipcRenderer.send("datosReporte", {
      nombreEmpresa,
      numeroDePaginas,
    });
  }, [nombreEmpresa]);

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
    <div className="ReporteMusculo">
      <div className="ReporteMusculo__contenedor" style={dimensions}>
        <div
          className="ReporteMusculo__pagina ReporteMusculo__pagina--1"
          style={dimensionsPage}
        >
          <Encabezado />
          <MensajeError>
            <DatosEmpresa nombreEmpresa={nombreEmpresa.label} />
          </MensajeError>
          <MensajeError>
            <CuadroResumen />
          </MensajeError>
          <MensajeError>
            <TablaAntecedentes />
          </MensajeError>
          <div className="ReporteMusculo__seccion">
						<MensajeError>
							<GraficoComparacion />
						</MensajeError>
            <MensajeError>
              <GraficoCumplimiento />
            </MensajeError>
          </div>
          <Sandalias pagina={1} />
        </div>
        <div
          className="ReporteMusculo__pagina ReporteMusculo__pagina--2"
          style={dimensionsPage}
        >
          <Encabezado />
          <MensajeError>
            <TablaMuestras />
          </MensajeError>
          <Comentarios indice={2} />
          <Sandalias pagina={2} />
        </div>
      </div>
    </div>
  );
};

export default ReporteMusculo;
