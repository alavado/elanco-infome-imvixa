import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
  name: 'reporte',
  initialState: {
    nombreEmpresa: '<Rellenar>'
  },
  reducers: {
    guardaNombreEmpresa(state, action) {
      state.nombreEmpresa = action.payload
    }
  }
})

export const { guardaNombreEmpresa } = slice.actions

export default slice.reducer