import { createSlice } from '@reduxjs/toolkit'
import { productos } from '../../helpers/productos'

const slice = createSlice({
  name: 'previsualizador',
  initialState: {
    language: 'es',
    reportes: [],
    codigosFiltrados: [],
    opcionesCodigos: [],
    filtros: [],
    filtroFecha: null,
    filtroEmpresa: null,
    filtroTipo: null,
    filtroProducto: null,
    reporte: null,
    cargando: true,
    codigoSeleccionado: null
  },
  reducers: {
    cargarRegistros(state, action) {
      const registros = action.payload.map(v => ({...v}))
      const opcionesCodigos = []
      registros.forEach(reporte => {
        const producto = reporte.Producto ? productos.find(v => v.titulo === reporte.Producto).titulo : productos[0].titulo;
        opcionesCodigos.push({
          empresa: reporte.Empresa,
          fecha: reporte.Fecha ? reporte.Fecha.substring(0, 10) : new Date().toISOString().substring(0, 10),
          tipo: reporte.TipoID,
          value: reporte.ReporteID,
          label: reporte.ReporteID,
          producto: producto
        })
        reporte.producto = producto
      })
      state.reportes = registros
      state.codigosFiltrados = opcionesCodigos
      state.cargando = false
      state.opcionesCodigos = opcionesCodigos
    },
    filtrarPorEmpresa(state, action) {
      state.filtroEmpresa = action.payload;
      if (action.payload !== null) {
        if (!state.filtros.includes('empresa')) {
          state.filtros = [...state.filtros, 'empresa']
        }
      } else {
        console.log("BORRANDO FILTRO EMPRESA")
        state.filtros = state.filtros.filter(v => v !== 'empresa')
      }
    },
    filtrarPorFecha(state, action) {
      state.filtroFecha = action.payload;
      if (action.payload !== null) {
        if (!state.filtros.includes('fecha')) {
          state.filtros = [...state.filtros, 'fecha']
        }
      } else {
        console.log("BORRANDO FILTRO FECHA")
        state.filtros = state.filtros.filter(v => v !== 'fecha')
      }
    },
    filtrarPorTipo(state, action) {
      state.filtroTipo = action.payload;
      if (action.payload !== null) {
        if (!state.filtros.includes('tipo')) {
          state.filtros = [...state.filtros, 'tipo']
        }
      } else {
        console.log("BORRANDO FILTRO TIPO")
        state.filtros = state.filtros.filter(v => v !== 'tipo')
      }
    },
    filtrarPorProducto(state, action) {
      console.log({
        action
      })
      state.filtroProducto = action.payload;
      if (action.payload !== null) {
        if (!state.filtros.includes('producto')) {
          state.filtros = [...state.filtros, 'producto']
        }
      } else {
        console.log("BORRANDO FILTRO PRODUCTO")
        state.filtros = state.filtros.filter(v => v !== 'producto')
      }
    },
    borrarRegistros(state) {
      state.cargando = true
      state.reportes = []
      state.reporte = null
      state.opcionesEmpresa = []
      state.opcionesFecha = []
      state.opcionesCodigos = []
      state.opcionesTipo = []
      state.filtros = []
      state.producto = null
    },
    seleccionarReporte(state, action) {
      const opciones = state.reportes.filter(value => value.ReporteID === action.payload?.value)
      state.reporte = opciones.length > 0 ? opciones[0] : null
      state.codigoSeleccionado = action.payload
    },
    cambiarIdioma(state) {
      state.language = state.language === 'es' ? 'en' : 'es'
    }
  },
})

export const {
  cargarRegistros,
  borrarRegistros,
  seleccionarReporte,
  filtrarPorEmpresa,
  filtrarPorFecha,
  filtrarPorTipo,
  filtrarPorProducto,
  cambiarIdioma
} = slice.actions

export default slice.reducer
