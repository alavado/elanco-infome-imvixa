import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import DatosEmpresa from "./DatosEmpresa/DatosEmpresa";
import InformacionGeneral from "./InformacionGeneral/InformacionGeneral";
import ResultadosEficacia from "./ResultadosEficacia";
import ResultadosConcentracion from "./ResultadosConcentracion";
import Comentarios from "./Comentarios";
import Sandalias from "./Sandalias";
import MensajeError from "../MensajeError";
import Encabezado from "./Encabezado/Encabezado";
import {
  agregarComentario,
  eliminarComentario,
} from "../../redux/ducks/comentarios";
import { getFechaInicio, meses } from "./utilitiesReporte";
import "./Reporte.css";
const { ipcRenderer } = window.require("electron");

const ReporteSeguimiento = () => {
  const { comentarios } = useSelector((state) => state.comentarios);
  const { nombreEmpresa, fechaInicio, fechaFinal, divisionTemporal } =
    useSelector((state) => state.reporte);
  const fechaInicial = getFechaInicio(
    fechaInicio,
    fechaFinal,
    divisionTemporal
  );
  const fechaDatosInicial = `${
    meses[fechaInicial.getMonth()]
  } ${fechaInicial.getFullYear()}`;
  const fechaDatosFinal = `${
    meses[fechaFinal.getMonth()]
  } ${fechaFinal.getFullYear()}`;
  const fechaDatos = `${fechaDatosInicial} - ${fechaDatosFinal}`;
  useEffect(() => {
    ipcRenderer.send("datosReporte", {
      nombreEmpresa,
    });
  }, [nombreEmpresa]);
  return (
    <div className="Reporte">
      <div className="Reporte__contenedor">
        <div className="Reporte__pagina Reporte__pagina--1">
          <Encabezado />
          <MensajeError>
            <DatosEmpresa
              nombreEmpresa={nombreEmpresa}
              fechaDatos={fechaDatos}
            />
          </MensajeError>
          <InformacionGeneral />
          <ResultadosConcentracion />
          <Sandalias pagina={1} />
        </div>
        <div className="Reporte__pagina Reporte__pagina--2">
          <Encabezado />
          <ResultadosEficacia />
          <Comentarios
            comentarios={comentarios}
            agregarComentario={agregarComentario}
            eliminarComentario={eliminarComentario}
          />
          <Sandalias pagina={2} />
        </div>
      </div>
    </div>
  );
};
export default ReporteSeguimiento;
