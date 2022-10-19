import { colEficaciaEficacia, colFechaEficacia, colPPB } from "../../constants"

const N_DIVISIONES = 5

export const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]
export const months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
]
// Retorna un arreglo de nDivisiones elementos, con los datos
// del mes actual y los meses anteriores en orden cronologico
const dividirEnM = (datos, colFecha, fechaFinReporte, nDivisiones) => {
  let fechaActual = new Date(fechaFinReporte)
  let mesActual = fechaActual.getMonth()
  const meses = []
  const labels = []
  for (var i = 0; i < nDivisiones; i++) {
    labels.unshift(`M${mesActual+1} ${fechaActual.getFullYear()}`)
    meses.unshift(datos.filter(obj => new Date(obj[colFecha]).getMonth() === mesActual))
    fechaActual = new Date(fechaActual.getFullYear(), mesActual, 0);
    mesActual = fechaActual.getMonth()
  }
  return {
    labels,
    datos: meses
  }
}

// Retorna un arreglo de nDivisiones elementos, con los datos
// del Q actual y los Q anteriores en orden cronologico.
// El índice 0 tiene los datos del Q más viejo
const dividirEnQ = (datos, colFecha, fechaFinReporte, nDivisiones) => {
  // Constantes de un trimestre (Q)
  const mesesFinalesDeQ = [2, 5, 8, 11]
  const mesesPorPeriodo = 3
  // Setup fechas de referencia
  let fechaActual = new Date(fechaFinReporte)
  let qActual = Math.floor(fechaActual.getMonth() / mesesPorPeriodo)
  let ultimoDiaQActual = new Date(fechaActual.getFullYear(), mesesFinalesDeQ[qActual] + 1, 1)
  let mesUltimoDiaQActual = ultimoDiaQActual.getMonth()
  let ultimoDiaQAnterior = new Date(ultimoDiaQActual)
  ultimoDiaQAnterior.setMonth(mesUltimoDiaQActual - mesesPorPeriodo)
  // Completar datos
  const trimestres = []
  const labels = []
  for (var i = 0; i < nDivisiones; i++) {
    labels.unshift(`Q${qActual+1} ${ultimoDiaQAnterior.getFullYear()}`)
    trimestres.unshift(datos.filter(obj => {
      const fecha = new Date(obj[colFecha])
      return fecha < ultimoDiaQActual && fecha >= ultimoDiaQAnterior
    }))
    ultimoDiaQActual = new Date(ultimoDiaQActual.getFullYear(), mesUltimoDiaQActual - mesesPorPeriodo, 1);
    mesUltimoDiaQActual = ultimoDiaQActual.getMonth()
    ultimoDiaQAnterior.setMonth(mesUltimoDiaQActual - mesesPorPeriodo)
    if (mesUltimoDiaQActual === 0){
      // el mes anterior es diciembre (indice 11)
      qActual = Math.floor(11 / mesesPorPeriodo)
    } else {
      qActual = Math.floor((mesUltimoDiaQActual - 1) / mesesPorPeriodo)
    }
  }
  return {
    labels,
    datos: trimestres
  }
}

const dividirEnC = (datos, colFecha, fechaFinReporte, nDivisiones) => {
  // Constantes de un cuatrimestre
  const mesesFinalesDeC = [3, 7, 11]
  const mesesPorPeriodo = 4
  // Setup fechas de referencia
  let fechaActual = new Date(fechaFinReporte)
  let cActual = Math.floor(fechaActual.getMonth() / mesesPorPeriodo)
  let ultimoDiaCActual = new Date(fechaActual.getFullYear(), mesesFinalesDeC[cActual] + 1, 1)
  let mesUltimoDiaCActual = ultimoDiaCActual.getMonth()
  let ultimoDiaCAnterior = new Date(ultimoDiaCActual)
  ultimoDiaCAnterior.setMonth(mesUltimoDiaCActual - mesesPorPeriodo)
  // Completar datos
  const cuatrimestres = []
  const labels = []
  for (var i = 0; i < nDivisiones; i++) {
    labels.unshift(`C${cActual+1} ${ultimoDiaCAnterior.getFullYear()}`)
    cuatrimestres.unshift(datos.filter(obj => {
      const fecha = new Date(obj[colFecha])
      return fecha < ultimoDiaCActual && fecha >= ultimoDiaCAnterior
    }))
    ultimoDiaCActual = new Date(ultimoDiaCActual.getFullYear(), mesUltimoDiaCActual - mesesPorPeriodo, 1);
    mesUltimoDiaCActual = ultimoDiaCActual.getMonth()
    ultimoDiaCAnterior.setMonth(mesUltimoDiaCActual - mesesPorPeriodo)
    if (mesUltimoDiaCActual === 0){
      // el mes anterior es diciembre (indice 11)
      cActual = Math.floor(11 / mesesPorPeriodo)
    } else {
      cActual = Math.floor((mesUltimoDiaCActual - 1) / mesesPorPeriodo)
    }
  }
  return {
    labels,
    datos: cuatrimestres
  }
}

