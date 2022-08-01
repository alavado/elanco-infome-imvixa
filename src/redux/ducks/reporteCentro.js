import { createSlice } from "@reduxjs/toolkit";
import { mean, std } from "../../components/Reporte/utilitiesReporte";
import { diasAtras, formatearFecha, onlyUnique } from "./utilities";
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
      state.datosTratamiento = action.payload.datosTratamiento
      state.datosSeleccionParametros = action.payload.datosTratamiento.filter(
        (fila) => fila[colSampleOriginTrat] === tipoSeaWater
      );
    },
    procesarReporteCentro(state) { 
      state.procesando = true
      // Filtrar datos de BD Trat segun parametros para agarrar el centro e informes
      const datosEjercicio = state.datosTratamiento.filter(
        (v) =>
          v[colEmpresa] === state.nombreEmpresa.value &&
          v[colCentro] === state.centro.value &&
          v[colFecha].toString().startsWith(state.fecha.value)
      );
      const informesEjercicio = datosEjercicio.map(f => f[colInformePecesTrat])
      const reportesEjercicio = datosEjercicio.map(f => f[colInformePecesRTrat])
      // Primer Join Tratamiento-Peces incluye ambos ID solo muestras en SW del día de visita
      const datosPecesEjercicio = state.datosPeces.filter(
        (v) =>
        v[colSampleOriginTrat] === tipoSeaWater &&
        (informesEjercicio.includes(v[colInformePeces]) ||
        reportesEjercicio.includes(v[colInformePecesR]))
      );
      // Buscar pisciculturas de origen
      const pisciculturasOrigen = datosPecesEjercicio.map(f => f[colPisciculturaPeces]).filter(onlyUnique)
      // Buscar en peces de máximo un año antes de la fecha de visita en esa piscicultura
      const diaVisita = new Date(state.fecha.value).addDays(1)
      const unAñoDesdeVisita = diasAtras(diaVisita, 365)
      // las muestras en FW y SW
      const muestrasEjercicio = state.datosPeces.filter(
        (f) => {
          if (pisciculturasOrigen.includes(f[colPisciculturaPeces])) {
            const fechaFila = new Date(f[colFechaPeces])
            const estaEnPeriodo = fechaFila >= unAñoDesdeVisita && fechaFila <= diaVisita 
            // console.log({
            //   estaEnPeriodo,
            //   unAñoDesdeVisita,
            //   fechaFila,
            //   diaVisita,
            //   fechaInferior: fechaFila >= unAñoDesdeVisita,
            //   fechasuperior: fechaFila <= diaVisita,
            //   fecha: state.fecha.value,
            //   piscicultura: f[colPisciculturaPeces]
            // })
            return estaEnPeriodo
          }
          return false 
        })
      // Obtener el conjunto mínimo de informes de FW y SW
      const paresInformeReportes = {}
      const paresReportesInformes = {}
      const informes = [
        ...muestrasEjercicio.reduce(
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
     // Por cada informe FW filtro los datos de la BD Imvixa de ese informe
     let datosPorInforme = [];
     reportesEInformes.forEach((informe) => {
       const datosEjercicioPorInforme = muestrasEjercicio.filter(
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
         [colPisciculturaPeces]: datosEjercicioPorInforme[0][colPisciculturaPeces],
         fecha: datosEjercicioPorInforme[0][colFechaPeces],
         muestras: muestras,
         prom,
         cv,
         min,
         max,
         resultado,
         pmv: null,
         lotes: [],
         alimento: [],
         [colSampleOrigin]: datosEjercicioPorInforme[0][colSampleOrigin]
       });
     });

      const lotesAsociados = new Set()
      const plantasAsociadas = new Set()
      const datosAlimentosAsociados = []
      datosPorInforme = datosPorInforme.map((datos) => {
        const filaTratamiento = datosEjercicio.find(
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
      state.datosPorInforme = datosPorInforme
      state.datosMuestrasSWFW = muestrasEjercicio
      state.lotesAsociados = [...lotesAsociados]
      state.plantasAsociadas = [...plantasAsociadas]
      state.datosAlimentoLotesAsociados = datosAlimentosAsociados
    }
	}
})

export const {
  guardarNombreEmpresa,
  guardarCentro,
  guardarFecha,
  cargarDatosCentro,
  procesarReporteCentro
} = slice.actions;

export default slice.reducer;