import { createSlice } from "@reduxjs/toolkit";
import { mean, std, iqrValues, iqrValuesFixed } from "../../components/Reporte/utilitiesReporte";
import { diasAtras, formatearFecha, onlyUnique, selectMinMaxFecha, esMayorQueFecha, esMenorQueFecha } from "./utilities";
import { min as minDate, compareAsc } from 'date-fns'
import {
  colEmpresaTrat as colEmpresa,
  colDestinoTrat as colCentro,
  colFechaTrat as colFecha,
  tipoSeaWater,
  colSampleOrigin,
  colSampleOriginTrat,
  colInformePeces,
  colInformePecesTrat,
  colInformePecesR,
  colEstanquePeces,
  colInformePecesRTrat,
  colLote1Trat,
  colLote2Trat,
  colLote3Trat,
  colLote4Trat,
  colRecetaAlimento,
  colLoteAlimento,
  colPMVTrat,
  colPesoInicialTrat,
  colDestinoTrat,
  colFechaVeranoTrat,
  colFechaInicioTrat,
  colFechaTerminoTrat,
  colPlanta,
  colPPB,
  colPisciculturaPeces,
  colFechaPeces,
  tipoFreshWater,
  colPeso2,
  colEmpresaPeces,
  colFechaAlimento,
  colEmpresaAlimento,
  colCumplimiento,
} from "../../constants";

let defaultGraficoUtas = {
  coef: -0.001,
  aInf: 1512.2,
  aEst: 8228.1,
  aSup: 44769
}

let defaultGraficoPeso = {
  coefInf: -1.47786927,
  aInf: 4 * Math.pow(10,6),
  coefEst: -1.4790,
  aEst: 1 * Math.pow(10,7),
  coefSup: -1.4757,
  aSup: 30656311.0721
}

