import React from "react";
import "./TablaLotes.css";
import {
  colLoteAlimento,
  colAlimentoCV,
  colAlimentoProm,
  colAlimentoSTD,
  colCumplimiento,
  colAlimentoMuestra,
} from "../../../../constants";

const TablaLotes = ({ lote }) => {
  const headers = ["Lote"];
  let values = [lote[colLoteAlimento]];

  Object.entries(lote).map((e) => {
    if (e[0].startsWith(colAlimentoMuestra) && e[1]) {
      headers.push(e[0].split(' ').join('\n'));
      values.push(
        e[1].toLocaleString("de-DE", {
          maximumFractionDigits: 1,
          minimumFractionDigits: 1,
        })
      );
    }
  });

  [
    "Promedio\n(ppm)", "CV\n", "Cumplimiento\n", "Desviación\nEstándar"
  ].map((v) => headers.push(v))

  values = [
    ...values,
    lote[colAlimentoProm].toLocaleString("de-DE", {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    }),
    (lote[colAlimentoCV] * 100).toLocaleString("de-DE", {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    }) + '%',
    (lote[colCumplimiento] * 100).toLocaleString("de-DE", {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    }) + '%',
    lote[colAlimentoSTD].toLocaleString("de-DE", {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    })
  ]

  return (
    <div className="TablaLotes">
      <div
        className="TablaLotes__tabla"
        style={{
          gridTemplate: `3rem 1fr / repeat(${headers.length} , 1fr)`,
        }}
      >
        <div
          className="TablaLotes__encabezados"
          style={{ gridTemplateColumns: `1.5fr repeat(${headers.length - 3}, 1fr) 1.5fr 1.5fr` }}
        >
          {headers.map((col, i) => (
            <div key={`TablaLotes-encabezados-${i}`}>{col}</div>
          ))}
        </div>
        <div
          key={`TablaLotes-fila-1}`}
          className="TablaLotes__fila"
          style={{ gridTemplateColumns: `1.5fr repeat(${headers.length - 3}, 1fr) 1.5fr 1.5fr` }}
        >
          {values.map((v, i) => (
            <div key={`TablaLotes-valores-${i}`}>{v}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TablaLotes;
