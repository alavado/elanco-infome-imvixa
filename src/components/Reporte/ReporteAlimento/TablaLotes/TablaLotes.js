import React, { useEffect } from "react";
import {
  colLoteAlimento,
  colAlimentoCV,
  colAlimentoProm,
  colAlimentoSTD,
  colCumplimiento,
  colAlimentoMuestra,
} from "../../../../constants";
import TablaLotesUI from "./TablaLotesUI";

const TablaLotes = ({ lote, index }) => {
  const headers = ["Lote"];
  let values = [lote[colLoteAlimento]];

  Object.entries(lote).forEach((e) => {
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
  ].forEach((v) => headers.push(v))

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
    <TablaLotesUI headers={headers} values={values} />
  );
};

export default TablaLotes;
