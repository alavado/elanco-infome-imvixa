import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ReporteAlimento from "./ReporteAlimento";
import ReporteSeguimiento from "./ReporteSeguimiento";
import ReporteMusculo from "./ReporteMusculo";
import ReporteCentro from "./ReporteCentro";
import { useHistory } from "react-router-dom";
const { ipcRenderer } = window.require('electron')

const Reporte = () => {
  const history = useHistory();
  const { reporte, language } = useSelector((state) => state.parametrosGenerales);
  useEffect(() => {
    ipcRenderer.send('viendoReporte', reporte.id)
    return () => ipcRenderer.send('yaNoViendoReporte')
  }, [reporte])

  if (reporte) {
    switch (reporte.id) {
      case 1:
        return (
          <ReporteAlimento language={language}/>
        );
      case 2:
        return (
          <ReporteMusculo language={language}/>
        )
      case 3:
        return (
          <ReporteCentro language={language} />
        )
      default:
        return (
          <ReporteSeguimiento language={language}/>
        );
    }
  }
  return <div>No ha seleccionado el tipo de reporte</div>
  
}

export default Reporte