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
  const { reporte, language, producto } = useSelector((state) => state.parametrosGenerales);
  console.log({producto})
  useEffect(() => {
    ipcRenderer.send('viendoReporte', reporte.id)
    ipcRenderer.on('ReRenderPreExport', (e) => {
      new Promise(resolve => setTimeout(() => ipcRenderer.send('ReRenderPreExport'), 500))
    });
    return () => {
      ipcRenderer.removeAllListeners('ReRenderPreExport')
      ipcRenderer.send('yaNoViendoReporte')
    }
  }, [reporte])

  if (reporte) {
    switch (reporte.id) {
      case 1:
        return (
          <ReporteAlimento language={language} product={producto}/>
        );
      case 2:
        return (
          <ReporteMusculo language={language} product={producto}/>
        )
      case 3:
        return (
          <ReporteCentro language={language}  product={producto}/>
        )
      default:
        return (
          <ReporteSeguimiento language={language} product={producto}/>
        );
    }
  }
  return <div>No ha seleccionado el tipo de reporte</div>
  
}

export default Reporte