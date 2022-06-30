import React from "react";
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

const TablaLotes = ({ lote }) => {
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
  console.log({lote})
  return (
    <div className="TablaLotes">
      <div className="TablaLotes__tabla">
        <div className="TablaLotes__encabezados">
          {headers.map((col, i) => (
            <div key={`TablaLotes-encabezados-${i}`}>{col}</div>
          ))}
        </div>
        {(
          <div key={`TablaLotes-fila-1}`} className="TablaLotes__fila">
            <div>{lote[colLoteAlimento]}</div>
            <div>{Math.round(lote[colAlimentoM1] * Math.pow(10, decimales1)) / Math.pow(10, decimales1)}</div>
            <div>{Math.round(lote[colAlimentoM2] * Math.pow(10, decimales1)) / Math.pow(10, decimales1)}</div>
            <div>{Math.round(lote[colAlimentoM3] * Math.pow(10, decimales1)) / Math.pow(10, decimales1)}</div>
            <div>{Math.round(lote[colAlimentoM4] * Math.pow(10, decimales1)) / Math.pow(10, decimales1)}</div>
            <div>{Math.round(lote[colAlimentoProm] * Math.pow(10, decimales1)) / Math.pow(10, decimales1)}</div>
            <div>{Math.round(lote[colAlimentoCV] * 100  * Math.pow(10, decimales2)) / Math.pow(10, decimales2) }%</div>
            <div>{Math.round(lote[colCumplimiento] * 100 * Math.pow(10, decimales1)) / Math.pow(10, decimales1)}%</div>
            <div>{Math.round(lote[colAlimentoSTD] * Math.pow(10, decimales1)) / Math.pow(10, decimales1)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TablaLotes;