const dividirEnS = (datos, colFecha, fechaFinReporte, nDivisiones) => {
  // Constantes de un semestre
  const mesesFinalesDeS = [5, 11]
  const mesesPorPeriodo = 6
  // Set up fechas de referencias
  let fechaActual = new Date(fechaFinReporte)
  let sActual = Math.floor(fechaActual.getMonth() / mesesPorPeriodo)
  let ultimoDiaSActual = new Date(fechaActual.getFullYear(), mesesFinalesDeS[sActual] + 1, 1)
  let mesUltimoDiaSActual = ultimoDiaSActual.getMonth()
  let ultimoDiaSAnterior = new Date(ultimoDiaSActual)
  ultimoDiaSAnterior.setMonth(mesUltimoDiaSActual - mesesPorPeriodo)
  // Completar datos
  const semestres = []
  const labels = [] 
  for (var i = 0; i < nDivisiones; i++) {
    labels.unshift(`S${sActual+1} ${ultimoDiaSAnterior.getFullYear()}`)
    semestres.unshift(datos.filter(obj => {
      const fecha = new Date(obj[colFecha])
      return fecha < ultimoDiaSActual && fecha >= ultimoDiaSAnterior
    }))
    ultimoDiaSActual = new Date(ultimoDiaSActual.getFullYear(), mesUltimoDiaSActual - mesesPorPeriodo, 1);
    mesUltimoDiaSActual = ultimoDiaSActual.getMonth()
    ultimoDiaSAnterior.setMonth(mesUltimoDiaSActual - mesesPorPeriodo)
    if (mesUltimoDiaSActual === 0){
      // el mes anterior es diciembre (indice 11)
      sActual = Math.floor(11 / mesesPorPeriodo)
    } else {
      sActual = Math.floor((mesUltimoDiaSActual - 1) / mesesPorPeriodo)
    }
  }
  return {
    labels,
    datos: semestres
  }
}


export const dividirDatosSegun = (division, datos, colFecha, fechaFinal=new Date(), nDivisiones=N_DIVISIONES) => {
  switch (division) {
    case 'mensual':
      return dividirEnM(datos, colFecha, fechaFinal, nDivisiones)
    case 'trimestral':
      return dividirEnQ(datos, colFecha, fechaFinal, nDivisiones)
    case 'cuatrimestral':
      return dividirEnC(datos, colFecha, fechaFinal, nDivisiones)
    case 'semestral':
      return dividirEnS(datos, colFecha, fechaFinal, nDivisiones)
    default:
      return {
        labels: [],
        datos: []
      }
  }
}


const extraerUltimosM = (datos, colFecha, fechaFinReporte, nDivisiones) => {
  const fechaActual = new Date(fechaFinReporte)
  const mesActual = fechaActual.getMonth()
  const fechaNAnterior = new Date(fechaActual.getFullYear(), mesActual - (nDivisiones - 1), 1);
  return datos.filter(obj => new Date(obj[colFecha]) > fechaNAnterior)
}


const extraerUltimosNDivisiones = (mesesFinales, nMeses, datos, colFecha, fechaFinReporte, nDivisiones) => {
  const fechaActual = new Date(fechaFinReporte)
  const periodoActual = Math.floor(fechaActual.getMonth() / nMeses)
  const ultimoDiaPeriodoActual = new Date(fechaActual.getFullYear(), mesesFinales[periodoActual] + 1, 1)
  const mesUltimoDiaPeriodoActual = ultimoDiaPeriodoActual.getMonth()
  const fechaNAnterior = new Date(ultimoDiaPeriodoActual.getFullYear(), mesUltimoDiaPeriodoActual - (nDivisiones * nMeses), 1)
  return datos.filter(obj => new Date(obj[colFecha]) > fechaNAnterior)
}

