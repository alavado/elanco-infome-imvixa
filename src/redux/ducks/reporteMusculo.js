import { createSlice } from "@reduxjs/toolkit";
import { mean, std } from "../../components/Reporte/utilitiesReporte";
import {
  colEmpresaPeces as colEmpresa,
  colPisciculturaPeces as colPiscicultura,
  colFechaPeces as colFecha,
  colInformePeces,
  colPPB,
  colEstanquePeces,
  colSampleOrigin,
  tipoFreshWater,
  colInformePecesRTrat,
  colInformePecesR,
  colInformePecesTrat,
  colPMVTrat,
  colLote1Trat,
  colLote2Trat,
  colLote3Trat,
  colLote4Trat,
  colRecetaAlimento,
  colLoteAlimento,
  colPlanta,
  colPesoInicialTrat,
  colDestinoTrat,
  colFechaTerminoTrat,
  colFechaInicioTrat,
  colFechaVeranoTrat,
  colSampleOriginTrat,
} from "../../constants";
import { formatearFecha } from "./utilities";

const slice = createSlice({
  name: "reporteMusculo",
  initialState: {
    nombreEmpresa: null,
    piscicultura: null,
    fecha: null,
    datosPeces: null,
    datosAlimento: null,
    datosTratamiento: null,
    datosEjercicio: null,
    opcion: null,
    filtros: [], // colEmpresa, colFecha, colPiscicultura
    umbral: localStorage.getItem('umbral'),
    umbralDestacar: localStorage.getItem('umbralDestacar'),
    umbralDestacarModificado: false,
    lotesAsociados: [],
    plantasAsociadas: [],
    datosAlimentoLotesAsociados: []
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
    guardarPiscicultura(state, action) {
      state.piscicultura = action.payload;
      if (action.payload !== null) {
        if (!state.filtros.includes(colPiscicultura))
          state.filtros = [...state.filtros, colPiscicultura];
      } else {
        state.filtros = state.filtros.filter((v) => v !== colPiscicultura);
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
    guardarUmbral(state, action) {
      state.umbral = action.payload;
      if (!state.umbralDestacarModificado) {
        const valor80Porciento = parseInt(action.payload.replace('.','')) * 0.8
        state.umbralDestacar = Math.round((valor80Porciento / 100) * 100).toLocaleString('de-DE')
      }
    },
    guardarUmbralDestacar(state, action) {
      state.umbralDestacar = action.payload;
      state.umbralDestacarModificado = true;
    },
    cargarDatosMusculo(state, action) {
      state.datosPeces = action.payload.datosPeces.filter(
        (fila) => fila[colSampleOrigin] === tipoFreshWater
      );
      state.datosTratamiento = action.payload.datosTratamiento.filter(
        (fila) => fila[colSampleOriginTrat] === tipoFreshWater
        );
      state.datosAlimento = action.payload.datosAlimento;
    },
    procesarDatosParaExportar(state) {
      state.procesandoParaExportar = true;
      // Filtrar datos BD Imvixa según parámetros seleccionados
      const datosEjercicio = state.datosPeces.filter(
        (v) =>
          v[colEmpresa] === state.nombreEmpresa.value &&
          v[colPiscicultura] === state.piscicultura.value &&
          v[colFecha].toString().startsWith(state.fecha.value)
      );
      // Obtener el conjunto mínimo de informes
      const paresInformeReportes = {}
      const paresReportesInformes = {}
      const informes = [
        ...datosEjercicio.reduce(
          (acc, current) => {
            if (current[colInformePeces]) {
              if (current[colInformePecesR]) {
                paresInformeReportes[current[colInformePeces]] = current[colInformePecesR]
                if (current[colInformePecesR] in paresReportesInformes) {
                  paresReportesInformes[current[colInformePecesR]] = current[colInformePeces]
                }
              }
              return acc.add(current[colInformePeces])
            } 
            if (current[colInformePecesR] && !(current[colInformePecesR] in paresReportesInformes)) {
              paresReportesInformes[current[colInformePecesR]] = null
            }
            return acc
          },
          new Set()
        ),
      ];
      // Si es que no hubiese elanco.id busco los reportes
      const reportesSinInformes = Object.keys(paresReportesInformes).filter(k => paresReportesInformes[k])
      const reportesEInformes = [
        ...informes,
        ...reportesSinInformes
      ]
      // Obtener el conjunto mínimo de reportes
      const reportes = [
        ...datosEjercicio.reduce(
          (acc, current) => acc.add(current[colInformePecesRTrat]),
          new Set()
        ),
      ];
      // Por cada informe filtro los datos de la BD Imvixa de ese informe
      let datosPorInforme = [];
      reportesEInformes.forEach((informe) => {
        const datosEjercicioPorInforme = datosEjercicio.filter(
          (fila) => fila[colInformePeces] === informe || fila[colInformePecesR] === informe
        );
        const muestras = datosEjercicioPorInforme.map((v) => v[colPPB]);
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
        datosPorInforme.push({
          [colInformePeces]: informe,
          [colInformePecesR]: datosEjercicioPorInforme[0][colInformePecesR],
          [colEstanquePeces]: datosEjercicioPorInforme[0][colEstanquePeces],
          muestras: muestras,
          prom,
          cv,
          min,
          max,
          resultado,
          pmv: null,
          lotes: [],
          alimento: [],
        });
      });
      // Join peces con bd trat con Sampling date, company elanco id o report.id
      const datosFiltradosTratamiento = state.datosTratamiento.filter(
        (v) =>
          (informes.includes(v[colInformePecesTrat]) ||
            reportes.includes(v[colInformePecesRTrat]))
      );
      // Por cada informe sacar lotes y pmv, si hay más de un lote tener cuidad join por lote
      const lotesAsociados = new Set()
      const plantasAsociadas = new Set()
      const datosAlimentosAsociados = []
      datosPorInforme = datosPorInforme.map((datos) => {
        const filaTratamiento = datosFiltradosTratamiento.find(
          (v) =>
            datos[colInformePeces] === v[colInformePecesTrat] ||
            datos[colInformePecesR] === v[colInformePecesRTrat]
        );
        const lotes = []
        if (filaTratamiento) {
          [colLote1Trat, colLote2Trat, colLote3Trat, colLote4Trat].forEach((v) => {
            if (filaTratamiento[v]) {
              lotes.push(filaTratamiento[v].toString());
            }
          });
          // hacer join con alimento
          const filasAlimento = state.datosAlimento.filter(
            (fila) =>
            (fila[colRecetaAlimento] &&  filaTratamiento[colPMVTrat] && fila[colRecetaAlimento].toString() === filaTratamiento[colPMVTrat].toString()) ||
             (fila[colLoteAlimento] && lotes.includes(fila[colLoteAlimento].toString()))
          );
          filasAlimento.forEach(v => {
            if (!lotesAsociados.has(v[colLoteAlimento].toString())) {
              datosAlimentosAsociados.push({
                ...v,
                [colPesoInicialTrat]: filaTratamiento[colPesoInicialTrat],
                [colDestinoTrat]: filaTratamiento[colDestinoTrat],
                [colFechaVeranoTrat]: formatearFecha(filaTratamiento[colFechaVeranoTrat]),
                [colFechaInicioTrat]: formatearFecha(filaTratamiento[colFechaInicioTrat]),
                [colFechaTerminoTrat]: formatearFecha(filaTratamiento[colFechaTerminoTrat]),
              })
              lotesAsociados.add(v[colLoteAlimento].toString())
            }
            plantasAsociadas.add(v[colPlanta])
          })
          return {
            ...datos,
            pmv: filaTratamiento[colPMVTrat],
            lotes: lotes,
            alimento: filasAlimento,
          };
        } else {
          return datos
        }
      });
      state.datosEjercicio = datosPorInforme
      state.lotesAsociados = [...lotesAsociados]
      state.plantasAsociadas = [...plantasAsociadas]
      state.datosAlimentoLotesAsociados = datosAlimentosAsociados
    }
  },
});

export const {
  guardarNombreEmpresa,
  guardarPiscicultura,
  guardarFecha,
  guardarUmbral,
  guardarUmbralDestacar,
  cargarDatosMusculo,
  procesarDatosParaExportar,
} = slice.actions;

export default slice.reducer;
