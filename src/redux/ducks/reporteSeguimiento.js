import { createSlice } from "@reduxjs/toolkit"
import { TRATAMIENTOS_HEXAFLUMURON, TRATAMIENTOS_IMVIXA } from "../../components/Reporte/ResultadosEficacia/Tratamientos/Tratamientos"
import { dividirDatosSegun, extraerUltimosPeriodos, getBoxPlotData, getEficacia, getEficaciaMacrozona, getEficaciaSegunFecha, groupBy, iqrValues, iqrValuesFixed, mean, reemplazarNullPorCero } from "../../components/Reporte/utilitiesReporte"
import { colCentroEficacia, colCumplimiento, colEficaciaEficacia, colFechaAlimento, colFechaEficacia, colFechaPeces, colFechaPMV, colHexaEficacia, colMacrozonaEficacia, colNMuestrasAlimento, colNPecesPMV, colPeso1, colPeso2, colPisciculturaPeces, colPlanta, colPPB, colSampleOrigin, tipoFAPMV, tipoFreshWater, tipoRecPMV, tipoSeaWater } from "../../constants"
import { 
  filtrarDatosAlimento, 
  filtrarDatosPecesTratados,
  filtrarDatosEficacia,
  filtrarDatosPeces,
  filtrarDatosPecesTratadosSinInicio, 
  onlyUnique,
  esAño,
  contarPMVSiEs} from "./utilities"