const extraerUltimosQ = (datos, colFecha, fechaFinReporte, nDivisiones) => {
  const mesesFinalesDeQ = [2, 5, 8, 11]
  const mesesPorPeriodo = 3
  return extraerUltimosNDivisiones(mesesFinalesDeQ, mesesPorPeriodo, datos, colFecha, fechaFinReporte, nDivisiones)
}

const extraerUltimosC = (datos, colFecha, fechaFinReporte, nDivisiones) => {
  // Constantes de un cuatrimestre
  const mesesFinalesDeC = [3, 7, 11]
  const mesesPorPeriodo = 4
  return extraerUltimosNDivisiones(mesesFinalesDeC, mesesPorPeriodo, datos, colFecha, fechaFinReporte, nDivisiones)

}


const extraerUltimosS = (datos, colFecha, fechaFinReporte, nDivisiones) => {
  // Constantes de un semestre
  const mesesFinalesDeS = [5, 11]
  const mesesPorPeriodo = 6
  return extraerUltimosNDivisiones(mesesFinalesDeS, mesesPorPeriodo, datos, colFecha, fechaFinReporte, nDivisiones)
}


export const extraerUltimosPeriodos = (division, datos, colFecha, fechaFinal=new Date(), nDivisiones=N_DIVISIONES) => {
  switch (division) {
    case 'mensual':
      return extraerUltimosM(datos, colFecha, fechaFinal, nDivisiones)
    case 'trimestral':
      return extraerUltimosQ(datos, colFecha, fechaFinal, nDivisiones)
    case 'cuatrimestral':
      return extraerUltimosC(datos, colFecha, fechaFinal, nDivisiones)
    case 'semestral':
      return extraerUltimosS(datos, colFecha, fechaFinal, nDivisiones)
    default:
      return {
        labels: [],
        datos: []
      }
  }
}

export const getBoxPlotData = (datos, nombre, concentracion = null) => {
  if (datos.length === 0) {
    return {
      nombre,
      promedio: 0,
      iqr: 0,
      iqrMitadInferior: 0,
      iqrMitadSuperior: 0,
      mediana: 0,
      max: 0,
      min: 0,
    }
  }
  const values = datos.map(obj => obj[colPPB] / 1000)
  const args = { maximumFractionDigits: 1, minimumFractionDigits: 1 }
  let dat = {
    nombre,
    promedio: concentracion !== null && concentracion.prom !== "" ? concentracion.prom : mean(values),
    ...iqrValues(values),
    max: concentracion !== null && concentracion.max !== "" ? concentracion.max : Math.max(...values),
    min: concentracion !== null && concentracion.min !== "" ? concentracion.min : Math.min(...values),
  }
  if (concentracion !== null && concentracion.q2 !== "" ) {
    dat = {
      ...dat,
      ...iqrValuesFixed(concentracion.q2, concentracion.q3, concentracion.q4)
    }
  }
  return dat;
}


export const getEficacia = (datos, decimales) => {
  if (datos.every(obj => obj[colEficaciaEficacia])) {
    const promedioEficacia = mean(datos.map(obj => obj[colEficaciaEficacia])) * Math.pow(10, decimales)
    return Math.round(promedioEficacia) / Math.pow(10, decimales) 
  }
  else {
    return 0
  }
}

const getDiferenciaMeses = (fechaFinal, fechaInicial) => {
  const diffTime = Math.abs(fechaFinal - new Date(fechaInicial))
  if (diffTime < 0) return 0
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.4)); 
  return Math.round(diffDays * 100) / 100 
}

export const getEficaciaSegunFecha = (datos, fechaFinal, decimales) => {
  const promedioEficacia = mean(datos.map(e => getDiferenciaMeses(fechaFinal, e[colFechaEficacia])))
  return Math.round(promedioEficacia * Math.pow(10, decimales)) / Math.pow(10, decimales)
}

export const getEficaciaMacrozona = (datos, zona) => {
  if (datos[zona]) {
    const datosDisponibles = datos[zona].map(obj => obj[colEficaciaEficacia]).filter(e => e)
    if (datosDisponibles.length === 0) return '-'
    return Math.round(mean(datosDisponibles) * 10) / 10
  }
  return '-'
}

// Agrupar segun
export const groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const asc = arr => arr.sort((a, b) => a - b);

const sum = arr => arr.reduce((a, b) => a + b, 0);

