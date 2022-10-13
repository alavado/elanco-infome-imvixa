import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colConcentracionObjetivo, colCumplimiento, colDestinoTrat, colFechaInicioTrat, colFechaTerminoTrat, colFechaVeranoTrat, colLoteAlimento, colPesoInicialTrat, colPlanta, colRecetaAlimento } from "../../../../constants";
import { guardarAlimento, guardarEstanques, guardarGrupo, guardarPeces } from "../../../../redux/ducks/reporteMusculo";
import { onlyUnique, selectMinMax, selectMinMaxFecha } from "../../../../redux/ducks/utilities";
import "./TablaAntecedentes.css";

const TablaAntecedentes = () => {
  const dispatch = useDispatch()
  const parseNumber = (valor) => {
    if (valor.replace(/[^0-9]+/g, "") === "") return ""
    return parseInt(valor.replace(/[^0-9]+/g, "")).toLocaleString("de-DE")
  }

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
  // const [grupo, setGrupo] = useState(initialGrupo)
  // const [estanques, setEstanques] = useState(initialEstanques)
  // const [peces, setPeces] = useState(initialPeces)
  // const [alimento, setAlimento] = useState(initialAlimento)

  const filasColumna1 = [
    ["PMV", ta_pmv],
    ["Grupo", (<input
      className="TablaAntecedentes__input"
      style={{backgroundColor: grupo !== "" ? "transparent" : "var(--color-highlight)"}}
      value={grupo}
      onChange={(e) => {dispatch(guardarGrupo(e.target.value))}
      }
    />)],
    ["Número de peces", (<input
      className="TablaAntecedentes__input"
      style={{backgroundColor: peces !== "" ? "transparent" : "var(--color-highlight)"}}
      value={peces}
      onChange={(e) => {dispatch(guardarPeces(parseNumber(e.target.value)))}
      }
    />)],
    ["Peso al inicio de tratamiento (g)", ta_peso],
    ["Estanques medicados", (<input
      className="TablaAntecedentes__input"
      style={{backgroundColor: estanques !== "" ? "transparent" : "var(--color-highlight)"}}
      value={estanques}
      onChange={(e) => {dispatch(guardarEstanques(parseNumber(e.target.value)))}
      }
    />)],
    ["Lote de alimento", ta_lotes],
    ["Planta de alimento", ta_plantas],
  ];
  const filasColumna2 = [
    ["Concentración objetivo PMV (ppm)", ta_coppmv],
    ["Inclusión de activo en alimento (%)", ta_inclusion],
    ["Alimento consumido (kg)", (<input
      className="TablaAntecedentes__input"
      style={{backgroundColor: alimento !== "" ? "transparent" : "var(--color-highlight)"}}
      value={alimento}
      onChange={(e) => {dispatch(guardarAlimento(parseNumber(e.target.value)))}
      }
    />)],
    ["Fecha de inicio de tratamiento", ta_fini],
    ["Fecha de término de tratamiento", ta_fterm],
    ["Fecha de inicio fotoperiodo", ta_foto],
    ["Centro de destino", ta_cd],
  ];
  return (
    <div className="TablaAntecedentes">
      <h4 className="TablaAntecedentes__titulo">
        Antecedentes del grupo tratado
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
