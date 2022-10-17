import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { REPORTE_NOMBRE_ALIMENTO, REPORTE_ID_ALIMENTO } from '../../../helpers/reportes';
import GraficoCumplimientoUI from '../../Reporte/ReporteAlimento/GraficoCumplimiento/GraficoCumplimientoUI';
import TablaLotesUI from '../../Reporte/ReporteAlimento/TablaLotes/TablaLotesUI';
import MensajeError from "../../MensajeError";
import Encabezado from "../../Reporte/Encabezado";
import DatosEmpresa from "../../Reporte/DatosEmpresa";
import TablaResumenAlimento from "../../Reporte/ReporteAlimento/TablaResumenAlimento";
import Comentarios from "../../Reporte/ReporteAlimento/Comentarios";
import Sandalias from "../../Reporte/ReporteAlimento/Sandalias";
import { generalTexts } from '../../Reporte/ReporteAlimento/generalTexts';
const { ipcRenderer } = window.require('electron')

const VisualizadorAlimento = ({language}) => {
  const { fechaReporte: fecha, nombreEmpresa, lotes } = useSelector(state => state.reporteAlimento)
  const lotesNames = lotes.map(v => v.lote)
  useEffect(() => {
    ipcRenderer.send('datosReporte', {
      numeroDeLotes: lotes.length,
      nombreEmpresa: nombreEmpresa,
      lotes: lotesNames
    })
  }, [lotesNames, nombreEmpresa])

  useEffect(() => {
    ipcRenderer.removeAllListeners("reporteAlimentoImpreso")
    ipcRenderer.on("reporteAlimentoImpreso", async (e, data) => {
      ipcRenderer.send('guardarReporteAlimento', {
        tipoID: REPORTE_ID_ALIMENTO,
        fecha,
        empresa: nombreEmpresa,
        datos: lotes
      })
    });
  }, [lotes]);

  const dimensions = {
    width: "100%",
    height: `calc(${lotes.length} * 132.86vw)`,
    maxHeight: `calc(${lotes.length} * 132.86vw)`,
  };
  const percentage = Math.round((100 / lotes.length) * 100) / 100;
  const dimensionsPage = {
    minHeight: `${percentage}%`,
    maxHeight: `${percentage}%`
  }
  const today = new Date()
  const { seccion1 } = generalTexts
  return (
    <div className="ReporteAlimento">
      <div className="ReporteAlimento__contenedor" style={dimensions}>
        {lotes.map((l, i) => (
          <div className="ReporteAlimento__pagina" style={dimensionsPage} key={`reporte-lote-${i}`}>
            <Encabezado reporteID={REPORTE_ID_ALIMENTO} reporteNombre={REPORTE_NOMBRE_ALIMENTO} language={language}/>
            <MensajeError>
              <DatosEmpresa nombreEmpresa={nombreEmpresa} fecha={today} language={language}/>
            </MensajeError>
            <div className="Reporte__InformacionGeneral">
              <h3 className="Reporte__titulo_seccion">{seccion1[language]}</h3>
              <div className="ReporteAlimento__seccion">
                <MensajeError>
                  <TablaResumenAlimento index={i} language={language}/>
                </MensajeError>
                <MensajeError>
                  <GraficoCumplimientoUI datos={l.datos} language={language}/>
                </MensajeError>
              </div>
            </div>
            <MensajeError>
              <TablaLotesUI headers={l.headers} values={l.values} language={language}/>
            </MensajeError>
            <Comentarios indice={i} language={language}/>
            <Sandalias indice={i} language={language}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VisualizadorAlimento