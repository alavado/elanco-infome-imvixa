import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Sandalias from "./Sandalias";
import MensajeError from "../../MensajeError";
import DatosEmpresa from "../DatosEmpresa";
import Encabezado from "../Encabezado/Encabezado";
import TablaResumenAlimento from "./TablaResumenAlimento";
import Comentarios from "./Comentarios";
import TablaLotes from "./TablaLotes/TablaLotes";
import GraficoCumplimiento from "./GraficoCumplimiento";
import { colEmpresaAlimento, colLoteAlimento } from "../../../constants";
import "./ReporteAlimento.css";
import { REPORTE_ID_ALIMENTO, REPORTE_NOMBRE_ALIMENTO } from "../../../helpers/reportes";
const { ipcRenderer } = window.require('electron')

const ReporteAlimento = () => {
  const { lotesSeleccionados, nombreEmpresa } = useSelector((state) => state.reporteAlimento);
  useEffect(() => {
    ipcRenderer.send('datosReporte', {
      numeroDeLotes: lotesSeleccionados.length,
      nombreEmpresa: nombreEmpresa.value,
      lotes: lotesSeleccionados.map(v => v.data[colLoteAlimento])
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
  const today = new Date();
  return (
    <div className="ReporteAlimento">
      <div className="ReporteAlimento__contenedor" style={dimensions}>
        {lotesSeleccionados.map((l, i) => (
          <div className="ReporteAlimento__pagina" style={dimensionsPage} key={`reporte-lote-${i}`}>
            <Encabezado reporteID={REPORTE_ID_ALIMENTO} reporteNombre={REPORTE_NOMBRE_ALIMENTO}/>
            <MensajeError>
              <DatosEmpresa nombreEmpresa={l.data[colEmpresaAlimento]} fecha={today}/>
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
            <MensajeError>
              <TablaLotes lote={l.data} />
            </MensajeError>
            <Comentarios pagina={i + 1} />
            <Sandalias pagina={i + 1} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReporteAlimento;
