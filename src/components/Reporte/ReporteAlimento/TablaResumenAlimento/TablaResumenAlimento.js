import React from "react";
import { useSelector } from "react-redux";
import "./TablaResumenAlimento.css";
import TablaResumenAlimentoUI from "./TablaResumenAlimentoUI";

const TablaResumenAlimento = ({ index, language }) => {
  const { lotes } = useSelector(state => state.reporteAlimento)
  const {
    informe,
    piscicultura,
    planta,
    fecha,
    pmv,
    lote,
    objetivo,
    programa,
    calibre
  } = lotes[index]
  return (
    <TablaResumenAlimentoUI 
      informe={informe}
      piscicultura={piscicultura}
      planta={planta}
      fecha={fecha}
      pmv={pmv}
      lote={lote}
      objetivo={objetivo}
      programa={programa}
      calibre={calibre}
      language={language}
    />
  );
};

export default TablaResumenAlimento;
