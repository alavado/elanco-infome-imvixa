import { createSlice } from "@reduxjs/toolkit";
import { iqrValues, iqrValuesFixed, mean, std } from "../../components/Reporte/utilitiesReporte";
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
  colPeso2,
  colCumplimiento,
  colConcentracionObjetivo,
  colFechaAlimento,
  colEmpresaAlimento,
  colAlimentoM1,
  colAlimentoM2,
  colAlimentoM3,
  colAlimentoM4,
} from "../../constants";
import { esMayorQueFecha, esMenorQueFecha, formatearFecha, onlyUnique, selectMinMax, selectMinMaxFecha } from "./utilities";

const slice = createSlice({
  name: "reporteMusculo",
  initialState: {
    empresa: null,
    nombreEmpresa: null,
    piscicultura: null,
    pisciculturaValue: null,
    fecha: null,
    fechaValue: null,
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
    datosAlimentoLotesAsociados: [], 
    initialRepElanco: "",
    initialRepVisita: "",
    initialRepCliente: "",
    initialGrupo: "",
    initialEstanques: "",
    initialPeces: "",
    initialAlimento: "",
    ta_pmv: "",
    ta_peso: "",
    ta_lotes: "",
    ta_plantas: "",
    ta_coppmv: "",
    ta_inclusion: "",
    ta_fini: "",
    ta_fterm: "",
    ta_foto: "",
    ta_cd: "",
    datosGComp: null,
    datosGCumpl: null,
    comentarios: []
  },
  reducers: {
    guardarNombreEmpresa(state, action) {
      state.nombreEmpresa = action.payload;
      if (action.payload !== null) {
        if (!state.filtros.includes(colEmpresa)) {
          state.filtros = [...state.filtros, colEmpresa];
        }
        state.initialRepElanco = ""
        state.initialRepVisita = ""
        state.initialRepCliente = ""
        state.initialGrupo = ""
        state.initialEstanques = ""
        state.initialPeces = ""
        state.initialAlimento = ""
      } else {
        state.filtros = state.filtros.filter((v) => v !== colEmpresa);
      }
    },
    guardarPiscicultura(state, action) {
      state.piscicultura = action.payload;
      if (action.payload !== null) {
        if (!state.filtros.includes(colPiscicultura)) {
          state.filtros = [...state.filtros, colPiscicultura];
        }
        state.initialRepElanco = ""
        state.initialRepVisita = ""
        state.initialRepCliente = ""
        state.initialGrupo = ""
        state.initialEstanques = ""
        state.initialPeces = ""
        state.initialAlimento = ""
      } else {
        state.filtros = state.filtros.filter((v) => v !== colPiscicultura);
      }
    },
    guardarFecha(state, action) {
      state.fecha = action.payload;
      if (action.payload !== null) {
        if (!state.filtros.includes(colFecha)) {
          state.filtros = [...state.filtros, colFecha];
        }
        state.initialRepElanco = ""
        state.initialRepVisita = ""
        state.initialRepCliente = ""
        state.initialGrupo = ""
        state.initialEstanques = ""
        state.initialPeces = ""
        state.initialAlimento = ""
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
    procesarDatosParaExportar(state, action) {
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
        const muestras = datosEjercicioPorInforme.map((v) => v[colPPB]).filter(v => v);
        const pesos = datosEjercicioPorInforme.map(v => v[colPeso2]).filter(v => v)
        const prom = mean(muestras);
        const cv = Math.round((std(muestras) / prom) * 10000) / 100;
        const min = Math.min(...muestras);
        const max = Math.max(...muestras);
        const resultado =
          prom < parseInt(state.umbral.replace(".", ""))
          ? 0
          : prom >= state.umbral && cv >= 30
            ? 1
            : 2;
        while (muestras.length < 10) {
          muestras.push("-");
        }
        datosPorInforme.push({
          [colInformePeces]: informe,
          [colInformePecesR]: datosEjercicioPorInforme[0][colInformePecesR],
          [colEstanquePeces]: datosEjercicioPorInforme[0][colEstanquePeces],
          [colPeso2]: mean(pesos),
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
                [colPesoInicialTrat]: filaTratamiento[colPesoInicialTrat] ? filaTratamiento[colPesoInicialTrat] : datos[colPeso2],
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
            [colPesoInicialTrat]: filaTratamiento[colPesoInicialTrat] ? filaTratamiento[colPesoInicialTrat] : datos[colPeso2],
            pmv: filaTratamiento[colPMVTrat],
            lotes: lotes,
            alimento: filasAlimento,
          };
        } else {
          return datos
        }
      });
      state.datosEjercicio = datosPorInforme
      state.empresa = state.nombreEmpresa.value
      state.pisciculturaValue = state.piscicultura.value
      state.fechaValue = state.fecha.value
      // state.plantasAsociadas = [...plantasAsociadas]
      // state.datosAlimentoLotesAsociados = datosAlimentosAsociados
      state.ta_pmv = datosAlimentosAsociados.map(v => v[colRecetaAlimento] ? v[colRecetaAlimento] : '-').filter(onlyUnique).join(' / ')
      state.ta_peso = selectMinMax(datosAlimentosAsociados.map(v => Math.round(v[colPesoInicialTrat]))).filter(onlyUnique).join(' - ')
      state.ta_lotes = datosAlimentosAsociados.map(v => v[colLoteAlimento]).filter(onlyUnique).join(' / ')
      state.ta_plantas = datosAlimentosAsociados.map(v => v[colPlanta]).filter(onlyUnique).join(' / ')
      state.ta_coppmv = datosAlimentosAsociados.map(v => Math.round(v[colConcentracionObjetivo]).toLocaleString("de-DE")).join(' / ')
      state.ta_inclusion = datosAlimentosAsociados.map(v => (v[colCumplimiento] * 100).toLocaleString("de-DE", {
        maximumFractionDigits: 1,
        minimumFractionDigits: 1,
      })).join(' / ')
      state.ta_fini = selectMinMaxFecha(datosAlimentosAsociados.map(v => v[colFechaInicioTrat]).filter(v => v)).filter(onlyUnique).join(' - ') || 'Sin información'
      state.ta_fterm = selectMinMaxFecha(datosAlimentosAsociados.map(v => v[colFechaTerminoTrat]).filter(v => v)).filter(onlyUnique).join(' - ') || 'Sin información'
      state.ta_foto =  selectMinMaxFecha(datosAlimentosAsociados.map(v => v[colFechaVeranoTrat]).filter(v => v)).filter(onlyUnique).join(' - ') || 'Sin información'
      state.ta_cd = datosAlimentosAsociados.map(v => v[colDestinoTrat]).filter(onlyUnique).join(' / ')
      state.datosGComp = datosPorInforme.map(fila => {
        const muestras = fila["muestras"].filter(v => v !== "-").map(v => v / 1000)
        return {
          nombre: fila[colEstanquePeces].toString(),
          promedio: fila["prom"] / 1000,
          ...iqrValues(muestras),
          max: fila["max"] / 1000,
          min: fila["min"] / 1000
        }});
        // Armar DatosGCumpl
      state.lotesAsociados = [...lotesAsociados]
      const arrayLotesAsociados = [...lotesAsociados]
      if (arrayLotesAsociados.length === 0) {
        state.datosGCumpl = []
        return
      }
      const { cumplimiento } = action.payload;
      const minFechasLotes = new Date(
        selectMinMaxFecha(
          datosAlimentosAsociados.map((v) => v[colFechaAlimento])
        )[0]
      );
      const primerDiaDelMes = new Date(
        [
          minFechasLotes.getMonth() + 1,
          "01",
          minFechasLotes.getFullYear() - 1,
        ].join("-")
      );
      const datosAlimento = state.datosAlimento.filter((fila) => {
        return (
          esMayorQueFecha(fila[colFechaAlimento], primerDiaDelMes) &&
          esMenorQueFecha(fila[colFechaAlimento], minFechasLotes)
        );
      });
      const cumplimientosEmpresa = datosAlimento.filter(
      (v) =>
        v[colEmpresaAlimento] === state.nombreEmpresa.value &&
        !arrayLotesAsociados.includes(v[colLoteAlimento])
    ).map((obj) => obj[colCumplimiento] * 100);

    const cumplimientosPorPlanta = [...plantasAsociadas].map((planta) => {
      const datos = datosAlimento
        .filter(
          (v) =>
            v[colPlanta] === planta &&
            !arrayLotesAsociados.includes(v[colLoteAlimento])
        )
        .map((obj) => obj[colCumplimiento] * 100);
      return {
        nombre: planta,
        cumplimiento: datos,
      };
    });
    let datosEmpresa = {
      nombre: state.nombreEmpresa.value,
      promedio: mean(cumplimientosEmpresa),
      ...iqrValues(cumplimientosEmpresa),
      max: Math.max(...cumplimientosEmpresa),
      min: Math.min(...cumplimientosEmpresa),
    };
    let datosPlantaIndustria = cumplimientosPorPlanta.map((cumplimientos) => {
      const cumplimientosPlantaIndustria = cumplimientos.cumplimiento;
      return {
        nombre: cumplimientos.nombre,
        promedio:
          cumplimiento.prom !== ""
            ? cumplimiento.prom
            : mean(cumplimientosPlantaIndustria),
        ...(cumplimiento.q2 !== ""
          ? iqrValuesFixed(cumplimiento.q2, cumplimiento.q3, cumplimiento.q4)
          : iqrValues(cumplimientosPlantaIndustria)),
        max:
          cumplimiento.max !== ""
            ? cumplimiento.max
            : Math.max(...cumplimientosPlantaIndustria),
        min:
          cumplimiento.min !== ""
            ? Math.max(cumplimiento.min, Math.min(...cumplimientosPlantaIndustria))
            : Math.min(...cumplimientosPlantaIndustria),
      };
    });

    const datosPorLote = arrayLotesAsociados.map((l) => {
      const filaLote = datosAlimentosAsociados.find(
        (f) => f[colLoteAlimento].toString() === l
      );

      const valuesLote = [
        colAlimentoM1,
        colAlimentoM2,
        colAlimentoM3,
        colAlimentoM4,
      ].filter(v => filaLote[v]).map(
        (muestra) =>
          (filaLote[muestra] * 100) / filaLote[colConcentracionObjetivo]
      );
      return {
        nombre: l,
        promedio: mean(valuesLote),
        ...iqrValues(valuesLote),
        max: Math.max(...valuesLote),
        min: Math.min(...valuesLote),
      };
    });

    if (datosEmpresa.promedio) {
      state.datosGCumpl =[...datosPlantaIndustria, datosEmpresa, ...datosPorLote]
    } else {
      state.datosGCumpl =[...datosPlantaIndustria, ...datosPorLote]
    }
  
    },
    guardarComentarios(state, action) {
      state.comentarios = action.payload;
    },
    guardarAlimento(state, action) {
      state.initialAlimento = action.payload
    },
    guardarEstanques(state, action) {
      state.initialEstanques = action.payload;
    },
    guardarPeces(state, action) {
      state.initialPeces = action.payload;
    },
    guardarGrupo(state, action) {
      state.initialGrupo = action.payload;
    },
    guardarRepElanco(state, action) {
      state.initialRepElanco = action.payload;
    },
    guardarRepVisita(state, action) {
      state.initialRepVisita = action.payload;
    },
    guardarRepCliente(state, action) {
      state.initialRepCliente = action.payload;
    },
    cargarPreViz(state, action) {
      const { nombreEmpresa, datos } = action.payload
      state.empresa = nombreEmpresa
      const {
        pisciculturaValue, 
        fechaValue,
        umbral,
        umbralDestacar,
        datosEjercicio,
        initialRepElanco,
        initialRepVisita,
        initialRepCliente,
        initialGrupo,
        initialEstanques,
        initialPeces,
        initialAlimento,
        ta_pmv,
        ta_peso,
        ta_lotes,
        ta_plantas,
        ta_coppmv,
        ta_inclusion,
        ta_fini,
        ta_fterm,
        ta_foto,
        ta_cd,
        datosGComp,
        datosGCumpl,
        comentarios
      } = datos
      state.pisciculturaValue = pisciculturaValue
      state.fechaValue = fechaValue
      state.umbral = umbral
      state.umbralDestacar = umbralDestacar
      state.datosEjercicio = datosEjercicio
      state.initialRepElanco = initialRepElanco
      state.initialRepVisita = initialRepVisita
      state.initialRepCliente = initialRepCliente
      state.initialGrupo = initialGrupo
      state.initialEstanques = initialEstanques
      state.initialPeces = initialPeces
      state.initialAlimento = initialAlimento
      state.ta_pmv = ta_pmv
      state.ta_peso = ta_peso
      state.ta_lotes = ta_lotes
      state.ta_plantas = ta_plantas
      state.ta_coppmv = ta_coppmv
      state.ta_inclusion = ta_inclusion
      state.ta_fini = ta_fini
      state.ta_fterm = ta_fterm
      state.ta_foto = ta_foto
      state.ta_cd = ta_cd
      state.datosGComp = datosGComp
      state.datosGCumpl = datosGCumpl
      state.comentarios = comentarios
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
  guardarComentarios,
  guardarAlimento,
  guardarEstanques,
  guardarPeces,
  guardarGrupo,
  guardarRepElanco,
  guardarRepVisita,
  guardarRepCliente,
  cargarPreViz
} = slice.actions;

export default slice.reducer;
