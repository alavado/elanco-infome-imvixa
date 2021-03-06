import { createSlice } from "@reduxjs/toolkit"
import { 
  onlyUnique,
  localeSort,
  filtrarDatosAlimento, 
  filtrarDatosTratamiento,
  filtrarDatosEficacia,
  filtrarDatosPeces } from "./utilities"
import { colEmpresaAlimento  } from '../../constants'

const today = new Date()
const slice = createSlice({
  name: "reporte",
  initialState: {
    validando: {
      alimento: false,
      eficacia: false,
      tratamiento: false,
      peces: false
    },
    pasoActual: 0,
    planillaAlimento: "",
    planillaTratamiento: "",
    planillaPeces: "",
    planillaEficacia: "",
    empresas: [],//[{ value: "Todas", label: "Todas" }],
    nombreEmpresa: "",
    divisionTemporal: "trimestral",
    fechaInicio: null,
    fechaFinal: new Date(today.getFullYear(), today.getMonth(), 0),
    cumplimiento: {
      min: "",
      max: "",
      q2: "",
      q3: "",
      q4: "",
      prom: "",
    },
    concentracion: {
      min: "",
      max: "",
      q2: "",
      q3: "",
      q4: "",
      prom: "",
    },
    todasLasPlanillas: false,
    errorFormulario: null,
    datosAlimento: null,
    datosPeces: null,
    datosTratamiento: null,
    datosEficacia: null,
    procesandoParaExportar: false,
    datosFiltradosAlimento: null,
    datosFiltradosPeces: null,
    datosFiltradosEficacia: null,
    datosFiltradosTratamiento: null,
    datosFiltradosIndustriaAlimento: null,
    datosFiltradosIndustriaPeces: null,
    datosFiltradosIndustriaEficacia: null,
    datosFiltradosIndustriaTratamiento: null,
  },
  reducers: {
    estaValidando(state, action) {
      state.validando = {
        ...state.validando,
        ...action.payload
      }
    },
    guardaNombreEmpresa(state, action) {
      state.nombreEmpresa = action.payload.value
    },
    guardarFechaDeInicio(state, action) {
      state.fechaInicio = action.payload
    },
    guardarFechaDeTermino(state, action) {
      state.fechaFinal = action.payload
    },
    guardarDivisionTemporal(state, action) {
      state.divisionTemporal = action.payload
    },
    pasoSiguiente(state) {
      if (state.pasoActual < 2) state.pasoActual += 1
    },
    pasoAnterior(state) {
      if (state.pasoActual > 0) {
        state.pasoActual -= 1
        state.errorFormulario = null
      }
    },
    guardarPlanillaAlimento(state, action) {
      state.planillaAlimento = action.payload.path
      state.datosAlimento = action.payload.datos
      let empresas = action.payload.datos
        .map((r) => r[colEmpresaAlimento])
        .filter(onlyUnique)
      empresas = localeSort(empresas)
      state.empresas = [
        //{ value: "Todas", label: "Todas" },
        ...empresas.map((v) => {
          return { value: v, label: v }
        }),
      ]
      if (state.planillaEficacia !== "" && state.planillaPeces !== "" && state.planillaTratamiento !== "") {
        state.todasLasPlanillas = true
      }
      state.errorFormulario = null
    },
    guardarPlanillaTratamiento(state, action) {
      state.planillaTratamiento = action.payload.path
      state.datosTratamiento = action.payload.datos
      if (state.planillaEficacia !== "" && state.planillaAlimento !== "" && state.planillaPeces !== "") {
        state.todasLasPlanillas = true
      }
      state.errorFormulario = null
    },
    guardarPlanillaPeces(state, action) {
      state.planillaPeces = action.payload.path
      state.datosPeces = action.payload.datos
      if (state.planillaEficacia !== "" && state.planillaAlimento !== "" && state.planillaTratamiento !== "") {
        state.todasLasPlanillas = true
      }
      state.errorFormulario = null
    },
    guardarPlanillaEficacia(state, action) {
      state.planillaEficacia = action.payload.path
      state.datosEficacia = action.payload.datos
      if (state.planillaPeces !== "" && state.planillaAlimento !== "" && state.planillaTratamiento !== "") {
        state.todasLasPlanillas = true
      }
      state.errorFormulario = null
    },
    mostrarErrorFormulario(state, action) {
      state.errorFormulario = action.payload
    },
    limpiarFormularioAlimento(state, action) {
      state.todasLasPlanillas = false
      state.planillaAlimento = ""
      state.datosAlimento = []
      state.validando = {
        ...state.validando,
        alimento: false
      }
      localStorage.removeItem("planillaAlimento")
    },
    limpiarFormularioTratamiento(state, action) {
      state.todasLasPlanillas = false
      state.planillaTratamiento = ""
      state.datosTratamiento = []
      state.validando = {
        ...state.validando,
        tratamiento: false
      }
      localStorage.removeItem("planillaTratamiento")
    },
    limpiarFormularioPeces(state, action) {
      state.todasLasPlanillas = false
      state.planillaPeces = ""
      state.datosPeces = []
      state.validando = {
        ...state.validando,
        peces: false
      }
      localStorage.removeItem("planillaPeces")
    },
    limpiarFormularioEficacia(state, action) {
      state.todasLasPlanillas = false
      state.planillaEficacia = ""
      state.datosEficacia = []
      state.validando = {
        ...state.validando,
        eficacia: false
      }
      localStorage.removeItem("planillaEficacia")
    },
    guardarCumplimiento(state, action) {
      switch (action.payload.tipo) {
        case 'min':
          state.cumplimiento.min = action.payload.valor
          return
        case 'max':
          state.cumplimiento.max = action.payload.valor
          return
        case 'q2':
          state.cumplimiento.q2 = action.payload.valor
          return
        case 'q3':
          state.cumplimiento.q3 = action.payload.valor
          return
        case 'q4':
          state.cumplimiento.q4 = action.payload.valor
          return
        case 'prom':
          state.cumplimiento.prom = action.payload.valor
          return
        default:
          return 
      }
    },
    guardarConcentracion(state, action) {
      switch (action.payload.tipo) {
        case 'min':
          state.concentracion.min = action.payload.valor
          return
        case 'max':
          state.concentracion.max = action.payload.valor
          return
        case 'q2':
          state.concentracion.q2 = action.payload.valor
          return
        case 'q3':
          state.concentracion.q3 = action.payload.valor
          return
        case 'q4':
          state.concentracion.q4 = action.payload.valor
          return
        case 'prom':
          state.concentracion.prom = action.payload.valor
          return
        default:
          return 
      }
    },
    procesarDatosParaExportar(state) {
      state.datosFiltradosAlimento = filtrarDatosAlimento(
        state.datosAlimento,
        state.nombreEmpresa,
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosIndustriaAlimento = filtrarDatosAlimento(
        state.datosAlimento,
        "Todas",
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosTratamiento = filtrarDatosTratamiento(
        state.datosTratamiento,
        state.nombreEmpresa,
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosIndustriaTratamiento = filtrarDatosTratamiento(
        state.datosTratamiento,
        "Todas",
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosEficacia = filtrarDatosEficacia(
        state.datosEficacia,
        state.nombreEmpresa,
        state.fechaFinal
      )
      state.datosFiltradosIndustriaEficacia = filtrarDatosEficacia(
        state.datosEficacia,
        "Todas",
        state.fechaFinal
      )
      state.datosFiltradosPeces = filtrarDatosPeces(
        state.datosPeces,
        state.nombreEmpresa,
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosIndustriaPeces = filtrarDatosPeces(
        state.datosPeces,
        "Todas",
        state.fechaInicio,
        state.fechaFinal
      )
      state.procesandoParaExportar = true
    },
  },
})

export const {
  estaValidando,
  guardarPlanillaAlimento,
  guardarPlanillaTratamiento,
  guardarPlanillaPeces,
  guardarPlanillaEficacia,
  guardarCumplimiento,
  guardarConcentracion,
  mostrarErrorFormulario,
  limpiarFormularioAlimento,
  limpiarFormularioTratamiento,
  limpiarFormularioPeces,
  limpiarFormularioEficacia,
  guardaNombreEmpresa,
  guardarFechaDeInicio,
  guardarFechaDeTermino,
  guardarDivisionTemporal,
  pasoSiguiente,
  pasoAnterior,
  procesarDatosParaExportar,
  validando
} = slice.actions

export default slice.reducer
