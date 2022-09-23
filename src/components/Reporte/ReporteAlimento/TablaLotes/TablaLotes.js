import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  colLoteAlimento,
  colAlimentoCV,
  colAlimentoProm,
  colAlimentoSTD,
  colCumplimiento,
  colAlimentoMuestra,
} from "../../../../constants";
import { guardarHeadersValues } from "../../../../redux/ducks/visualizadorReporteAlimento";
import TablaLotesUI from "./TablaLotesUI";

const TablaLotes = ({ lote, index }) => {
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

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(guardarHeadersValues({headers, values, index}))
  }, [headers, values])

  return (
    <TablaLotesUI headers={headers} values={values} />
  );
};

export default TablaLotes;
