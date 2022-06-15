import React from "react";
import { useSelector } from "react-redux";
import {
  colAlimentoM1,
  colAlimentoM2,
  colAlimentoM3,
  colAlimentoM4,
  colConcentracionObjetivo,
  colCumplimiento,
  colLoteAlimento,
  colPlanta,
} from "../../../../constants";
import {
  mean,
  iqrValues,
  iqrValuesFixed,
} from "../../utilitiesReporte";
import "./GraficoCumplimiento.css";

const GraficoCumplimiento = ({lote}) => {
  const { datosLotes, datosFiltradosAlimento } = useSelector(
    (state) => state.reporteAlimento
  );
  const { datosAlimento } = useSelector(
    (state) => state.parametrosGenerales
  );
  const { cumplimiento } = useSelector((state) => state.reporte);

  const cumplimientosEmpresa = datosFiltradosAlimento.filter(v => lote !== v[colLoteAlimento]).map(
    (obj) => obj[colCumplimiento] * 100
  );

  const datoLote = datosLotes.find(v => v[colLoteAlimento] === lote)

  const cumplimientosPlantaIndustria = datosAlimento.filter(v => datoLote[colPlanta] === v[colPlanta] && lote !== v[colLoteAlimento]).map(
    (obj) => obj[colCumplimiento] * 100
  );

  let datosEmpresa = {
    nombre: "Empresa",
    promedio:
      cumplimiento.prom !== "" ? cumplimiento.prom : mean(cumplimientosEmpresa),
    ...iqrValues(cumplimientosEmpresa),
    max:
      cumplimiento.max !== ""
        ? cumplimiento.max
        : Math.max(...cumplimientosEmpresa),
    min:
      cumplimiento.min !== ""
        ? cumplimiento.min
        : Math.min(...cumplimientosEmpresa),
  };

  let datosPlantaIndustria = {
    nombre: datoLote[colPlanta],
    promedio:
      cumplimiento.prom !== "" ? cumplimiento.prom : mean(cumplimientosPlantaIndustria),
    ...iqrValues(cumplimientosPlantaIndustria),
    max:
      cumplimiento.max !== ""
        ? cumplimiento.max
        : Math.max(...cumplimientosPlantaIndustria),
    min:
      cumplimiento.min !== ""
        ? cumplimiento.min
        : Math.min(...cumplimientosPlantaIndustria),
  };

  if (cumplimiento.q2 !== "") {
    datosPlantaIndustria = {
      ...datosPlantaIndustria,
      ...iqrValuesFixed(cumplimiento.q2, cumplimiento.q3, cumplimiento.q4),
    };
  }
  // const dat = datosLotes.filter(v => v[colLoteAlimento] === lote).map((lote) => {
  //   const values = [
  //     colALimentoM1,
  //     colALimentoM2,
  //     colALimentoM3,
  //     colALimentoM4,
  //   ].map((muestra) => (lote[muestra] * 100) / lote[colConcentracionObjetivo]);
  //   return {
  //     nombre: lote[colLoteAlimento].toString(),
  //     promedio: mean(values),
  //     ...iqrValues(values),
  //     max: Math.max(...values),
  //     min: Math.min(...values),
  //   };
  // });
  const valuesLote = [
    colAlimentoM1,
    colAlimentoM2,
    colAlimentoM3,
    colAlimentoM4,
  ].map((muestra) => (datoLote[muestra] * 100) / datoLote[colConcentracionObjetivo]);

  const datos = [
    datosPlantaIndustria,
    datosEmpresa,
    {
      nombre: lote.toString(),
      promedio: mean(valuesLote),
      ...iqrValues(valuesLote),
      max: Math.max(...valuesLote),
      min: Math.min(...valuesLote),
    }
    // ...dat.sort((a, b) =>
    //   a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
    // ),
  ];

  const vMax = Math.ceil(datos.reduce((max, v) => Math.max(max, v.max), 0));
  const vMin = Math.floor(
    datos.reduce((min, v) => Math.min(min, v.promedio), Infinity)
  );
  const tick = Math.pow(10, Math.floor(Math.log10(vMin)));
  let yMax = Math.max(100, 10 * Math.ceil(vMax / tick));
  const yMin = Math.min(50, 10 * Math.floor(vMin / tick));
  const yLineas = [
    ...Array(Math.round(1 + (yMax - yMin) / tick))
      .fill(0)
      .map((_, i) => yMin + tick * i),
  ].reverse();
  yMax = Math.max(...yLineas);

  return (
    <div className="GraficoCumplimiento">
      <p className="GraficoCumplimiento__titulo">
        Cumplimiento (%) concentración en alimento (logrado / intentado)
      </p>
      <div className="GraficoCumplimiento__contenedor_grafico">
        <p className="GraficoCumplimiento__etiqueta_eje_y">
          % de cumplimiento
        </p>
        <div className="GraficoCumplimiento__contenedor_lineas">
          {yLineas.map((y) => (
            <div
              key={`lineay-${y}`}
              className="GraficoCumplimiento__linea"
            >
              <p className="GraficoCumplimiento__etiqueta_linea">
                {y.toLocaleString("de-DE")}
              </p>
            </div>
          ))}
        </div>
        {datos.map((d) => (
          <div
            key={`caja-cc-${d.nombre}`}
            className="GraficoCumplimiento__contenedor_caja"
          >
            <div
              className="GraficoCumplimiento__bigote"
              style={{
                "--porcentaje-top": `${
                  ((yMax - d.max) / (yMax - yMin)) * 100
                }%`,
                height: `${((d.max - d.min) / (yMax - yMin)) * 100}%`,
              }}
            />
            <div
              className="GraficoCumplimiento__caja"
              style={{
                "--porcentaje-bottom": `${Math.max(
                  0,
                  ((d.mediana - d.iqrMitadInferior - yMin) / (yMax - yMin)) *
                    100
                )}%`,
                "--porcentaje-top": `${
                  ((yMax - d.iqrMitadSuperior - d.mediana) / (yMax - yMin)) *
                  100
                }%`,
              }}
            >
              {d.promedio.toLocaleString("de-DE", {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
              })}
            </div>
            <div className="GraficoCumplimiento__etiqueta_caja">
              {d.nombre.split(" ").map((n, i) => (
                <div key={`${d.nombre}-${i}`}>{n}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraficoCumplimiento;
