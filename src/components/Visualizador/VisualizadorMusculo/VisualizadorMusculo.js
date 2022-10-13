import React from 'react'
import { agregarComentarioMusculo, eliminarComentarioMusculo } from '../../../redux/ducks/comentarios';
import { guardarComentarios } from '../../../redux/ducks/reporteMusculo';

const VisualizadorMusculo = () => {
  const { comentariosMusculo, preViz } = useSelector((state) => state.comentarios);
  const { 
    empresa,
    datosEjercicio,
    piscicultura, 
    fecha,
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
    piscicultura, 
    fecha,
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
        fecha: today,
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
          <Encabezado reporteID={REPORTE_ID_MUSCULO} reporteNombre={REPORTE_NOMBRE_MUSCULO}/>
          <MensajeError>
            <DatosEmpresa nombreEmpresa={empresa} fecha={today}/>
          </MensajeError>
          <MensajeError>
            <CuadroResumen />
          </MensajeError>
          <MensajeError>
            <TablaAntecedentes />
          </MensajeError>
          <div className="ReporteMusculo__seccion">
            <MensajeError>
              <GraficoCumplimiento />
            </MensajeError>
            <MensajeError>
              <GraficoComparacion />
            </MensajeError>
          </div>
          <Sandalias pagina={1} />
        </div>
        <div
          className="ReporteMusculo__pagina ReporteMusculo__pagina--2"
          style={dimensionsPage}
        >
          <Encabezado reporteID={REPORTE_ID_MUSCULO} reporteNombre={REPORTE_NOMBRE_MUSCULO}/>
          <MensajeError>
            <TablaMuestras />
          </MensajeError>
          <Comentarios
            agregarComentario={agregarComentarioMusculo}
            comentarios={comentariosMusculo}
            eliminarComentario={eliminarComentarioMusculo}
            guardarComentarios={guardarComentarios}
            preViz={preViz}
          />
          <Sandalias pagina={2} />
        </div>
      </div>
    </div>
  );
}

export default VisualizadorMusculo