const slice = createSlice({
  name: "reporteCentro",
  initialState: {
    empresa: null,
    nombreEmpresa: null,
    centro: null,
    seasite: null,
    fecha: null,
    fechaValor: null,
    datosTratamiento: null,
    datosAlimento: null,
    datosPeces: null,
    filtros: [],
    procesando: false,
    datosSeleccionParametros: null,
    datosMuestrasSWFW: [],
    datosPorInforme: [],
    lotesAsociados: [],
    informesSWFW: null,
    informesSW: null,
    informesFW: null,
    plantasAsociadas: [],
    datosAlimentoLotesAsociados: [],
    parametrosGraficoUTAs: defaultGraficoUtas,
    parametrosGraficoPeso: defaultGraficoPeso,
    mostrandoModalConf: false,
    comentarios: [],
    datosGraficoComparacion: null,
    datosGraficoCumplimiento: null,
    grupos: [],
    fechas: [],
    repElanco: "",
    repVisita: "",
    repCliente: ""
  },
  reducers: {
    guardarNombreEmpresa(state, action) {
      state.nombreEmpresa = action.payload;
      if (action.payload !== null) {
        if (!state.filtros.includes(colEmpresa)) {
          state.filtros = [...state.filtros, colEmpresa];
        }
      } else {
        state.filtros = state.filtros.filter((v) => v !== colEmpresa);
      }
    },
    guardarCentro(state, action) {
      state.centro = action.payload;
      if (action.payload !== null) {
        if (!state.filtros.includes(colCentro))
          state.filtros = [...state.filtros, colCentro];
      } else {
        state.filtros = state.filtros.filter((v) => v !== colCentro);
      }
    },
    guardarFecha(state, action) {
      state.fecha = action.payload;
      if (action.payload !== null) {
        if (!state.filtros.includes(colFecha))
          state.filtros = [...state.filtros, colFecha];
      } else {
        state.filtros = state.filtros.filter((v) => v !== colFecha);
      }
    },
    guardarFechas(state, action) {
      state.fechas = action.payload
    },
    guardarGrupos(state, action) {
      state.grupos = action.payload
    },
    guardarRepElanco(state, action) {
      state.repElanco = action.payload
    },
    guardarRepCliente(state, action) {
      state.repCliente = action.payload
    },
    guardarRepVisita(state, action) {
      state.repVisita = action.payload
    },
    cargarDatosCentro(state, action) {
      state.datosPeces = action.payload.datosPeces;
      state.datosAlimento = action.payload.datosAlimento;
      state.datosTratamiento = action.payload.datosTratamiento;
      state.datosSeleccionParametros = action.payload.datosTratamiento.filter(
        (fila) => fila[colSampleOriginTrat] === tipoSeaWater
      );
    },

    procesarReporteCentro(state, action) {
      state.procesando = true;
      // Filtrar datos de BD Trat segun parametros para agarrar el centro e informes
      const datosTratamientoDestino = state.datosTratamiento.filter(
        (v) => v[colCentro] === state.centro.value
      );

      const informesTratamientoDestino = datosTratamientoDestino.map(
        (f) => f[colInformePecesTrat] || f[colInformePecesRTrat]
      );

      // Primer Join Tratamiento-Peces incluye todos los potenciales cruces
      const datosPecesTratamientoDestino = state.datosPeces.filter(
        (v) =>
          informesTratamientoDestino.includes(v[colInformePeces]) ||
          informesTratamientoDestino.includes(v[colInformePecesR])
      );
      // Ya filtre por centro, para asegurar filtro por empresa y fecha
      const datosTratEjercicio = datosTratamientoDestino.filter(
        (v) =>
          v[colSampleOriginTrat] === tipoSeaWater &&
          v[colEmpresa] === state.nombreEmpresa.value &&
          v[colFecha].toString().startsWith(state.fecha.value)
      );

      // Buscar en peces de máximo un año antes de la fecha de visita en esa piscicultura
      const diaVisita = new Date(state.fecha.value).addDays(2);
      const unAñoDesdeVisita = diasAtras(diaVisita, 367);

      const setInformesSWFW = new Set();
      const setInformesFW = new Set();
      const setInformesSW = new Set();

      const newDatosPorInforme = datosTratEjercicio.map((datos) => {
        // Filtro los que tienen mismo codigo de informe
        const datosJoin = datosPecesTratamientoDestino.filter(
          (v) =>
            datos[colInformePecesTrat] === v[colInformePeces] ||
            datos[colInformePecesRTrat] === v[colInformePecesR]
        );
        // Obtengo todas las pisciculturas de origen correspondiente a los informes del ejercicio
        const hatcheries = datosJoin
          .map((fila) => fila[colPisciculturaPeces])
          .filter(v => v)
          .filter(onlyUnique);
        
        // Filtro los que tienen el mismo origen y estan en el periodo
        const datosFWSW = datosPecesTratamientoDestino.filter((fila) => {
          if (hatcheries.includes(fila[colPisciculturaPeces])) {
            const fechaFila = new Date(fila[colFechaPeces]);
            const estaEnPeriodo =
              fechaFila >= unAñoDesdeVisita && fechaFila <= diaVisita;
            return estaEnPeriodo;
          }
          return false;
        });
        const informesFWSW = datosFWSW.map(
          (fila) => fila[colInformePecesTrat] || fila[colInformePecesRTrat]
        );
        datosFWSW.forEach((fila) => {
          if (fila[colSampleOrigin] === tipoFreshWater) {
            setInformesFW.add(
              fila[colInformePecesTrat] || fila[colInformePecesRTrat]
            );
          }
          if (fila[colSampleOrigin] === tipoSeaWater) {
            setInformesSW.add(
              fila[colInformePecesTrat] || fila[colInformePecesRTrat]
            );
          }
          setInformesSWFW.add(
            fila[colInformePecesTrat] || fila[colInformePecesRTrat]
          );
        });
        const datosTratFWSW = datosTratamientoDestino.filter(
          (v) =>
            informesFWSW.includes(v[colInformePeces]) ||
            informesFWSW.includes(v[colInformePecesR])
        );
        const muestras = datosJoin.map((v) => v[colPPB]);
        const prom = mean(muestras);
        const cv = Math.round((std(muestras) / prom) * 10000) / 100;
        const min = Math.min(...muestras);
        const max = Math.max(...muestras);
        const resultado =
          prom >= state.umbral && cv <= 30
            ? 2
            : prom >= state.umbral && cv >= 30
            ? 1
            : 0;
        while (muestras.length < 10) {
          muestras.push("-");
        }
        // Elegir el tratamiento más antiguo
        const fechasLastTrat = []
        datosTratFWSW.forEach(fila => {
          try {
            const aDate = new Date(fila[colFechaTerminoTrat])
            if ((aDate !== "Invalid Date") && !isNaN(aDate)) {
              fechasLastTrat.push(aDate)
            }
          }
          catch (e) {
            console.log({
              error: fechasLastTrat
            })
          }
        })

        return {
          ...datos,
          muestras,
          prom,
          cv,
          min,
          max,
          resultado,
          pmv: null,
          lotes: [],
          alimento: [],
          // muestras de los informes especificos
          datosMuestrasPeces: datosJoin,
          pisciculturasOrigen: hatcheries,
          datosFWSW,
          datosTratFWSW,
          [colFechaTerminoTrat]: fechasLastTrat.length === 0  ? undefined : minDate(fechasLastTrat),
          [colEstanquePeces]: datosJoin[0][colEstanquePeces]
        };
      });
      const lotesAsociados = new Set();
      const plantasAsociadas = new Set();
      const datosAlimentosAsociados = [];

      // Filtro los informes de FW
      datosTratamientoDestino
        .filter((fila) =>
          setInformesFW.has(
            fila[colInformePecesTrat] || fila[colInformePecesRTrat]
          )
        )
        .forEach((filaTratamiento) => {
          const lotes = [];
          [colLote1Trat, colLote2Trat, colLote3Trat, colLote4Trat].forEach(
            (v) => {
              if (filaTratamiento[v]) {
                lotes.push(filaTratamiento[v].toString());
              }
            }
          );
          // get datos peso
          const inf = filaTratamiento[colInformePecesTrat] || filaTratamiento[colInformePecesRTrat]
          const datInf = datosPecesTratamientoDestino.filter(v => v[colInformePeces] === inf || v[colInformePecesR] === inf)
          const infoPeso = mean(datInf.map(v => v[colPeso2]).filter(v => v))
          // hacer join con alimento
          const filasAlimento = state.datosAlimento.filter( 
            (fila) =>
              (fila[colRecetaAlimento] &&
                filaTratamiento[colPMVTrat] &&
                fila[colRecetaAlimento].toString() ===
                  filaTratamiento[colPMVTrat].toString()) ||
              (fila[colLoteAlimento] &&
                lotes.includes(fila[colLoteAlimento].toString()))
          )
          filasAlimento.forEach((v) => {
            if (!lotesAsociados.has(v[colLoteAlimento].toString())) {
              datosAlimentosAsociados.push({
                ...v,
                [colPesoInicialTrat]: filaTratamiento[colPesoInicialTrat] || infoPeso,
                [colDestinoTrat]: filaTratamiento[colDestinoTrat],
                [colFechaVeranoTrat]: formatearFecha(
                  filaTratamiento[colFechaVeranoTrat]
                ),
                [colFechaInicioTrat]: formatearFecha(
                  filaTratamiento[colFechaInicioTrat]
                ),
                [colFechaTerminoTrat]: formatearFecha(
                  filaTratamiento[colFechaTerminoTrat]
                ),
              });
              lotesAsociados.add(v[colLoteAlimento].toString());
            }
            plantasAsociadas.add(v[colPlanta]);
          });
        })
      const datosGeneralesPecesEjercicio = datosPecesTratamientoDestino.filter(
        (fila) =>
          setInformesSWFW.has(fila[colInformePeces]) ||
          setInformesSWFW.has(fila[colInformePecesR])
      );
      state.informesSWFW = setInformesSWFW;
      state.informesSW = setInformesSW;
      state.informesFW = setInformesFW;
      state.datosPorInforme = newDatosPorInforme;
      state.datosMuestrasSWFW = datosGeneralesPecesEjercicio;
      state.lotesAsociados = [...lotesAsociados];
      state.plantasAsociadas = [...plantasAsociadas];
      state.datosAlimentoLotesAsociados = datosAlimentosAsociados;
      state.empresa = state.nombreEmpresa.label
      state.seasite = state.centro.label
      state.fechaValor = state.fecha.value

      // Grafico comparacion
      const { concentracion, language } = action.payload;
      const comparacionEmpresa = [];
      const comparacionIndustria = [];
      const minFechasPeces = minDate(
        state.datosMuestrasSWFW.map((v) => new Date(v[colFechaPeces]))
      );
      const unAñoAtras = diasAtras(minFechasPeces, 366);
      state.datosPeces.forEach((fila) => {
        // Obtener cumplimientos historicos de empresa que no incluyan estos lotes
        if (
          fila[colSampleOrigin] === tipoFreshWater &&
          fila[colFechaPeces] &&
          !setInformesFW.has(fila[colInformePeces] || fila[colInformePecesR]) &&
          fila[colPPB]
        ) {
          try {
            const thisDate = new Date(fila[colFechaPeces]);
            if (
              compareAsc(thisDate, unAñoAtras) &&
              compareAsc(minFechasPeces, thisDate)
            )
              if (fila[colEmpresaPeces] === state.nombreEmpresa.label) {
                comparacionEmpresa.push(fila[colPPB] / 1000);
              } else {
                comparacionIndustria.push(fila[colPPB] / 1000);
              }
          } catch (error) {
            console.log(error);
          }
        }
      });
    
      const datosEmpresa = {
        nombre: state.nombreEmpresa.label,
        promedio: mean(comparacionEmpresa),
        ...iqrValues(comparacionEmpresa),
        max: Math.max(...comparacionEmpresa),
        min: Math.min(...comparacionEmpresa),
      };
    
      const datosIndustria = {
        nombre: language === 'es' ? "Industria" : "Industry",
        promedio:
          concentracion.prom !== ""
            ? concentracion.prom
            : mean(comparacionIndustria),
        ...(concentracion.q2 !== ""
          ? iqrValuesFixed(concentracion.q2, concentracion.q3, concentracion.q4)
          : iqrValues(comparacionIndustria)),
        max:
          concentracion.max !== ""
            ? concentracion.max
            : Math.max(...comparacionIndustria),
        min:
          concentracion.min !== ""
            ? concentracion.min
            : Math.min(...comparacionIndustria),
      };

      const datos = [datosIndustria, datosEmpresa];
      // Obtener datos de los centros de este ejercicio
      const pisciculturasOrigen = state.datosPorInforme
        .map((f) => f["pisciculturasOrigen"])
        .flat(1)
        .filter(onlyUnique);
    
      const datosPisciculturas = [];
      pisciculturasOrigen.forEach((piscicultura) => {
        const muestrasPorPiscicultura = state.datosMuestrasSWFW.filter(
          (fila) => fila[colPisciculturaPeces] === piscicultura && fila[colSampleOrigin] === tipoFreshWater
        );
        if (muestrasPorPiscicultura.length > 0) {
          const muestras = [];
          muestrasPorPiscicultura.forEach((muestrasInforme) => {
            if (muestrasInforme[colPPB]) {
              muestras.push(muestrasInforme[colPPB] / 1000);
            }
          });
    
          datosPisciculturas.push({
            nombre: piscicultura,
            promedio: mean(muestras),
            ...iqrValues(muestras),
            max: Math.max(...muestras),
            min: Math.min(...muestras),
          });
        }
      });
    
      datosPisciculturas.sort((a, b) => a.nombre.localeCompare(b.nombre));
      datos.push(...datosPisciculturas);
      state.datosGraficoComparacion = datos
      // Grafico cumplimiento
      // Agrupar por planta los lotes del ejercicio
      if (lotesAsociados.size === 0) {
        state.datosGraficoCumplimiento = []
      } else {
        const cumplimientosPorPlanta = [...plantasAsociadas].map((planta) => {
          const datos = state.datosAlimentoLotesAsociados
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
            state.datosAlimentoLotesAsociados.map((v) => v[colFechaAlimento])
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
      
        state.datosAlimento.forEach((fila) => {
          if (
            esMayorQueFecha(fila[colFechaAlimento], primerDiaDelMes) &&
            esMenorQueFecha(fila[colFechaAlimento], minFechasLotes) &&
            !state.lotesAsociados.includes(fila[colLoteAlimento])
          ) {
            // Obtener cumplimientos historicos de empresa que no incluyan estos lotes
            if (fila[colEmpresaAlimento] === state.nombreEmpresa.label) {
              cumplimientosEmpresa.push(fila[colCumplimiento] * 100);
            } else {
              cumplimientosIndustria.push(fila[colCumplimiento] * 100);
            }
          }
        });
      
        const datosEmpresaCumplimiento = {
          nombre: state.nombreEmpresa.label,
          promedio: mean(cumplimientosEmpresa),
          ...iqrValues(cumplimientosEmpresa),
          max: Math.max(...cumplimientosEmpresa),
          min: Math.min(...cumplimientosEmpresa),
        };
        state.datosGraficoCumplimiento = [datosEmpresaCumplimiento, ...cumplimientosPorPlanta]; //datosIndustria,, ...datosPorLote];
      }
      state.grupos = newDatosPorInforme.map((v) => "")
      state.fechas = newDatosPorInforme.map((v) => "")
    },
    cargarConfigGraficos(state, action) {
      state.parametrosGraficoUTAs = action.payload.defaultGraficoUtas
      state.parametrosGraficoPeso = action.payload.defaultGraficoPeso
    },
    toggleModal(state) {
      state.mostrandoModalConf = !state.mostrandoModalConf
    },
    guardarComentarios(state, action) {
      state.comentarios = action.payload;
    },
    cargarPreVizCentro(state, action) {
      const { nombreEmpresa, datos } = action.payload
      state.empresa = nombreEmpresa
      const {
          seasite,
          fechaValor,
          datosPorInforme,
          parametrosGraficoPeso,
          parametrosGraficoUTAs,
          datosGraficoComparacion,
          datosGraficoCumplimiento,
          repElanco,
          repCliente,
          repVisita,
          fechas,
          grupos
        } = datos
      state.seasite = seasite
      state.fechaValor = fechaValor
      state.datosPorInforme = datosPorInforme
      state.parametrosGraficoPeso = parametrosGraficoPeso
      state.parametrosGraficoUTAs = parametrosGraficoUTAs
      state.datosGraficoComparacion = datosGraficoComparacion
      state.datosGraficoCumplimiento = datosGraficoCumplimiento
      state.repElanco = repElanco
      state.repCliente = repCliente
      state.repVisita = repVisita
      state.fechas = fechas.map(v => new Date(v))
      state.grupos = grupos
    }
  },
});

export const {
  guardarNombreEmpresa,
  guardarCentro,
  guardarFecha,
  cargarDatosCentro,
  procesarReporteCentro,
  cargarConfigGraficos,
  toggleModal,
  guardarComentarios,
  cargarPreVizCentro,
  guardarFechas,
  guardarGrupos,
  guardarRepElanco,
  guardarRepCliente,
  guardarRepVisita
} = slice.actions;

export default slice.reducer;
