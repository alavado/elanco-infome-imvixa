import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Sandalias from "./Sandalias";
import MensajeError from "../../MensajeError";
import DatosEmpresa from "../DatosEmpresa/DatosEmpresa";
import Encabezado from "../Encabezado/Encabezado";
import TablaResumenAlimento from "./TablaResumenAlimento";
import Comentarios from "./Comentarios";
import TablaLotes from "./TablaLotes/TablaLotes";
import GraficoCumplimiento from "./GraficoCumplimiento/GraficoCumplimiento";
import { colEmpresaAlimento } from "../../../constants";
import "./ReporteAlimento.css";
const { ipcRenderer } = window.require('electron')

const ReporteAlimento = () => {
  const { lotesSeleccionados, nombreEmpresa } = useSelector((state) => state.reporteAlimento);
  useEffect(() => {
    ipcRenderer.send('datosReporte', {
      numeroDeLotes: lotesSeleccionados.length,
      nombreEmpresa: nombreEmpresa.value
    })
  }, [lotesSeleccionados, nombreEmpresa])
  const dimensions = {
    width: "100%",
    height: `calc(${lotesSeleccionados.length} * 132.86vw)`,
    maxHeight: `calc(${lotesSeleccionados.length} * 132.86vw)`,
  };
  const percentage = Math.round((100 / lotesSeleccionados.length) * 100) / 100;
  const dimensionsPage = {
    minHeight: `${percentage}%`,
    maxHeight: `${percentage}%`
  }
  return (
    <div className="ReporteAlimento">
      <div className="ReporteAlimento__contenedor" style={dimensions}>
        {lotesSeleccionados.map((l, i) => (
          <div className="ReporteAlimento__pagina" style={dimensionsPage} key={`reporte-lote-${i}`}>
            <Encabezado />
            <MensajeError>
              <DatosEmpresa nombreEmpresa={l.data[colEmpresaAlimento]} />
            </MensajeError>
            <div className="Reporte__InformacionGeneral">
              <h3 className="Reporte__titulo_seccion">Información General</h3>
              <div className="ReporteAlimento__seccion">
                <MensajeError>
                  <TablaResumenAlimento lote={l.data} />
                </MensajeError>
                <MensajeError>
                  <GraficoCumplimiento lote={l.data} />
                </MensajeError>
              </div>
            </div>
            <TablaLotes lote={l.data} />
            <Comentarios indice={i + 1} />
            <Sandalias pagina={i + 1} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReporteAlimento;
