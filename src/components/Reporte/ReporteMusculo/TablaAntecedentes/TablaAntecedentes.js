import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colConcentracionObjetivo, colCumplimiento, colDestinoTrat, colFechaInicioTrat, colFechaTerminoTrat, colFechaVeranoTrat, colLoteAlimento, colPesoInicialTrat, colPlanta, colRecetaAlimento } from "../../../../constants";
import { guardarAlimento, guardarEstanques, guardarGrupo, guardarPeces } from "../../../../redux/ducks/reporteMusculo";
import { onlyUnique, selectMinMax, selectMinMaxFecha } from "../../../../redux/ducks/utilities";
import "./TablaAntecedentes.css";
import { generalTexts } from '../generalTexts';

const TablaAntecedentes = ({language}) => {
  const dispatch = useDispatch()
  const parseNumber = (valor) => {
    if (valor.replace(/[^0-9]+/g, "") === "") return ""
    return parseInt(valor.replace(/[^0-9]+/g, "")).toLocaleString("de-DE")
  }
  const sininfo =  language === 'es'? "Sin información" : 'No info'

  const { 
    initialGrupo: grupo,
    initialEstanques: estanques,
    initialPeces: peces,
    initialAlimento: alimento,
    ta_pmv,
    ta_peso,
    ta_lotes,
    ta_plantas,
    ta_coppmv,
    ta_inclusion,
    ta_fini,
    ta_fterm,
    ta_foto,
    ta_cd
   } = useSelector((state) => state.reporteMusculo)
  const { gt_TablaAntecedentes } = generalTexts
  const labelsColumna1 = gt_TablaAntecedentes[language].columna1
  const labelsColumna2 = gt_TablaAntecedentes[language].columna2
  const filasColumna1 = [
    [labelsColumna1[0], ta_pmv],
    [labelsColumna1[1], (<input
      className="TablaAntecedentes__input"
      style={{backgroundColor: grupo !== "" ? "transparent" : "var(--color-highlight)",fontSize: grupo.length > 26 ? ".9rem" : "1.2rem"}}
      value={grupo}
      onChange={(e) => {dispatch(guardarGrupo(e.target.value))}
      }
    />)],
    [labelsColumna1[2], (<input
      className="TablaAntecedentes__input"
      style={{backgroundColor: peces !== "" ? "transparent" : "var(--color-highlight)"}}
      value={peces}
      onChange={(e) => {dispatch(guardarPeces(parseNumber(e.target.value)))}
      }
    />)],
    [labelsColumna1[3], ta_peso],
    [labelsColumna1[4], (<input
      className="TablaAntecedentes__input"
      style={{backgroundColor: estanques !== "" ? "transparent" : "var(--color-highlight)", fontSize: estanques.length > 26 ? ".9rem" : "1.2rem"}}
      value={estanques}
      onChange={(e) => {dispatch(guardarEstanques(e.target.value))}
      }
    />)],
    [labelsColumna1[5], ta_lotes],
    [labelsColumna1[6], ta_plantas],
  ];
  const filasColumna2 = [
    [labelsColumna2[0], ta_coppmv],
    [labelsColumna2[1], ta_inclusion],
    [labelsColumna2[2], (<input
      className="TablaAntecedentes__input"
      style={{backgroundColor: alimento !== "" ? "transparent" : "var(--color-highlight)"}}
      value={alimento}
      onChange={(e) => {dispatch(guardarAlimento(parseNumber(e.target.value)))}
      }
    />)],
    [labelsColumna2[3], ta_fini === 'Sin información' ? sininfo : ta_fini],
    [labelsColumna2[4], ta_fterm === 'Sin información' ? sininfo : ta_fterm],
    [labelsColumna2[5], ta_foto === 'Sin información' ? sininfo : ta_foto],
    [labelsColumna2[6], ta_cd],
  ];
  return (
    <div className="TablaAntecedentes">
      <h4 className="TablaAntecedentes__titulo">
        {gt_TablaAntecedentes[language].titulo}
      </h4>
      <div className="TablaAntecedentes__tabla">
        <div className="TablaAntecedentes__columna">
          {filasColumna1.map((fila, i) => (
            <div
              key={`c1-fila-antecedentes-${i}`}
              className="TablaAntecedentes__fila"
            >
              <div>{fila[0]}:</div>
              <div>{fila[1]}</div>
            </div>
          ))}
        </div>
        <div className="TablaAntecedentes__columna">
          {filasColumna2.map((fila, i) => (
            <div
              key={`c2-fila-antecedentes-${i}`}
              className="TablaAntecedentes__fila"
            >
              <div>{fila[0]}:</div>
              <div>{fila[1]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TablaAntecedentes;