const today = new Date()
const cumplimientoMax = localStorage.getItem("cumplimientoIndustriaMax")
const cumplimientoMin = localStorage.getItem("cumplimientoIndustriaMin")
const concentracionMax = localStorage.getItem("concentracionIndustriaMax")
const concentracionMin = localStorage.getItem("concentracionIndustriaMin")
const concentracion25 = localStorage.getItem("concentracionIndustria25")
const concentracion50 = localStorage.getItem("concentracionIndustria50")
const concentracion75 = localStorage.getItem("concentracionIndustria75")
const concentracionProm = localStorage.getItem("concentracionIndustriaProm")
const slice = createSlice({
  name: "reporte",
  initialState: {
    nombreEmpresa: "",
    divisionTemporal: "trimestral",
    fechaInicio: null,
    fechaFinal: new Date(today.getFullYear(), today.getMonth(), 0),
    cumplimiento: {
      min: cumplimientoMin ? cumplimientoMin : "",
      max: cumplimientoMax ? cumplimientoMax : "",
      q2: "",
      q3: "",
      q4: "",
      prom: "",
    },
    concentracion: {
      min: concentracionMin ? concentracionMin : "",
      max: concentracionMax ? concentracionMax : "",
      q2: concentracion25 ? concentracion25 : "",
      q3: concentracion50 ? concentracion50 : "",
      q4: concentracion75 ? concentracion75 : "",
      prom: concentracionProm ? concentracionProm : "",
    },
    procesandoParaExportar: false,
    datosFiltradosAlimento: null,
    datosFiltradosPeces: null,
    datosFiltradosEficacia: null,
    datosFiltradosPecesTratados: null,
    datosPecesTratados: null,
    datosFiltradosIndustriaAlimento: null,
    datosFiltradosIndustriaPeces: null,
    datosFiltradosIndustriaEficacia: null,
    comentarios: [],
    filasTablaResumen: [],
    datosGraficoPecesTratados: [],
    datosGraficoPesoPromedio: [],
    datosTratamientos: [],
    datosMacrozona: [],
    datosCConcentracion: [],
    datosCMusculo: [],
    datosGraficoCConcentracion: []
  },
  reducers: {
    limpiarFormulario(state) {
      state.nombreEmpresa = ""
      state.fechaInicio = null
      state.fechaFinal = new Date(today.getFullYear(), today.getMonth(), 0)
      state.divisionTemporal = "trimestral"
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
    guardarComentarios(state, action) {
      state.comentarios = action.payload
    },
    procesarDatosParaExportar(state, action) {
      const {
        datosAlimento,
        datosPeces,
        datosEficacia,
        datosPecesTratados,
        cumplimiento,
        concentracion } = action.payload
      const datosFiltradosAlimento = filtrarDatosAlimento(
        datosAlimento,
        state.nombreEmpresa,
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosAlimento = datosFiltradosAlimento
      const datosFiltradosIndustriaAlimento = filtrarDatosAlimento(
        datosAlimento,
        "Todas",
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosIndustriaAlimento = datosFiltradosIndustriaAlimento

      const datosFiltradosPecesTratados = filtrarDatosPecesTratados(
        datosPecesTratados,
        state.nombreEmpresa,
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosPecesTratados = datosFiltradosPecesTratados

      const datosPecesTratados2 = filtrarDatosPecesTratadosSinInicio(
        datosPecesTratados,
        state.nombreEmpresa,
        state.fechaFinal
      )
      state.datosPecesTratados = datosPecesTratados2

      const datosFiltradosEficacia = filtrarDatosEficacia(
        datosEficacia,
        state.nombreEmpresa,
        state.fechaFinal
      )
      state.datosFiltradosEficacia = datosFiltradosEficacia

      const datosFiltradosIndustriaEficacia = filtrarDatosEficacia(
        datosEficacia,
        "Todas",
        state.fechaFinal
      )
      state.datosFiltradosIndustriaEficacia = datosFiltradosIndustriaEficacia

      const datosFiltradosPeces = filtrarDatosPeces(
        datosPeces,
        state.nombreEmpresa,
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosPeces = datosFiltradosPeces

      const datosFiltradosIndustriaPeces = filtrarDatosPeces(
        datosPeces,
        "Todas",
        state.fechaInicio,
        state.fechaFinal
      )
      state.datosFiltradosIndustriaPeces = datosFiltradosIndustriaPeces

      state.procesandoParaExportar = true
      // Filas tabla resumen
      const esteAño = new Date(state.fechaFinal).getFullYear()
      const añoPasado = esteAño - 1
      // Separar datos por año
      const datosAñoPasado = {
        alimento: datosFiltradosAlimento.filter(obj => esAño(obj[colFechaAlimento], añoPasado)),
        peces: datosFiltradosPeces.filter(obj => esAño(obj[colFechaPeces], añoPasado)),
        pmv: datosFiltradosPecesTratados.filter(obj => esAño(obj[colFechaPMV], añoPasado)),
        pmvSinFiltro: datosPecesTratados2.filter(obj => esAño(obj[colFechaPMV], añoPasado)),
      }
      const datosAñoActual = {
        alimento: datosFiltradosAlimento.filter(obj => esAño(obj[colFechaAlimento], esteAño)),
        peces: datosFiltradosPeces.filter(obj => esAño(obj[colFechaPeces], esteAño)),
        pmv: datosFiltradosPecesTratados.filter(obj => esAño(obj[colFechaPMV], esteAño)),
        pmvSinFiltro: datosPecesTratados2.filter(obj => esAño(obj[colFechaPMV], esteAño))
      }

      // Calcular valores de cada fila
      const filasTablaResumen = [
        [
          datosAñoPasado.peces
          .filter(row => row[colSampleOrigin] === tipoFreshWater)
          .map(row => row[colFechaPeces].substring(0, 10))
          .filter(onlyUnique)
          .length, 
          datosAñoActual.peces
          .filter(row => row[colSampleOrigin] === tipoFreshWater)
          .map(row => row[colFechaPeces].substring(0, 10))
          .filter(onlyUnique)
          .length, 
        ],
        [
          datosAñoPasado.peces
          .filter(row => row[colSampleOrigin] === tipoSeaWater)
          .map(row => row[colFechaPeces].substring(0, 10))
          .filter(onlyUnique)
          .length, 
          datosAñoActual.peces
          .filter(row => row[colSampleOrigin] === tipoSeaWater)
          .map(row => row[colFechaPeces].substring(0, 10))
          .filter(onlyUnique)
          .length, 
        ],
        [
          datosAñoPasado.peces
          .filter(row => row[colSampleOrigin] === tipoFreshWater)
          .length, 
          datosAñoActual.peces
          .filter(row => row[colSampleOrigin] === tipoFreshWater)
          .length
        ],
        [
          datosAñoPasado.peces
          .filter(row => row[colSampleOrigin] === tipoSeaWater)
          .length, 
          datosAñoActual.peces
          .filter(row => row[colSampleOrigin] === tipoSeaWater)
          .length
        ],
        [
          datosAñoPasado.alimento.reduce((prev, curr) => curr[colNMuestrasAlimento] + prev, 0), 
          datosAñoActual.alimento.reduce((prev, curr) => curr[colNMuestrasAlimento] + prev, 0)
        ],
        [
          datosAñoPasado.pmvSinFiltro.reduce((prev, curr) => Math.round(contarPMVSiEs(tipoRecPMV, curr)) + prev, 0), 
          datosAñoActual.pmvSinFiltro.reduce((prev, curr) => Math.round(contarPMVSiEs(tipoRecPMV, curr)) + prev, 0), 
        ]
        ,
        [
          datosAñoPasado.pmvSinFiltro.reduce((prev, curr) => Math.round(contarPMVSiEs(tipoFAPMV, curr)) + prev, 0), 
          datosAñoActual.pmvSinFiltro.reduce((prev, curr) => Math.round(contarPMVSiEs(tipoFAPMV, curr)) + prev, 0), 
        ],
        [
          datosAñoPasado.pmvSinFiltro.reduce((prev, curr) => Math.round(reemplazarNullPorCero(curr[colNPecesPMV])) + prev, 0), 
          datosAñoActual.pmvSinFiltro.reduce((prev, curr) => Math.round(reemplazarNullPorCero(curr[colNPecesPMV])) + prev, 0)
        ]
      ]
      state.filasTablaResumen = filasTablaResumen

      // GraficoPecesTratados
      const datosDivididos = dividirDatosSegun(state.divisionTemporal, datosFiltradosPecesTratados, colFechaPMV, state.fechaFinal)
      // valor en millones
      const datosGraficoPecesTratados = datosDivididos.labels.map((nombre, index) => { return {
        nombre,
        valor: Math.round(datosDivididos.datos[index].reduce((prev, curr) => reemplazarNullPorCero(curr[colNPecesPMV]) + prev, 0) / 100000) / 10
      }})
      state.datosGraficoPecesTratados = datosGraficoPecesTratados

      // GraficoPesoPromedio
      const datosGrafico = extraerUltimosPeriodos(
        state.divisionTemporal, 
        datosFiltradosPeces.filter(v => v[colSampleOrigin] === tipoFreshWater), 
        colFechaPeces, 
        state.fechaFinal)
      const datosGrouped = groupBy(datosGrafico, colPisciculturaPeces)
      if (datosGrafico.length === 0) {
        state.datosGraficoPesoPromedio = []
      } else {
        const datosGraficoPesoPromedio = Object.keys(datosGrouped).map(piscicultura => {
          return {
            nombre: piscicultura,
            valor: Math.round(datosGrouped[piscicultura].map(row => {
              if (row[colPeso1]) return row[colPeso1]
              return row[colPeso2]
            }).reduce((prev, curr) => prev + curr, 0) / datosGrouped[piscicultura].length)
          }
        }).sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0))
        state.datosGraficoPesoPromedio = datosGraficoPesoPromedio
      }
      // datosTratamiento
      // ultimos 18 meses (3 semestres)
      const datosEmpresa = extraerUltimosPeriodos(
        'semestral', 
        datosFiltradosEficacia, 
        colFechaEficacia, 
        state.fechaFinal,
        3)
      // ultimos 18 meses (3 semestres) 
      // y filtro los que no han usado alfaflux y los que ya han reportado eficacia
      const datosGraficoIndustria = extraerUltimosPeriodos(
        'semestral', 
        datosFiltradosIndustriaEficacia, 
        colFechaEficacia, 
        state.fechaFinal,
        3)

      const datosIndustria = datosGraficoIndustria.filter(obj => !obj[colHexaEficacia] && obj[colEficaciaEficacia])

      const promedioIndustria = getEficacia(datosIndustria, 1)

      // filtro los datos empresa los que no han usado alfaflux
      const datosImvixaEmpresa = datosEmpresa.filter(obj => !obj[colHexaEficacia])
      // Para calcular el promedio filtro los datos que tienen reportada eficacia
      const promedioEmpresa = getEficacia(datosImvixaEmpresa.filter(obj => obj[colEficaciaEficacia]), 1)
      
      // Agrupo los datos por centro de mar
      const datosConHex = groupBy(datosEmpresa.filter(obj => obj[colHexaEficacia]), colCentroEficacia)
      const datosSinHex = groupBy(datosImvixaEmpresa.filter(obj => obj[colEficaciaEficacia]), colCentroEficacia)
      const datosSinEficacia = groupBy(datosImvixaEmpresa.filter(obj => !obj[colEficaciaEficacia]), colCentroEficacia)
      const datosTratamientos = [
        ...Object.keys(datosSinHex).map(nombre => {
          return {
            nombre,
            valor: getEficacia(datosSinHex[nombre], 1),
            tratamiento: TRATAMIENTOS_IMVIXA
          }
        }).sort((a, b) => a.nombre.localeCompare(b.nombre)),
        ...Object.keys(datosConHex).map(nombre => {
          return {
            nombre,
            valor: getEficacia(datosConHex[nombre], 1),
            tratamiento: TRATAMIENTOS_HEXAFLUMURON
          }
        }).sort((a, b) => a.nombre.localeCompare(b.nombre)),
        ...Object.keys(datosSinEficacia).map(nombre => {
          return {
            nombre,
            valor: getEficaciaSegunFecha(datosSinEficacia[nombre], state.fechaFinal, 1),
          }
        }).sort((a, b) => a.nombre.localeCompare(b.nombre)) ,
      ]
      state.datosTratamientos = {
        datosTratamientos,
        promedioIndustria,
        promedioEmpresa
      }

      // ProteccionMacrozona
        // Ultimos 18 meses
      const macrozonaEmpresa = datosEmpresa.map(
          obj => obj[colMacrozonaEficacia]
        ).filter(onlyUnique)
      
        // Ultimos 18 meses

      const datosMacrozona = groupBy(datosGraficoIndustria, colMacrozonaEficacia)
      const pines = [
        {
          valor: getEficaciaMacrozona(datosMacrozona, 1),
          perteneceEmpresa: macrozonaEmpresa.includes(1),
          xPorcentaje: 18,
          yPorcentaje: 25
        },
        {
          valor: getEficaciaMacrozona(datosMacrozona, 2),
          perteneceEmpresa: macrozonaEmpresa.includes(2),
          xPorcentaje: 6,
          yPorcentaje: 35
        },
        {
          valor: getEficaciaMacrozona(datosMacrozona, 3),
          perteneceEmpresa: macrozonaEmpresa.includes(3),
          xPorcentaje: 15,
          yPorcentaje: 50
        },
        {
          valor: getEficaciaMacrozona(datosMacrozona, 4),
          perteneceEmpresa: macrozonaEmpresa.includes(4),
          xPorcentaje: 28,
          yPorcentaje: 50
        },
        {
          valor: getEficaciaMacrozona(datosMacrozona, 5),
          perteneceEmpresa: macrozonaEmpresa.includes(5),
          xPorcentaje: 12,
          yPorcentaje: 72
        },
        {
          valor: getEficaciaMacrozona(datosMacrozona, 6),
          perteneceEmpresa: macrozonaEmpresa.includes(6),
          xPorcentaje: 67,
          yPorcentaje: 20
        },
        {
          valor: getEficaciaMacrozona(datosMacrozona, 7),
          perteneceEmpresa: macrozonaEmpresa.includes(7),
          xPorcentaje: 87,
          yPorcentaje: 25
        },
        {
          valor: getEficaciaMacrozona(datosMacrozona, 8),
          perteneceEmpresa: macrozonaEmpresa.includes(8),
          xPorcentaje: 75,
          yPorcentaje: 65
        }
      ]
      state.datosMacrozona = pines

      // CumplimientoConcentracion
      const ultimosDatos = extraerUltimosPeriodos(state.divisionTemporal, datosFiltradosAlimento, colFechaAlimento, state.fechaFinal)
      const datosGroupedPlanta = groupBy(ultimosDatos, colPlanta)
      const plantas = Object.keys(datosGroupedPlanta)
      if (plantas.length === 0) {
        state.datosCConcentracion = []
      } else {
        const ultimosDatosIndustria = extraerUltimosPeriodos(state.divisionTemporal, datosFiltradosIndustriaAlimento, colFechaAlimento, state.fechaFinal)
        const cumplimientosIndustria = ultimosDatosIndustria.map(obj => obj[colCumplimiento] * 100)
        let datosIndustriaCC = {
          promedio: cumplimiento.prom !== "" ? cumplimiento.prom : mean(cumplimientosIndustria),
          ...iqrValues(cumplimientosIndustria),
          max: cumplimiento.max !== "" ? cumplimiento.max : Math.max(...cumplimientosIndustria),
          min: cumplimiento.min !== "" ? cumplimiento.min : Math.min(...cumplimientosIndustria),
        }
      
        if (cumplimiento.q2 !== "") {
          datosIndustriaCC = {
            ...datosIndustriaCC,
            ...iqrValuesFixed(cumplimiento.q2, cumplimiento.q3, cumplimiento.q4)
          }
        }
        
        
        state.datosCConcentracion = [
          datosIndustriaCC,
          ...plantas.map(planta => {
            const values = datosGroupedPlanta[planta].map((obj) => obj[colCumplimiento] * 100)
            return {
              nombre: planta,
              promedio: mean(values),
              ...iqrValues(values),
              max: Math.max(...values),
              min: Math.min(...values),
            }
          }).sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0))
        ]

        // Grafico concentracion en musculo
        const datosDivididosCM = dividirDatosSegun(
          state.divisionTemporal, 
          datosFiltradosPeces.filter(dato => dato[colSampleOrigin] === tipoFreshWater), 
          colFechaPeces, 
          state.fechaFinal
        )
        if (datosDivididosCM.datos.every(obj => obj.length === 0)) {
          state.datosCMusculo = []
        } else {
          const datosCMusculo = datosDivididosCM.labels.map((nombre, index) => { 
            if (datosDivididosCM.datos[index].length === 0) {
              return {
                nombre,
                promedio: 0,
                iqr: 0,
                max: 0,
                min: 0,
              }
            }
            const values = datosDivididosCM.datos[index].map(obj => obj[colPPB] / 1000)
            return {
              nombre,
              promedio: mean(values),
              ...iqrValues(values),
              max: Math.max(...values),
              min: Math.min(...values),
          }})
          state.datosCMusculo = datosCMusculo
        }

        // Grafico COmparacion concentracion
        const datosEmpresaCC = extraerUltimosPeriodos(
          state.divisionTemporal, 
          datosFiltradosPeces.filter(dato => dato[colSampleOrigin] === tipoFreshWater), 
          colFechaPeces, 
          state.fechaFinal)
          
        const datosIndustriaGCC = extraerUltimosPeriodos(
          state.divisionTemporal, 
          datosFiltradosIndustriaPeces.filter(dato => dato[colSampleOrigin] === tipoFreshWater), 
          colFechaPeces, 
          state.fechaFinal)
      
        const datosPorPiscicultura = groupBy(datosEmpresaCC, colPisciculturaPeces)

        if (Object.values(datosPorPiscicultura).every(obj => obj.length === 0)) {
          state.datosGraficoCConcentracion = []
        } else {
          state.datosGraficoCConcentracion = [
            getBoxPlotData(datosIndustriaGCC, "industria", concentracion),
            getBoxPlotData(datosEmpresaCC, "empresa", null),
            ...Object.keys(datosPorPiscicultura).map(pisc => getBoxPlotData(datosPorPiscicultura[pisc], pisc, null)).sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0))
          ]
        }
      }
    },
    cargarPreVizSeguimiento(state, action) {
      const { nombreEmpresa, datos } = action.payload
      const {
        fechaInicio,
        fechaFinal,
        divisionTemporal,
        filasTablaResumen,
        datosGraficoPecesTratados,
        datosGraficoPesoPromedio,
        datosTratamientos,
        datosMacrozona,
        datosCConcentracion,
        datosCMusculo,
        datosGraficoCConcentracion,
      } = datos
      state.nombreEmpresa = nombreEmpresa
      state.fechaInicio = new Date(fechaInicio)
      state.fechaFinal =  new Date(fechaFinal)
      state.divisionTemporal = divisionTemporal
      state.filasTablaResumen = filasTablaResumen
      state.datosGraficoPecesTratados = datosGraficoPecesTratados
      state.datosGraficoPesoPromedio = datosGraficoPesoPromedio
      state.datosTratamientos = datosTratamientos
      state.datosMacrozona = datosMacrozona
      state.datosCConcentracion = datosCConcentracion
      state.datosCMusculo = datosCMusculo
      state.datosGraficoCConcentracion = datosGraficoCConcentracion
    }
  },
})

export const {
  limpiarFormulario,
  guardaNombreEmpresa,
  guardarFechaDeInicio,
  guardarFechaDeTermino,
  guardarDivisionTemporal,
  guardarCumplimiento,
  guardarConcentracion,
  procesarDatosParaExportar,
  guardarComentarios,
  cargarPreVizSeguimiento
} = slice.actions

export default slice.reducer
