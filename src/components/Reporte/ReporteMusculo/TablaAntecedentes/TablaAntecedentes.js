import React, { useState } from "react";
import { useSelector } from "react-redux";
import { colConcentracionObjetivo, colCumplimiento, colDestinoTrat, colFechaInicioTrat, colFechaTerminoTrat, colFechaVeranoTrat, colLoteAlimento, colPesoInicialTrat, colPlanta, colRecetaAlimento } from "../../../../constants";
import { onlyUnique, selectMinMax, selectMinMaxFecha } from "../../../../redux/ducks/utilities";
import "./TablaAntecedentes.css";

const TablaAntecedentes = () => {

  const { datosAlimentoLotesAsociados: datos } = useSelector((state) => state.reporteMusculo)
  const [grupo, setGrupo] = useState("")
  const [estanques, setEstanques] = useState("")
  const [peces, setPeces] = useState("")
  const [alimento, setAlimento] = useState("")
  console.log({
    grupo,
    estanques,
    peces,
    alimento
  })
  const filasColumna1 = [
    ["PMV", datos.map(v => v[colRecetaAlimento]).filter(onlyUnique).join(' / ')],
    ["Grupo", (<input
      className="TablaAntecedentes__input"
      style={{backgroundColor: grupo !== "" ? "transparent" : "var(--color-highlight)"}}
      value={grupo}
      onChange={(e) => {setGrupo(e.target.value)}
      }
    />)],
    ["Número de peces", (<input
      className="TablaAntecedentes__input"
      style={{backgroundColor: peces !== "" ? "transparent" : "var(--color-highlight)"}}
      value={peces}
      onChange={(e) => {setPeces(parseInt(e.target.value.replace(/[^0-9]+/g, "")).toLocaleString("de-DE"))}
      }
    />)],
    ["Peso al inicio de tratamiento (g)", selectMinMax(datos.map(v => Math.round(v[colPesoInicialTrat]))).filter(onlyUnique).join(' - ')],
    ["Estanques medicados", (<input
      className="TablaAntecedentes__input"
      style={{backgroundColor: estanques !== "" ? "transparent" : "var(--color-highlight)"}}
      value={estanques}
      onChange={(e) => {setEstanques(parseInt(e.target.value.replace(/[^0-9]+/g, "")).toLocaleString("de-DE"))}
      }
    />)],
    ["Lote de alimento", datos.map(v => v[colLoteAlimento]).filter(onlyUnique).join(' / ')],
    ["Planta de alimento", datos.map(v => v[colPlanta]).filter(onlyUnique).join(' / ')],
  ];
  const filasColumna2 = [
    ["Concentración objetivo PMV (ppm)", datos.map(v => Math.round(v[colConcentracionObjetivo]).toLocaleString("de-DE")).join(' / ')],
    ["Inclusión de activo en alimento (%)", datos.map(v => (v[colCumplimiento] * 100).toLocaleString("de-DE", {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    })).join(' / ')],
    ["Alimento consumido (kg)", (<input
      className="TablaAntecedentes__input"
      style={{backgroundColor: alimento !== "" ? "transparent" : "var(--color-highlight)"}}
      value={alimento}
      onChange={(e) => {setAlimento(parseInt(e.target.value.replace(/[^0-9]+/g, "")).toLocaleString("de-DE"))}
      }
    />)],
    ["Fecha de inicio de tratamiento", selectMinMaxFecha(datos.map(v => v[colFechaInicioTrat])).filter(onlyUnique).join(' - ')],
    ["Fecha de término de tratamiento", selectMinMaxFecha(datos.map(v => v[colFechaTerminoTrat])).filter(onlyUnique).join(' - ')],
    ["Fecha de inicio fotoperiodo", selectMinMaxFecha(datos.map(v => v[colFechaVeranoTrat])).filter(onlyUnique).join(' - ')],
    ["Centro de destino",  datos.map(v => v[colDestinoTrat]).filter(onlyUnique).join(' / ')],
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
