import React from "react";
import { useSelector } from "react-redux";
import Sandalias from "./Sandalias";
import MensajeError from "../MensajeError";
import DatosEmpresa from "./DatosEmpresa/DatosEmpresa";
import Encabezado from "./Encabezado/Encabezado";
import TablaResumenAlimento from "./TablaResumenAlimento";
import Comentarios from "./Comentarios";
import TablaLotes from "./TablaLotes/TablaLotes";

const ReporteAlimento = ({ titulo }) => {
  const { nombreEmpresa } = useSelector((state) => state.reporteAlimento);

  return (
    <div className="Reporte">
      <div className="Reporte__contenedor">
        <div className="Reporte__pagina ReporteAlimento__pagina--1">
          <Encabezado titulo={titulo} />
          <MensajeError>
            <DatosEmpresa nombreEmpresa={nombreEmpresa} />
          </MensajeError>
          <div className="Reporte__InformacionGeneral">
            <h3 className="Reporte__titulo_seccion">Información General</h3>
            <div className="Reporte__seccion">
              <MensajeError>
                <TablaResumenAlimento />
              </MensajeError>
              <MensajeError>
                <TablaResumenAlimento />
              </MensajeError>
            </div>
          </div>
            <TablaLotes/>
					<Comentarios />
          <Sandalias pagina={1} />
        </div>
      </div>
    </div>
  );
};

export default ReporteAlimento;
