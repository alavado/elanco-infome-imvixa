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

const TablaResumenAlimento = ({ lote: datos }) => {
  const fecha = datos[colFechaAlimento].toString().substring(0,10)
  const piscicultura = datos[colPisciculturaAlimento]
  const filas = [
    ["ID. Reporte laboratorio", datos[colInformeAlimento]],
    ["Piscicultura", piscicultura],
    ["Planta de alimento", datos[colPlanta]],
    ["Fecha de elaboración", fecha],
    ["PMV", datos[colRecetaAlimento]],
    ["Lote de alimento", datos[colLoteAlimento]],
    [
      "Concentración objetivo PMV (ppm)",
      datos[colConcentracionObjetivo].toLocaleString("de-DE", {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      })
    ],
    [
      "Cantidad Programada por receta (kg)",
      datos[colCantidadProgramadaAlimento].toLocaleString("de-DE", {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }),
    ],
    ["Calibre", datos[colAlimentoCalibre] ? datos[colAlimentoCalibre] : '-'],
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

export default TablaResumenAlimento;
