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
    },
    guardarPlanillaPeces(state, action) {
      state.planillaPeces = action.payload
    },
    guardarPlanillaPMV(state, action) {
      state.planillaPMV = action.payload
    },
    guardarPlanillaEficacia(state, action) {
      state.planillaEficacia = action.payload
    }
  }
})

export const { 
  guardarPlanillaAlimento,
  guardarPlanillaPeces,
  guardarPlanillaPMV,
  guardarPlanillaEficacia,
  guardaNombreEmpresa,
  pasoSiguiente,
  pasoAnterior } = slice.actions

export default slice.reducer