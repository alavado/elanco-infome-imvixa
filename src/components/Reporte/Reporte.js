import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ReporteAlimento from "./ReporteAlimento";
import ReporteSeguimiento from "./ReporteSeguimiento";
import ReporteMusculo from "./ReporteMusculo";
import ReporteCentro from "./ReporteCentro";
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