const N_DIVISIONES = 5

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
const std = (arr) => {
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


export const getFechaInicio = (fechaInicial, fechaFinal, divisionTemporal) => {
  if (fechaInicial !== null) return fechaInicial;
  const esteAño = new Date().getFullYear()
  const añoPasado = esteAño - 1
  let fechaAñoPasado
  const fechaInicioAñoPasado = new Date(`01-01-${añoPasado}`)
  const fecha18mAtras = new Date(fechaFinal.getFullYear(), fechaFinal.getMonth()-18, 1)
  // la fecha año anterior o 18 meses atras
  if (fecha18mAtras < fechaInicioAñoPasado) {
    fechaAñoPasado = fecha18mAtras
    console.log({fecha18mAtras})
  } else {
    fechaAñoPasado = fechaInicioAñoPasado
    console.log({fechaInicioAñoPasado})
  }
  // la fechaAñoPasado o 5 divisiones temporales 
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
  }
  if (fechaAñoPasado < fechaNAnterior) return fechaAñoPasado
  return fechaNAnterior

}