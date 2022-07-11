import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ReporteAlimento from "./ReporteAlimento";
import ReporteSeguimiento from "./ReporteSeguimiento";
import ReporteMusculo from "./ReporteMusculo";
const { ipcRenderer } = window.require('electron')

const Reporte = () => {

  const { reporte } = useSelector((state) => state.parametrosGenerales);
  console.log({reporte})
  useEffect(() => {
    ipcRenderer.send('viendoReporte', reporte.id)
    return () => ipcRenderer.send('yaNoViendoReporte')
  }, [reporte])
  if (reporte) {
    switch (reporte.id) {
      case 1:
        return (
          <ReporteAlimento />
        );
      case 2:
        return (
          <ReporteMusculo />
        )
      default:
        return (
          <ReporteSeguimiento />
        );
    }
  }
  return <div>Hola</div>
  
}

export default Reporte