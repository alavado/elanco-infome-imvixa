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
  colCumplimiento,
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
  console.log({ lote });
  return (
    <div className="TablaLotes">
      <div className="TablaLotes__tabla">
        <div className="TablaLotes__encabezados">
          {headers.map((col, i) => (
            <div key={`TablaLotes-encabezados-${i}`}>{col}</div>
          ))}
        </div>
        {
          <div key={`TablaLotes-fila-1}`} className="TablaLotes__fila">
            <div>{lote[colLoteAlimento]}</div>
            <div>
              {lote[colAlimentoM1].toLocaleString("de-DE", {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
              })}
            </div>
            <div>
              {lote[colAlimentoM2].toLocaleString("de-DE", {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
              })}
            </div>
            <div>
              {lote[colAlimentoM3].toLocaleString("de-DE", {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
              })}
            </div>
            <div>
              {lote[colAlimentoM4].toLocaleString("de-DE", {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
              })}
            </div>
            <div>
              {lote[colAlimentoProm].toLocaleString("de-DE", {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
              })}
            </div>
            <div>
              {(lote[colAlimentoCV] * 100).toLocaleString("de-DE", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 1,
                })}
              %
            </div>
            <div>
              {(lote[colCumplimiento] * 100).toLocaleString("de-DE", {
                  maximumFractionDigits: 1,
                  minimumFractionDigits: 1,
                })}
              %
            </div>
            <div>
              {lote[colAlimentoSTD].toLocaleString("de-DE", {
                  maximumFractionDigits: 1,
                  minimumFractionDigits: 1,
                })}
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default TablaLotes;
