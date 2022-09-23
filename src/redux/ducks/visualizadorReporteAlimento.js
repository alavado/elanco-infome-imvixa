import { createSlice } from "@reduxjs/toolkit";


/**
 * Estructura de lotes
 * lotes: [{
 *    index,
      informe,
      piscicultura,
      planta,
      fecha,
      pmv,
      lote,
      objetivo,
      programa,
      calibre,
      datos: [],
      headers: [],
      values: [],
      comentarios: []
    }]
 * 
 */

const slice = createSlice({
  name: "visualizadorReporteAlimento",
  initialState: {
    lotes: [],
    nombreEmpresa: null,
    fecha: null,
  },
  reducers: {
    guardarInfoLotes(state, action) {
      const { infoLotes, nombreEmpresa, fecha } = action.payload
      const lotes = infoLotes.map(info => {
        const {
          index,
          informe,
          piscicultura,
          planta,
          fecha,
          pmv,
          lote,
          objetivo,
          programa,
          calibre,
        } = info
        return {
            index,
            informe,
            piscicultura,
            planta,
            fecha,
            pmv,
            lote,
            objetivo,
            programa,
            calibre,
            datos: [],
            headers: [],
            values: [],
            comentarios: []
          }
      })
      state.lotes = lotes
      state.nombreEmpresa = nombreEmpresa
      state.fecha = fecha
    },
    guardarDatosLote(state, action) {
      const { index, datos } = action.payload
      const copyLotes = [...state.lotes]
      copyLotes[index].datos = datos
      state.lotes = copyLotes
    },
    guardarHeadersValues(state, action) {
      const { index, headers, values } = action.payload
      const copyLotes = [...state.lotes]
      copyLotes[index].headers = headers
      copyLotes[index].values = values
      state.lotes = copyLotes
    },
    guardarComentariosLote(state, action) {
      const { index, comentarios } = action.payload
      const copyLotes = [...state.lotes]
      copyLotes[index].comentarios = comentarios
      state.lotes = copyLotes
      console.log('GUARDAR COMENTARIOS')
    }
  }
})

export const {
  guardarInfoLotes,
  guardarDatosLote,
  guardarHeadersValues,
  guardarComentariosLote
} = slice.actions;

export default slice.reducer;