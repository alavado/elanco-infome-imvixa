import React from "react";
import { useSelector } from "react-redux";
import ReporteAlimento from "./ReporteAlimento";
import ReporteSeguimiento from "./ReporteSeguimiento";
import { useEffect } from 'react'
const { ipcRenderer } = window.require('electron')

const Reporte = () => {

  const { reporte } = useSelector((state) => state.parametrosGenerales);
  
  useEffect(() => {
    ipcRenderer.send('viendoReporte')
    return () => ipcRenderer.send('yaNoViendoReporte')
  }, [])

  switch (reporte.id) {
    case 1:
      return (
        <ReporteAlimento titulo={reporte.titulo}/>
      );
    default:
      return (
        <ReporteSeguimiento titulo={reporte.titulo}/>
      );
  }
  
}

export default Reporte