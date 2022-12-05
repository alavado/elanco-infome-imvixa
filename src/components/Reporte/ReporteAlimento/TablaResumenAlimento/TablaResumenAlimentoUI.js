import React from "react";
import { getFormatedDate } from "../../utilitiesReporte";
import { generalTexts } from "../generalTexts";
import "./TablaResumenAlimento.css";

const translateNumbers = (v) => {
  return v ? v.toString().replace(',', '-').replace('.', ',').replace('-','.') : '-'
}

const TablaResumenAlimentoUI = ({ informe, piscicultura, planta, fecha, pmv, lote, objetivo, programa, calibre, language }) => {
  const { titulo, filas } = generalTexts.gt_TablaResumen[language]

  
  const filasCompletas = [
    [filas[0], informe],
    [filas[1], piscicultura],
    [filas[2], planta],
    [filas[3], getFormatedDate(fecha, language)],
    [filas[4], pmv],
    [filas[5],lote],
    [filas[6], objetivo.toLocaleString(language === 'es' ? "de-DE" : 'en', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    })],
    [filas[7], programa && programa !== '-' ? translateNumbers(programa) : '-'],
    [filas[8], calibre],
  ];
  return (
    <div className="TablaResumen">
      <h4 className="TablaResumen__titulo">
        {titulo}
      </h4>
      <div className="TablaResumenAlimento__tabla">
        {filasCompletas.map((fila, i) => (
          <div key={`fila-resumen-${i}`} className="TablaResumenAlimento__fila">
            <div>{fila[0]}:</div>
            <div>{fila[1]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablaResumenAlimentoUI;
