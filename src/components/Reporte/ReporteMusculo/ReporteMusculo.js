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
  eliminarComentarioMusculo
} from "../../../redux/ducks/comentarios";
import {
  guardarComentarios
} from "../../../redux/ducks/reporteMusculo";
import { REPORTE_ID_MUSCULO, REPORTE_NOMBRE_MUSCULO } from "../../../helpers/reportes";
const { ipcRenderer } = window.require("electron");

const ReporteMusculo = ({ language }) => {
  const { comentariosMusculo, preViz } = useSelector((state) => state.comentarios);
  const { 
    empresa,
    datosEjercicio,
    pisciculturaValue, 
    fechaValue,
    umbral,
    umbralDestacar,
    initialRepElanco,
    initialRepVisita,
    initialRepCliente,
    initialGrupo,
    initialEstanques,
    initialPeces,
    initialAlimento,
    ta_pmv,
    ta_peso,
    ta_lotes,
    ta_plantas,
    ta_coppmv,
    ta_inclusion,
    ta_fini,
    ta_fterm,
    ta_foto,
    ta_cd,
    datosGComp,
    datosGCumpl,
    comentarios
  } = useSelector((state) => state.reporteMusculo);

  const numeroDePaginas = 2;
  const today = new Date();
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
  
  useEffect(() => {
    ipcRenderer.send("datosReporte", {
      nombreEmpresa: empresa,
      numeroDePaginas,
    });
  }, [empresa]);
  
  const datos = {
    pisciculturaValue, 
    fechaValue,
    umbral,
    umbralDestacar,
    datosEjercicio,
    initialRepElanco,
    initialRepVisita,
    initialRepCliente,
    initialGrupo,
    initialEstanques,
    initialPeces,
    initialAlimento,
    ta_pmv,
    ta_peso,
    ta_lotes,
    ta_plantas,
    ta_coppmv,
    ta_inclusion,
    ta_fini,
    ta_fterm,
    ta_foto,
    ta_cd,
    datosGComp,
    datosGCumpl,
    comentarios
  }

  useEffect(() => {
    ipcRenderer.removeAllListeners("reporteMusculoImpreso")
    ipcRenderer.on("reporteMusculoImpreso", async (e, data) => {
      ipcRenderer.send('guardarReporteMusculo', {
        tipoID: REPORTE_ID_MUSCULO,
        fecha: today.toISOString(),
        empresa: empresa,
        datos 
      })
    });
  }, [datos, empresa]);

  return (
    <div className="ReporteMusculo">
      <div className="ReporteMusculo__contenedor" style={dimensions}>
        <div
          className="ReporteMusculo__pagina ReporteMusculo__pagina--1"
          style={dimensionsPage}
        >
          <Encabezado reporteID={REPORTE_ID_MUSCULO} reporteNombre={REPORTE_NOMBRE_MUSCULO} language={language} />
          <MensajeError>
            <DatosEmpresa nombreEmpresa={empresa} fecha={today} language={language} />
          </MensajeError>
          <MensajeError>
            <CuadroResumen language={language}/>
          </MensajeError>
          <MensajeError>
            <TablaAntecedentes language={language} />
          </MensajeError>
          <div className="ReporteMusculo__seccion">
            <MensajeError>
              <GraficoCumplimiento language={language} />
            </MensajeError>
            <MensajeError>
              <GraficoComparacion language={language}/>
            </MensajeError>
          </div>
          <Sandalias pagina={1} />
        </div>
        <div
          className="ReporteMusculo__pagina ReporteMusculo__pagina--2"
          style={dimensionsPage}
        >
          <Encabezado reporteID={REPORTE_ID_MUSCULO} reporteNombre={REPORTE_NOMBRE_MUSCULO} language={language}/>
          <MensajeError>
            <TablaMuestras language={language} />
          </MensajeError>
          <Comentarios
            agregarComentario={agregarComentarioMusculo}
            comentarios={comentariosMusculo}
            eliminarComentario={eliminarComentarioMusculo}
            guardarComentarios={guardarComentarios}
            preViz={preViz}
            language={language}
          />
          <Sandalias pagina={2} language={language}/>
        </div>
      </div>
    </div>
  );
};

export default ReporteMusculo;
