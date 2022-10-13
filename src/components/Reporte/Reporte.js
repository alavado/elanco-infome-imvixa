import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ReporteAlimento from "./ReporteAlimento";
import ReporteSeguimiento from "./ReporteSeguimiento";
import ReporteMusculo from "./ReporteMusculo";
import ReporteCentro from "./ReporteCentro";
import { useHistory } from "react-router-dom";
import VisualizadorAlimento from "../Visualizador/VisualizadorAlimento";
const { ipcRenderer } = window.require('electron')

const Reporte = () => {
  const history = useHistory();
  const { reporte } = useSelector((state) => state.parametrosGenerales);
  useEffect(() => {
    ipcRenderer.send('viendoReporte', reporte.id)
    return () => ipcRenderer.send('yaNoViendoReporte')
  }, [reporte])

  if (reporte) {
    switch (reporte.id) {
      case 1:
        return (
          <VisualizadorAlimento />
        );
      case 2:
        return (
          <ReporteMusculo />
        )
      case 3:
        return (
          <ReporteCentro />
        )
      default:
        return (
          <ReporteSeguimiento />
        );
    }
  }
  return <div>No ha seleccionado el tipo de reporte</div>
  
}

export default Reporte