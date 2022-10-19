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
import { guardarComentarios } from "../../redux/ducks/reporteSeguimiento"
import { getFechaInicio, meses, months } from "./utilitiesReporte";
import "./Reporte.css";
import { REPORTE_ID_SEGUIMIENTO, REPORTE_NOMBRE_SEGUIMIENTO } from "../../helpers/reportes";
import { generalTexts } from "./generalTexts";
const { ipcRenderer } = window.require("electron");

const ReporteSeguimiento = ({language}) => {
  const { comentarios } = useSelector((state) => state.comentarios);
  const { nombreEmpresa, fechaInicio, fechaFinal, divisionTemporal } =
    useSelector((state) => state.reporte);
  const fechaInicial = getFechaInicio(
    fechaInicio,
    fechaFinal,
    divisionTemporal
  );

  const listaMes = language === 'es' ? meses : months
  const fechaDatosInicial = `${
    listaMes[fechaInicial.getMonth()]
  } ${fechaInicial.getFullYear()}`;
  const fechaDatosFinal = `${
    listaMes[fechaFinal.getMonth()]
  } ${fechaFinal.getFullYear()}`;
  const fechaDatos = `${fechaDatosInicial} - ${fechaDatosFinal}`;
  useEffect(() => {
    ipcRenderer.send("datosReporte", {
      nombreEmpresa,
    });
  }, [nombreEmpresa]);
  const today = new Date();
  return (
    <div className="Reporte">
      <div className="Reporte__contenedor">
        <div className="Reporte__pagina Reporte__pagina--1">
          <Encabezado reporteID={REPORTE_ID_SEGUIMIENTO} reporteNombre={REPORTE_NOMBRE_SEGUIMIENTO} language={language} />
          <MensajeError>
            <DatosEmpresa
              nombreEmpresa={nombreEmpresa}
              fechaDatos={fechaDatos}
              fecha={today}
              language={language}
            />
          </MensajeError>
          <InformacionGeneral language={language} />
          <ResultadosConcentracion language={language} />
          <Sandalias language={language} pagina={1} />
        </div>
        <div className="Reporte__pagina Reporte__pagina--2">
          <Encabezado reporteID={REPORTE_ID_SEGUIMIENTO} reporteNombre={REPORTE_NOMBRE_SEGUIMIENTO} language={language} />
          <ResultadosEficacia language={language} />
          <Comentarios
            reporteID={REPORTE_ID_SEGUIMIENTO}
            comentarios={comentarios}
            agregarComentario={agregarComentario}
            eliminarComentario={eliminarComentario}
            guardarComentarios={guardarComentarios}
            language={language}
          />
          <Sandalias pagina={2} language={language}/>
        </div>
      </div>
    </div>
  );
};
export default ReporteSeguimiento;
