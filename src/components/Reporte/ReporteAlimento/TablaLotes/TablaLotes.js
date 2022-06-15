import React from "react";
import { useSelector } from "react-redux";
import "./TablaLotes.css";
import {
  colLoteAlimento,
  colAlimentoM1,
  colAlimentoM2,
  colAlimentoM3,
  colAlimentoM4,
  colAlimentoCV,
  colAlimentoProm,
  colAlimentoSTD,
  colCumplimiento
} from "../../../../constants";

const TablaLotes = () => {
  const { datosLotes } = useSelector((state) => state.reporteAlimento);

  const headers = [
    "Lote",
    "Muestra 1",
    "Muestra 2",
    "Muestra 3",
    "Muestra 4",
    "Promedio\n(ppm)",
    "CV\n",
    "Cumplimiento\n",
    "Desviación\nEstándar",
  ];
  const decimales1 = 1;
  const decimales2 = 2;
  return (
    <div className="TablaLotes">
      <div className="TablaLotes__tabla">
        <div className="TablaLotes__encabezados">
          {headers.map((col, i) => (
            <div key={`TablaLotes-encabezados-${i}`}>{col}</div>
          ))}
        </div>
        {datosLotes.map((fila, i) => (
          <div key={`TablaLotes-fila-${i}`} className="TablaLotes__fila">
            <div>{fila[colLoteAlimento]}</div>
            <div>{Math.round(fila[colAlimentoM1] * Math.pow(10, decimales1)) / Math.pow(10, decimales1)}</div>
            <div>{Math.round(fila[colAlimentoM2] * Math.pow(10, decimales1)) / Math.pow(10, decimales1)}</div>
            <div>{Math.round(fila[colAlimentoM3] * Math.pow(10, decimales1)) / Math.pow(10, decimales1)}</div>
            <div>{Math.round(fila[colAlimentoM4] * Math.pow(10, decimales1)) / Math.pow(10, decimales1)}</div>
            <div>{Math.round(fila[colAlimentoProm] * Math.pow(10, decimales1)) / Math.pow(10, decimales1)}</div>
            <div>{Math.round(fila[colAlimentoCV] * 100  * Math.pow(10, decimales2)) / Math.pow(10, decimales2) }%</div>
            <div>{Math.round(fila[colCumplimiento] * 100 * Math.pow(10, decimales1)) / Math.pow(10, decimales1)}%</div>
            <div>{Math.round(fila[colAlimentoSTD] * Math.pow(10, decimales1)) / Math.pow(10, decimales1)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablaLotes;
