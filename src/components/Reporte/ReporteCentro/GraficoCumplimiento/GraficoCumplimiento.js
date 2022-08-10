import React from "react";
import { useSelector } from "react-redux";
import {
  colAlimentoM1,
  colAlimentoM2,
  colAlimentoM3,
  colAlimentoM4,
  colConcentracionObjetivo,
  colCumplimiento,
  colEmpresaAlimento,
  colFechaAlimento,
  colLoteAlimento,
  colPlanta,
} from "../../../../constants";
import { mean, iqrValues, iqrValuesFixed } from "../../utilitiesReporte";
import {
  esMayorQueFecha,
  esMenorQueFecha,
  selectMinMaxFecha,
} from "../../../../redux/ducks/utilities";
import "./GraficoCumplimiento.css";

const GraficoCumplimiento = () => {
  const {
    nombreEmpresa,
    lotesAsociados,
    plantasAsociadas,
    datosAlimento: datosAlimentoHistorico,
    datosAlimentoLotesAsociados,
  } = useSelector((state) => state.reporteCentro);
  // const { cumplimiento } = useSelector((state) => state.reporte);

  if (lotesAsociados.length === 0) {
    return (
      <div className="GraficoCumplimiento">
        <p className="GraficoCumplimiento__titulo">
          Concentración (mg/kg) en alimento medicado según planta de alimento
          correspondiente al lote utilizado en pisciculturas de origen
        </p>
        <div className="GraficoCumplimiento__contenedor_grafico">
          <div className="GraficoCumplimiento__contenedor_grafico__error">
            Sin datos disponibles para el periodo seleccionado
          </div>
        </div>
      </div>
    );
  }

  const lotesEjercicio = lotesAsociados;

  // Agrupar por planta los lotes del ejercicio
  const cumplimientosPorPlanta = plantasAsociadas.map((planta) => {
    const datos = datosAlimentoLotesAsociados
      .filter((v) => v[colPlanta] === planta)
      .map((obj) => obj[colCumplimiento] * 100);
    return {
      nombre: planta,
      cumplimiento: datos,
      promedio: mean(datos),
      ...iqrValues(datos),
      min: Math.min(...datos),
      max: Math.max(...datos),
    };
  });

  const minFechasLotes = new Date(
    selectMinMaxFecha(
      datosAlimentoLotesAsociados.map((v) => v[colFechaAlimento])
    )[0]
  );
  const primerDiaDelMes = new Date(
    [
      minFechasLotes.getMonth() + 1,
      "01",
      minFechasLotes.getFullYear() - 1,
    ].join("-")
  );

  const cumplimientosEmpresa = [];
  const cumplimientosIndustria = [];

  datosAlimentoHistorico.forEach((fila) => {
    if (
      esMayorQueFecha(fila[colFechaAlimento], primerDiaDelMes) &&
      esMenorQueFecha(fila[colFechaAlimento], minFechasLotes) &&
      !lotesEjercicio.includes(fila[colLoteAlimento])
    ) {
      // Obtener cumplimientos historicos de empresa que no incluyan estos lotes
      if (fila[colEmpresaAlimento] === nombreEmpresa.value) {
        cumplimientosEmpresa.push(fila[colCumplimiento] * 100);
      } else {
        cumplimientosIndustria.push(fila[colCumplimiento] * 100);
      }
    }
  });

  const datosEmpresa = {
    nombre: nombreEmpresa.value,
    promedio: mean(cumplimientosEmpresa),
    ...iqrValues(cumplimientosEmpresa),
    max: Math.max(...cumplimientosEmpresa),
    min: Math.min(...cumplimientosEmpresa),
  };
  // const datosIndustria = {
  //   nombre: "Industria",
  //   promedio:
  //     cumplimiento.prom !== ""
  //       ? cumplimiento.prom
  //       : mean(cumplimientosIndustria),
  //   ...(cumplimiento.q2 !== ""
  //     ? iqrValuesFixed(cumplimiento.q2, cumplimiento.q3, cumplimiento.q4)
  //     : iqrValues(cumplimientosIndustria)),
  //   max:
  //     cumplimiento.max !== ""
  //       ? cumplimiento.max
  //       : Math.max(...cumplimientosIndustria),
  //   min:
  //     cumplimiento.min !== ""
  //       ? cumplimiento.min
  //       : Math.min(...cumplimientosIndustria),
  // };

  const datos = [datosEmpresa, ...cumplimientosPorPlanta]; //datosIndustria,, ...datosPorLote];

  const vMax = Math.ceil(datos.reduce((max, v) => Math.max(max, v.max), 0));
  const vMin = Math.floor(
    datos.reduce((min, v) => Math.min(min, v.min), Infinity)
  );
  let tick = Math.pow(10, Math.floor(Math.log10(vMin)));
  if (tick <= 0) {
    tick = 10;
  }
  let yMax = Math.max(100, 10 * Math.ceil(vMax / tick));
  // const yMin = Math.min(50, 10 * Math.floor(vMin / tick));
  const yMin = Math.min(50, parseInt(vMin / 10) * 10);
  console.log({
    datos,
    vMax,
    vMin,
    tick,
    yMax,
    yMin,
  });
  const yLineas = [
    ...Array(Math.round(1 + (yMax - yMin) / tick))
      .fill(0)
      .map((_, i) => yMin + tick * i),
  ].reverse();
  yMax = Math.max(...yLineas);

  return (
    <div className="GraficoCumplimiento">
      <p className="GraficoCumplimiento__titulo">
        Concentración (mg/kg) en alimento medicado según planta de alimento
        correspondiente al lote utilizado en pisciculturas de origen
      </p>
      <div className="GraficoCumplimiento__contenedor_grafico">
        <p className="GraficoCumplimiento__etiqueta_eje_y">% de cumplimiento</p>
        <div className="GraficoCumplimiento__contenedor_lineas">
          {yLineas.map((y) => (
            <div key={`lineay-${y}`} className="GraficoCumplimiento__linea">
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
