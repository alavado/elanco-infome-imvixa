import { createSlice } from "@reduxjs/toolkit"
import {
  procesarDatosParaExportar
} from "./reporte";

const slice = createSlice({
  name: 'tablaResumen',
  initialState: {
    msg: ""
  },
  extraReducers: {
    [procesarDatosParaExportar.type] : (state, action) => {
      console.log(state.procesandoParaExportar)
      console.log("hola")
      state.msg = "hola"
    }
  }
})

export default slice.reducer
