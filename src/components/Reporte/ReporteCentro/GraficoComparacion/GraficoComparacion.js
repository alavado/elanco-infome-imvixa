import React from "react";
import { useSelector } from "react-redux";
import { min, compareAsc } from "date-fns";
import {
  colEmpresaPeces,
  colFechaPeces,
  colInformePeces,
  colInformePecesR,
  colPisciculturaPeces,
  colPPB,
  colSampleOrigin,
  tipoFreshWater,
} from "../../../../constants";
import {
  diasAtras,
  onlyUnique,
} from "../../../../redux/ducks/utilities";
import { iqrValues, iqrValuesFixed, mean } from "../../utilitiesReporte";
import "./GraficoComparacion.css";
import { generalTexts } from '../generalTexts';


const GraficoComparacion = ({ language }) => {
  const {
    // datosMuestrasSWFW,
    // datosPeces,
    // datosPorInforme: datosEjercicio,
    // informesFW,
    // empresa,
    datosGraficoComparacion: datosReadOnly,
  } = useSelector((state) => state.reporteCentro);
  const { concentracion } = useSelector((state) => state.reporte);
  const { gt_GraficoComparacion } = generalTexts
  const { titulo, yaxis, sindatos } = gt_GraficoComparacion[language]
  
  // Obtener los datos historicos
  // const datosEjercicio = datosPorInforme.filter(
  //   (datos) =>
  //     datos[colSampleOrigin] === tipoSeaWater &&
  //     datos["fecha"].toString().startsWith(fecha.value)
  // );
  // Sacar todos los muestreos en el centro en cuestion
  // const informeOReportesEjercicio = datosPorInforme
  //   .filter((datos) => datos[colSampleOrigin] === tipoSeaWater)
  //   .map((v) => v[colInformePeces]);

  // const comparacionEmpresa = [];
  // const comparacionIndustria = [];
  // const minFechasPeces = min(
  //   datosMuestrasSWFW.map((v) => new Date(v[colFechaPeces]))
  // );
  // const unAñoAtras = diasAtras(minFechasPeces, 366);
  // datosPeces.forEach((fila) => {
  //   // Obtener cumplimientos historicos de empresa que no incluyan estos lotes
  //   if (
  //     fila[colSampleOrigin] === tipoFreshWater &&
  //     fila[colFechaPeces] &&
  //     !informesFW.has(fila[colInformePeces] || fila[colInformePecesR]) &&
  //     fila[colPPB]
  //   ) {
  //     try {
  //       const thisDate = new Date(fila[colFechaPeces]);
  //       if (
  //         compareAsc(thisDate, unAñoAtras) &&
  //         compareAsc(minFechasPeces, thisDate)
  //       )
  //         if (fila[colEmpresaPeces] === empresa) {
            
  //           comparacionEmpresa.push(fila[colPPB] / 1000);
  //         } else {
  //           comparacionIndustria.push(fila[colPPB] / 1000);
  //         }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // });

  // const datosEmpresa = {
  //   nombre: empresa,
  //   promedio: mean(comparacionEmpresa),
  //   ...iqrValues(comparacionEmpresa),
  //   max: Math.max(...comparacionEmpresa),
  //   min: Math.min(...comparacionEmpresa),
  // };

  // const datosIndustria = {
  //   nombre: "Industria",
  //   promedio:
  //     concentracion.prom !== ""
  //       ? concentracion.prom
  //       : mean(comparacionIndustria),
  //   ...(concentracion.q2 !== ""
  //     ? iqrValuesFixed(concentracion.q2, concentracion.q3, concentracion.q4)
  //     : iqrValues(comparacionIndustria)),
  //   max:
  //     concentracion.max !== ""
  //       ? concentracion.max
  //       : Math.max(...comparacionIndustria),
  //   min:
  //     concentracion.min !== ""
  //       ? concentracion.min
  //       : Math.min(...comparacionIndustria),
  // };

  // const datos = [datosIndustria, datosEmpresa];
  // Obtener datos de los centros de este ejercicio
  // const pisciculturasOrigen = datosEjercicio
  //   .map((f) => f["pisciculturasOrigen"])
  //   .flat(1)
  //   .filter(onlyUnique);

  // const datosPisciculturas = [];
  // pisciculturasOrigen.forEach((piscicultura) => {
  //   const muestrasPorPiscicultura = datosMuestrasSWFW.filter(
  //     (fila) => fila[colPisciculturaPeces] === piscicultura && fila[colSampleOrigin] === tipoFreshWater
  //   );
  //   if (muestrasPorPiscicultura.length > 0) {
  //     const muestras = [];
  //     muestrasPorPiscicultura.forEach((muestrasInforme) => {
  //       if (muestrasInforme[colPPB]) {
  //         muestras.push(muestrasInforme[colPPB] / 1000);
  //       }
  //     });

  //     datosPisciculturas.push({
  //       nombre: piscicultura,
  //       promedio: mean(muestras),
  //       ...iqrValues(muestras),
  //       max: Math.max(...muestras),
  //       min: Math.min(...muestras),
  //     });
  //   }
  // });

  // datosPisciculturas.sort((a, b) => a.nombre.localeCompare(b.nombre));
  // datos.push(...datosPisciculturas);

  if (datosReadOnly.length === 2) {
    return (
      <div className="GraficoComparacion">
        <p className="GraficoComparacion__titulo">
          {titulo}
        </p>
        <div className="GraficoComparacion__contenedor_grafico">
        <div className="GraficoComparacion__contenedor_grafico__error">
          {sindatos}
          </div>
        </div>
      </div>
    )
  }

  const datos = [...datosReadOnly.map(v => {return {...v}})]
  datos[0]['nombre'] = language === 'es' ? 'Industria' : 'Industry'
  datos[1]['nombre'] = language === 'es' ? 'Empresa' : 'Company'
  const vMax = Math.ceil(datos.reduce((max, v) => Math.max(max, v.max), 0));

  const tick = vMax > 25 ? 5 : 2;
  let yMax = Math.max(12, Math.ceil(vMax + tick));
  const yMin = 0;

  const yLineas = [
    ...Array(Math.round(1 + (yMax - yMin) / tick))
      .fill(0)
      .map((_, i) => yMin + tick * i),
  ].reverse();
  yMax = Math.max(...yLineas);

  return (
    <div className="GraficoComparacion">
      <p className="GraficoComparacion__titulo">
        {titulo}
      </p>
      <div className="GraficoComparacion__contenedor_grafico">
        <p className="GraficoComparacion__etiqueta_eje_y" style={{left: language === 'es'? '-4rem' : '-5rem'}}>{yaxis}</p>
        <div className="GraficoComparacion__contenedor_lineas">
          {yLineas.map((y) => (
            <div
              key={`compc-lineay-${y}`}
              className="GraficoComparacion__linea"
            >
              <p className="GraficoComparacion__etiqueta_linea">
                {y.toLocaleString(language)}
              </p>
            </div>
          ))}
        </div>
        {datos.map((d) => {
          if (d.promedio === 0 || !d.promedio) {
            return (
                <div key={`caja-cc-${d.nombre}`} className="GraficoComparacion__contenedor_caja">
                  <div className="GraficoComparacion__si">{sindatos}</div>
                <div className="GraficoComparacion__etiqueta_caja">
                  {d.nombre.split(' ').map((n, i) => <div key={`${d.nombre}-${i}`}>{n}</div>)}
                </div>
              </div>
            )
          }
          return (
          <div
            key={`compc-caja-${d.nombre}`}
            className="GraficoComparacion__contenedor_caja"
          >
            <div
              className="GraficoComparacion__bigote"
              style={{
                "--porcentaje-top": `${
                  ((yMax - d.max) / (yMax - yMin)) * 100
                }%`,
                height: `${((d.max - d.min) / (yMax - yMin)) * 100}%`,
              }}
            />
            <div
              className="GraficoComparacion__caja"
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
                fontSize:
                  datos.length < 5
                    ? ".85rem"
                    : datos.length < 10
                    ? ".70rem"
                    : ".55rem",
              }}
            >
              {d.promedio.toLocaleString(language, {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
              })}
            </div>
            <div className="GraficoComparacion__etiqueta_caja">
              {d.nombre.split(" ").map((n, i) => (
                <div key={`compc-${d.nombre}-${i}`}>{n}</div>
              ))}
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default GraficoComparacion;
