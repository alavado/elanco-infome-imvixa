import React from "react";
import "./TablaResumenAlimento.css";

const TablaResumenAlimentoUI = ({ informe, piscicultura, planta, fecha, pmv, lote, objetivo, programa, calibre }) => {
  const filas = [
    ["ID. Reporte laboratorio", informe],
    ["Piscicultura", piscicultura],
    ["Planta de alimento", planta],
    ["Fecha de elaboración", fecha],
    ["PMV", pmv],
    ["Lote de alimento",lote],
    ["Concentración objetivo PMV (ppm)", objetivo.toLocaleString("de-DE", {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    })],
    ["Cantidad Programada por receta (kg)", programa],
    ["Calibre", calibre],
  ];
  return (
    <div className="TablaResumen">
      <h4 className="TablaResumen__titulo">
        Reporte de concentración en alimento
      </h4>
      <div className="TablaResumenAlimento__tabla">
        {filas.map((fila, i) => (
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
