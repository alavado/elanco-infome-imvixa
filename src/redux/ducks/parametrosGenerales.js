import { createSlice } from "@reduxjs/toolkit";
import { reportes } from "../../helpers/reportes";
import { localeSort } from "./utilities";
import { colEmpresaAlimento, colPisciculturaAlimento, colFechaAlimento, colFechaPeces, colFechaTrat } from "../../constants";

const slice = createSlice({
  name: "parametrosGenerales",
  initialState: {
    validando: {
      alimento: false,
      eficacia: false,
      // tratamiento: false,
      peces: false,
    },
    pasoActual: 0,
    planillaAlimento: "",
    planillaTratamiento: "",
    planillaPeces: "",
    planillaEficacia: "",
    empresas: [],
    pisciculturas: [],
    todasLasPlanillas: false,
    errorFormulario: null,
    datosAlimento: null,
    datosPeces: null,
    datosTratamiento: null,
    datosEficacia: null,
    reporte: null,
  },
  reducers: {
    estaValidando(state, action) {
      state.validando = {
        ...state.validando,
        ...action.payload,
      };
    },
    pasoSiguiente(state) {
      if (state.pasoActual < 3) {
        state.pasoActual += 1;
        state.errorFormulario = null;
      }
    },
    pasoAnterior(state) {
      if (state.pasoActual > 0) {
        state.pasoActual -= 1;
        state.errorFormulario = null;
      }
    },
    guardarPlanillaAlimento(state, action) {
      state.planillaAlimento = action.payload.path;
      const datos = [];
      action.payload.datos.forEach(r => {
        datos.push({
          ...r,
          [colFechaAlimento] : new Date(r[colFechaAlimento]).toISOString()
        })
      }) 
      let objPisciculturas = {}
      action.payload.datos
      .forEach((r) => {
        if (!(r[colEmpresaAlimento] in objPisciculturas)) {
          objPisciculturas[r[colEmpresaAlimento]] = new Set()
        }
        objPisciculturas[r[colEmpresaAlimento]].add(r[colPisciculturaAlimento])
      })
      state.datosAlimento = datos;
      let empresas = localeSort(Object.keys(objPisciculturas));
      empresas.forEach(e => {
        objPisciculturas[e] = localeSort([...objPisciculturas[e]]).map((v) => {
          return { value: v, label: v };
        })
      })
      state.pisciculturas = objPisciculturas
      state.empresas = [
        //{ value: "Todas", label: "Todas" },
        ...empresas.map((v) => {
          return { value: v, label: v };
        }),
      ];
      if (
        state.planillaEficacia !== "" &&
        state.planillaPeces !== ""
        // state.planillaTratamiento !== ""
      ) {
        state.todasLasPlanillas = true;
      }
      state.errorFormulario = null;
    },
    guardarPlanillaTratamiento(state, action) {
      state.planillaTratamiento = action.payload.path;
      state.datosTratamiento = action.payload.datos;
      if (
        state.planillaEficacia !== "" &&
        state.planillaAlimento !== "" &&
        state.planillaPeces !== ""
      ) {
        state.todasLasPlanillas = true;
      }
      state.errorFormulario = null;
    },
    guardarPlanillaPeces(state, action) {
      state.planillaPeces = action.payload.path;
      const datosTratamiento = [];
      action.payload.datos.datosTratamiento.forEach(r => {
        datosTratamiento.push({
          ...r,
          [colFechaTrat] : new Date(r[colFechaTrat]).toISOString()
        })
      });
      state.datosTratamiento = datosTratamiento;
      const datosPeces = [];
      action.payload.datos.datosPeces.forEach(r => {
        datosPeces.push({
          ...r,
          [colFechaPeces] : new Date(r[colFechaPeces]).toISOString()
        })
      })
      state.datosPeces = datosPeces;
      if (
        state.planillaEficacia !== "" &&
        state.planillaAlimento !== ""
        // state.planillaTratamiento !== ""
        ) {
          state.todasLasPlanillas = true;
        }
      state.errorFormulario = null;
    },
    guardarPlanillaEficacia(state, action) {
      state.planillaEficacia = action.payload.path;
      state.datosEficacia = action.payload.datos;
      if (
        state.planillaPeces !== "" &&
        state.planillaAlimento !== ""
        // state.planillaTratamiento !== ""
      ) {
        state.todasLasPlanillas = true;
      }
      state.errorFormulario = null;
    },
    mostrarErrorFormulario(state, action) {
      state.errorFormulario = action.payload;
    },
    limpiarFormularioAlimento(state, action) {
      state.todasLasPlanillas = false;
      state.planillaAlimento = "";
      state.datosAlimento = [];
      state.validando = {
        ...state.validando,
        alimento: false,
      };
      localStorage.removeItem("planillaAlimento");
    },
    limpiarFormularioTratamiento(state, action) {
      state.todasLasPlanillas = false;
      state.planillaTratamiento = "";
      state.datosTratamiento = [];
      state.validando = {
        ...state.validando,
        tratamiento: false,
      };
      localStorage.removeItem("planillaTratamiento");
    },
    limpiarFormularioPeces(state, action) {
      state.todasLasPlanillas = false;
      state.planillaPeces = "";
      state.datosPeces = [];
      state.validando = {
        ...state.validando,
        peces: false,
      };
      localStorage.removeItem("planillaPeces");
    },
    limpiarFormularioEficacia(state, action) {
      state.todasLasPlanillas = false;
      state.planillaEficacia = "";
      state.datosEficacia = [];
      state.validando = {
        ...state.validando,
        eficacia: false,
      };
      localStorage.removeItem("planillaEficacia");
    },
    seleccionarReporte(state, action) {
      const id = action.payload;
      console.log("SeleccionarReporte")
      state.reporte = reportes.find((r) => r.id === id);
    },
  },
});

export const {
  estaValidando,
  guardarPlanillaAlimento,
  guardarPlanillaTratamiento,
  guardarPlanillaPeces,
  guardarPlanillaEficacia,
  mostrarErrorFormulario,
  limpiarFormularioAlimento,
  limpiarFormularioTratamiento,
  limpiarFormularioPeces,
  limpiarFormularioEficacia,
  pasoSiguiente,
  pasoAnterior,
  validando,
  seleccionarReporte,
} = slice.actions;

export default slice.reducer;
