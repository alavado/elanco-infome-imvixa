import { createSlice } from "@reduxjs/toolkit";
import { mean, std } from "../../components/Reporte/utilitiesReporte";
import { diasAtras, formatearFecha, onlyUnique } from "./utilities";
import { min as minDate } from 'date-fns'
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
  colUTAs,
  tipoFreshWater,
} from "../../constants";
const slice = createSlice({
  name: "reporteCentro",
  initialState: {
    nombreEmpresa: null,
    centro: null,
    fecha: null,
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
    cargarDatosCentro(state, action) {
      state.datosPeces = action.payload.datosPeces;
      state.datosAlimento = action.payload.datosAlimento;
      state.datosTratamiento = action.payload.datosTratamiento;
      state.datosSeleccionParametros = action.payload.datosTratamiento.filter(
        (fila) => fila[colSampleOriginTrat] === tipoSeaWater
      );
    },
    procesarReporteCentro(state) {
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
      const diaVisita = new Date(state.fecha.value).addDays(1);
      const unAñoDesdeVisita = diasAtras(diaVisita, 365);

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
            console.log({
              aDate,
              fecha: fila[colFechaTerminoTrat]
            })
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

        console.log({
          fechasLastTrat
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
        .map((filaTratamiento) => {
          const lotes = [];
          [colLote1Trat, colLote2Trat, colLote3Trat, colLote4Trat].forEach(
            (v) => {
              if (filaTratamiento[v]) {
                lotes.push(filaTratamiento[v].toString());
              }
            }
          );
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
                [colPesoInicialTrat]: filaTratamiento[colPesoInicialTrat],
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
    },
  },
});

export const {
  guardarNombreEmpresa,
  guardarCentro,
  guardarFecha,
  cargarDatosCentro,
  procesarReporteCentro,
} = slice.actions;

export default slice.reducer;
