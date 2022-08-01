import React, { forwardRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  colEstanquePeces,
  colPisciculturaPeces,
  colSampleOrigin,
  tipoSeaWater,
} from "../../../../constants";
import { onlyUnique } from "../../../../redux/ducks/utilities";
import "./TablaAntecedentes.css";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

const TablaAntecedentes = () => {
  registerLocale("es", es);
  const { datosPorInforme: datos, fecha } = useSelector(
    (state) => state.reporteCentro
  );

  const datosSW = datos.filter((o) => o[colSampleOrigin] === tipoSeaWater);
  // ESTOY COMPLICADA PORQUE NOE STOY VIENDO TODAS LAS PISCICULTURAs
  // QUEDE REVISANDO PORQUE NO AGARRA TRAFUN Y LOS RIOS
  const datosPorPiscicultura = datosSW.reduce((acc, informe) => {
    if (informe[colPisciculturaPeces] in acc) {
      return {
        ...acc,
        [informe[colPisciculturaPeces]]: {
          jaulas: [
            ...acc[informe[colPisciculturaPeces]].jaulas,
            informe[colEstanquePeces],
          ].filter(onlyUnique),
        },
      };
    } else {
      return {
        ...acc,
        [informe[colPisciculturaPeces]]: {
          jaulas: [informe[colEstanquePeces]],
        },
      };
    }
  }, {});

  const [grupo, setGrupo] = useState(
    Object.keys(datosPorPiscicultura).map((v) => "")
  );
  const [fechas, setFechas] = useState(
    Object.keys(datosPorPiscicultura).map((v) => "")
  );
  const [utas, setUtas] = useState(
    Object.keys(datosPorPiscicultura).map((v) => "")
  );

  console.log({ datosSW, datosPorPiscicultura, fecha });

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <input
      value={value}
      className="TablaAntecedentesCentro__button"
      onClick={onClick}
      ref={ref}
    />
  ));
  const fechaVisita = new Date(fecha.value)

  const columnas = [
    [
      "Origen",
      "Grupo",
      "Jaulas muestreadas",
      "Fecha de traslado al mar",
      "Días cultivo al muestreo",
      "Utas al muestreo",
    ],
    ...Object.keys(datosPorPiscicultura).map((piscicultura, i) => [
      piscicultura,
      <input
        className="TablaAntecedentesCentro__input"
        style={{
          backgroundColor:
            grupo[i] !== "" ? "transparent" : "var(--color-highlight)",
        }}
        value={grupo[i]}
        onChange={(e) => {
          const copiaGrupo = [...grupo];
          copiaGrupo[i] = e.target.value;
          setGrupo(copiaGrupo);
        }}
      />,
      datosPorPiscicultura[piscicultura].jaulas.join(" - "),
      <DatePicker
        locale="es"
        customInput={<ExampleCustomInput />}
        selected={fechas[i]}
        onChange={(date) => {
          const copiaFechas = [...fechas];
          copiaFechas[i] = date;
          setFechas(copiaFechas);
        }}
        maxDate={fechaVisita}
        dateFormat="dd/MM/yyyy"
        className="FormParametros__datepicker"
      />,
      fechas[i] ? formatDistance(fechas[i], fechaVisita, {locale: es}) : "",
      <input
        className="TablaAntecedentesCentro__input"
        style={{
          backgroundColor:
            utas[i] !== "" ? "transparent" : "var(--color-highlight)",
        }}
        value={utas[i]}
        onChange={(e) => {
          const copiaUtas = [...utas];
          const valor = e.target.value.replace(/[^0-9]+/g, "");
          if (valor !== "") {
            copiaUtas[i] = parseInt(valor).toLocaleString("de-DE");
          } else {
            copiaUtas[i] = "";
          }
          setUtas(copiaUtas);
        }}
      />,
    ]),
  ];

  // const filasColumna1 = [
  //   ["Origen", ""],
  //   ["Grupo", (<input
  //     className="TablaAntecedentesCentro__input"
  //     style={{backgroundColor: grupo !== "" ? "transparent" : "var(--color-highlight)"}}
  //     value={grupo}
  //     onChange={(e) => {setGrupo(e.target.value)}
  //     }
  //   />)],
  //   ["Jaulas muestreadas", (<input
  //     className="TablaAntecedentesCentro__input"
  //     style={{backgroundColor: peces !== "" ? "transparent" : "var(--color-highlight)"}}
  //     value={peces}
  //     onChange={(e) => {setPeces(parseInt(e.target.value.replace(/[^0-9]+/g, "")).toLocaleString("de-DE"))}
  //     }
  //   />)],
  //   ["Fecha de traslado al mar", ""],
  //   ["Días cultivo al muestreo", (<input
  //     className="TablaAntecedentesCentro__input"
  //     style={{backgroundColor: estanques !== "" ? "transparent" : "var(--color-highlight)"}}
  //     value={estanques}
  //     onChange={(e) => {setEstanques(parseInt(e.target.value.replace(/[^0-9]+/g, "")).toLocaleString("de-DE"))}
  //     }
  //   />)],
  //   ["Utas al muestreo", ""],
  // ];
  return (
    <div className="TablaAntecedentesCentro">
      <div className="TablaAntecedentesCentro__contenedor">
        <h4 className="TablaAntecedentesCentro__titulo">
          Antecedentes del grupo tratado
        </h4>
        <div
          className="TablaAntecedentesCentro__tabla"
          style={{
            gridTemplate: `repeat(1, 1fr) / 14rem repeat(${
              columnas.length - 1
            }, 1fr)`,
          }}
        >
          {columnas.map((columna, j) => (
            <div
              className="TablaAntecedentesCentro__columna"
              key={`col${j}-antecedentes`}
            >
              {columna.map((fila, i) => (
                <div
                  key={`col${j}-fila-antecedentes-${i}`}
                  className="TablaAntecedentesCentro__fila"
                >
                  <div className="TablaAntecedentesCentro__valor">{fila}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TablaAntecedentes;