import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
  name: 'reporte',
  initialState: {
    pasoActual: 0,
    nombreEmpresa: '<Rellenar>'
  },
  reducers: {
    guardaNombreEmpresa(state, action) {
      state.nombreEmpresa = action.payload
    },
    pasoSiguiente(state) {
      console.log(state.pasoActual)
      if (state.pasoActual < 2) state.pasoActual += 1
    },
    pasoAnterior(state) {
      if (state.pasoActual > 0) state.pasoActual -= 1
    }
  }
})

export const { 
  guardaNombreEmpresa,
  pasoSiguiente,
  pasoAnterior } = slice.actions

export default slice.reducer