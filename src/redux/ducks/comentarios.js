import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'comentarios',
  initialState: {
    comentarios: []
  },
  reducers: {
    agregarComentario(state, action) {
      const texto = action.payload
      state.comentarios.push(texto)
    },
  },
})

export const {
  agregarComentario,
} = slice.actions

export default slice.reducer
