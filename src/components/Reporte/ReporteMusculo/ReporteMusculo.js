import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MensajeError from "../../MensajeError";
import DatosEmpresa from "../DatosEmpresa";
import Encabezado from "../Encabezado";
import Sandalias from "./Sandalias";
import Comentarios from "../Comentarios";
import "./ReporteMusculo.css";
import CuadroResumen from "./CuadroResumen";
import TablaAntecedentes from "./TablaAntecedentes";
import GraficoCumplimiento from "./GraficoCumplimiento";
import GraficoComparacion from "./GraficoComparacion";
import TablaMuestras from "./TablaMuestras";
import {
  agregarComentarioMusculo,
  eliminarComentarioMusculo,
} from "../../../redux/ducks/comentarios";
const { ipcRenderer } = window.require("electron");

const ReporteMusculo = () => {
  const { comentariosMusculo } = useSelector((state) => state.comentarios);
  const { nombreEmpresa } = useSelector((state) => state.reporteMusculo);
  const numeroDePaginas = 2;
  const nEmpresa = nombreEmpresa.label;
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
              <GraficoCumplimiento />
            </MensajeError>
            <MensajeError>
              <GraficoComparacion />
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
          <Comentarios
            agregarComentario={agregarComentarioMusculo}
            comentarios={comentariosMusculo}
            eliminarComentario={eliminarComentarioMusculo}
          />
          <Sandalias pagina={2} />
        </div>
      </div>
    </div>
  );
};

export default ReporteMusculo;
