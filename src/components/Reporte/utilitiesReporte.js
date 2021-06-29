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
    console.log(sActual)
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

// Agrupar segun
export const groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};