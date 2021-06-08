import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
  name: 'reporte',
  initialState: {
    pasoActual: 0,
    planillaAlimento: "",
    planillaPMV: "",
    planillaPeces: "",
    planillaEficacia: "",
    nombreEmpresa: '<Rellenar>',
    fechaInicio: "",
    fechaFinal: "",
    todasLasPlanillas: false,
    errorFormulario: null
  },
  reducers: {
    guardaNombreEmpresa(state, action) {
      state.nombreEmpresa = action.payload
    },
    pasoSiguiente(state) {
      if (state.pasoActual < 2) state.pasoActual += 1
    },
    pasoAnterior(state) {
      if (state.pasoActual > 0) state.pasoActual -= 1
    },
    guardarPlanillaAlimento(state, action) {
      state.planillaAlimento = action.payload
      if (state.planillaEficacia !== '' && state.planillaPeces !== '') {
        state.todasLasPlanillas = true
      }
      state.errorFormulario = null
    },
    guardarPlanillaPeces(state, action) {
      state.planillaPeces = action.payload
      if (state.planillaEficacia !== '' && state.planillaAlimento !== '') {
        state.todasLasPlanillas = true
      }
      state.errorFormulario = null
    },
    guardarPlanillaPMV(state, action) {
      state.planillaPMV = action.payload
    },
    guardarPlanillaEficacia(state, action) {
      state.planillaEficacia = action.payload
      if (state.planillaPeces !== '' && state.planillaAlimento !== '') {
        state.todasLasPlanillas = true
      }
      state.errorFormulario = null
    },
    mostrarErrorFormulario(state, action) {
      state.errorFormulario = action.payload
    }
  }
})

export const { 
  guardarPlanillaAlimento,
  guardarPlanillaPeces,
  mostrarErrorFormulario,
  guardarPlanillaEficacia,
  guardaNombreEmpresa,
  pasoSiguiente,
  pasoAnterior } = slice.actions

export default slice.reducer