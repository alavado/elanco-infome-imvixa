import React from "react";
import { useSelector } from "react-redux";
import {
  colCantidadProgramadaAlimento,
  colConcentracionObjetivo,
  colInformeAlimento,
  colLoteAlimento,
  colPlanta,
  colRecetaAlimento,
  colAlimentoCalibre,
} from "../../../../constants";
import "./TablaResumenAlimento.css";

const TablaResumenAlimento = () => {
  const { fecha, piscicultura, datosLotes } = useSelector(
    (state) => state.reporteAlimento
  );

  const datos = datosLotes[0];
  const filas = [
    ["ID. Reporte laboratorio", datos[colInformeAlimento]],
    ["Piscicultura", piscicultura.value],
    ["Planta de alimento", datos[colPlanta]],
    ["Fecha de elaboración", fecha.value],
    ["PMV", datos[colRecetaAlimento]],
    ["Lote de alimento", datos[colLoteAlimento]],
    [
      "Concentración objetivo PMV (ppm)",
      Math.round(datos[colConcentracionObjetivo] * Math.pow(10, 1)) /
        Math.pow(10, 1),
    ],
    [
      "Cantidad Programada por receta (kg)",
      datos[colCantidadProgramadaAlimento],
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
