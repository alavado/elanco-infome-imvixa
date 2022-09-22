import React from "react";
import {
  colCantidadProgramadaAlimento,
  colConcentracionObjetivo,
  colInformeAlimento,
  colLoteAlimento,
  colPlanta,
  colRecetaAlimento,
  colAlimentoCalibre,
  colFechaAlimento,
  colPisciculturaAlimento
} from "../../../../constants";
import "./TablaResumenAlimento.css";
import TablaResumenAlimentoUI from "./TablaResumenAlimentoUI";

const TablaResumenAlimento = ({ lote: datos }) => {
  const fecha = datos[colFechaAlimento].toString().substring(0,10)
  const programa = datos[colCantidadProgramadaAlimento].toLocaleString("de-DE", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })
  const calibre = datos[colAlimentoCalibre] ? datos[colAlimentoCalibre] : '-'
  return (
    <TablaResumenAlimentoUI 
      informe={datos[colInformeAlimento]}
      piscicultura={datos[colPisciculturaAlimento]}
      planta={datos[colPlanta]}
      fecha={fecha}
      pmv={datos[colRecetaAlimento]}
      lote={datos[colLoteAlimento]}
      objetivo={datos[colConcentracionObjetivo]}
      programa={programa}
      calibre={calibre}
    />
  );
};

export default TablaResumenAlimento;