export const mean = arr => sum(arr) / arr.length;

// sample standard deviation
export const std = (arr) => {
    const mu = mean(arr);
    const diffArr = arr.map(a => (a - mu) ** 2);
    return Math.sqrt(sum(diffArr) / (arr.length - 1));
};

const quantile = (arr, q) => {
    const sorted = asc(arr);
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
        return sorted[base];
    }
};

const q25 = arr => quantile(arr, .25);

const q50 = arr => quantile(arr, .50);

const q75 = arr => quantile(arr, .75);

export const iqr = arr => q75(arr) - q25(arr)

export const iqrMitadInferior = arr => q50(arr) - q25(arr)

export const iqrMitadSuperior = arr => q75(arr) - q50(arr)

export const iqrValues = arr => {
  const q25Value = q25(arr)
  const q50Value = q50(arr)
  const q75Value = q75(arr)
  return {
    q25: q25Value,
    q75: q75Value, 
    iqr: q75Value - q25Value,
    iqrMitadInferior: q50Value - q25Value,
    iqrMitadSuperior: q75Value - q50Value,
    mediana: q50Value
  }
}

export const iqrValuesFixed = (q2, q3, q4) => {
  const q25Value = q2
  const q50Value = q3
  const q75Value = q4
  return {
    q25: q25Value,
    q75: q75Value, 
    iqr: q75Value - q25Value,
    iqrMitadInferior: q50Value - q25Value,
    iqrMitadSuperior: q75Value - q50Value,
    mediana: q50Value
  }
}

export const reemplazarNullPorCero = valor => {
  if (valor) return valor;
  return 0;
};

export const divisionTemporalALetra = periodo => {
  switch (periodo) {
    case 'mensual':
      return "M"
    case 'trimestral':
      return "Q"
    case 'cuatrimestral':
      return "C"
    case 'semestral':
      return "S"
    default:
      return "-"
  }
}

export const divisionTemporalAPalabra = periodo => {
  switch (periodo) {
    case 'mensual (M)':
      return "meses"
    case 'trimestral':
      return "trimestres (Q)"
    case 'cuatrimestral':
      return "cuatrimestres (C)"
    case 'semestral':
      return "semestres (S)"
    default:
      return "-"
  }
}

const getFechaNAnterior = (fechaFinal, nMeses, mesesFinales) => {
  const periodoActual = Math.floor(fechaFinal.getMonth() / nMeses)
  const ultimoDiaPeriodoActual = new Date(fechaFinal.getFullYear(), mesesFinales[periodoActual] + 1, 1)
  const mesUltimoDiaPeriodoActual = ultimoDiaPeriodoActual.getMonth()
  return new Date(ultimoDiaPeriodoActual.getFullYear(), mesUltimoDiaPeriodoActual - (N_DIVISIONES * nMeses), 1)
}

// Obtiene la fecha de inicio en que se filtran los datos
// consderando las últimas N_DIVISIONES temporales
export const getFechaInicio = (fechaInicial, fechaFinal, divisionTemporal) => {
  if (fechaInicial !== null) return fechaInicial;
  let mesesPorPeriodo
  let fechaNAnterior
  let mesesFinales
  switch (divisionTemporal) {
    case 'mensual':
      mesesPorPeriodo = 1
      mesesFinales = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
      fechaNAnterior = new Date(fechaFinal.getFullYear(), fechaFinal.getMonth()-N_DIVISIONES, 1)
      break
    case 'trimestral':
      mesesPorPeriodo = 3
      mesesFinales = [2, 5, 8, 11]
      fechaNAnterior = getFechaNAnterior(fechaFinal, mesesPorPeriodo, mesesFinales)
      break
    case 'cuatrimestral':
      mesesPorPeriodo = 4
      mesesFinales = [3, 7, 11]
      fechaNAnterior = getFechaNAnterior(fechaFinal, mesesPorPeriodo, mesesFinales)
      break
    case 'semestral':
      mesesPorPeriodo = 6
      mesesFinales = [5, 11]
      fechaNAnterior = getFechaNAnterior(fechaFinal, mesesPorPeriodo, mesesFinales)
      break
    default:
      mesesPorPeriodo = 3
      mesesFinales = [2, 5, 8, 11]
      fechaNAnterior = getFechaNAnterior(fechaFinal, mesesPorPeriodo, mesesFinales)
  }
  return fechaNAnterior

}