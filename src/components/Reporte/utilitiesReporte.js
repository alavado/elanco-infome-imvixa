const N_DIVISIONES = 5

// Retorna un arreglo de nDivisiones elementos, con los datos
// del mes actual y los meses anteriores en orden cronologico
const dividirEnM = (datos, colFecha, fechaFinReporte, nDivisiones) => {
  let fechaActual = new Date(fechaFinReporte)
  let mesActual = fechaActual.getMonth()
  const meses = []
  for (var i = 0; i < nDivisiones; i++) {
    meses.unshift(datos.filter(obj => new Date(obj[colFecha]).getMonth() === mesActual))
    fechaActual.setMonth(mesActual - 1);
    mesActual = fechaActual.getMonth()
  }
  return meses
}

// Retorna un arreglo de nDivisiones elementos, con los datos
// del Q actual y los Q anteriores en orden cronologico.
// El índice 0 tiene los datos del Q más viejo
const dividirEnQ = (datos, colFecha, fechaFinReporte, nDivisiones) => {
  const mesesFinalesDeQ = [2, 5, 8, 11]
  const mesesPorPeriodo = 3
  let fechaActual = new Date(fechaFinReporte)
  let qActual = Math.floor(fechaActual.getMonth() / mesesPorPeriodo)
  let ultimoDiaQActual = new Date(fechaActual.getFullYear(), mesesFinalesDeQ[qActual] + 1, 0)
  let mesUltimoDiaQActual = ultimoDiaQActual.getMonth()
  let ultimoDiaQAnterior = new Date(ultimoDiaQActual)
  ultimoDiaQAnterior.setMonth(mesUltimoDiaQActual - mesesPorPeriodo)
  const qs = []
  for (var i = 0; i < nDivisiones; i++) {
    qs.unshift(datos.filter(obj => {
      const fecha = new Date(obj[colFecha])
      return fecha <= ultimoDiaQActual && fecha > ultimoDiaQAnterior
    }))
    ultimoDiaQActual.setMonth(mesUltimoDiaQActual - mesesPorPeriodo);
    mesUltimoDiaQActual = ultimoDiaQActual.getMonth()
    ultimoDiaQAnterior.setMonth(mesUltimoDiaQActual - mesesPorPeriodo);
  }
  return qs
}

const dividirEnC = (datos, colFecha, fechaFinReporte, nDivisiones) => {
  const mesesFinalesDeC = [3, 7, 11]
  const mesesPorPeriodo = 4
  let fechaActual = new Date(fechaFinReporte)
  let cActual = Math.floor(fechaActual.getMonth() / mesesPorPeriodo)
  let ultimoDiaCActual = new Date(fechaActual.getFullYear(), mesesFinalesDeC[cActual] + 1, 0)
  let mesUltimoDiaCActual = ultimoDiaCActual.getMonth()
  let ultimoDiaCAnterior = new Date(ultimoDiaCActual)
  ultimoDiaCAnterior.setMonth(mesUltimoDiaCActual - mesesPorPeriodo)
  const cs = []
  for (var i = 0; i < nDivisiones; i++) {
    cs.unshift(datos.filter(obj => {
      const fecha = new Date(obj[colFecha])
      return fecha <= ultimoDiaCActual && fecha > ultimoDiaCAnterior
    }))
    ultimoDiaCActual.setMonth(mesUltimoDiaCActual - mesesPorPeriodo);
    mesUltimoDiaCActual = ultimoDiaCActual.getMonth()
    ultimoDiaCAnterior.setMonth(mesUltimoDiaCActual - mesesPorPeriodo);
  }
  return cs
}

const dividirEnS = (datos, colFecha, fechaFinReporte, nDivisiones) => {
  const mesesFinalesDeS = [5, 11]
  const mesesPorPeriodo = 6
  let fechaActual = new Date(fechaFinReporte)
  let sActual = Math.floor(fechaActual.getMonth() / mesesPorPeriodo)
  let ultimoDiaSActual = new Date(fechaActual.getFullYear(), mesesFinalesDeS[sActual] + 1, 0)
  let mesUltimoDiaSActual = ultimoDiaSActual.getMonth()
  let ultimoDiaSAnterior = new Date(ultimoDiaSActual)
  ultimoDiaSAnterior.setMonth(mesUltimoDiaSActual - mesesPorPeriodo)
  const cs = []
  for (var i = 0; i < nDivisiones; i++) {
    cs.unshift(datos.filter(obj => {
      const fecha = new Date(obj[colFecha])
      return fecha <= ultimoDiaSActual && fecha > ultimoDiaSAnterior
    }))
    ultimoDiaSActual.setMonth(mesUltimoDiaSActual - mesesPorPeriodo);
    mesUltimoDiaSActual = ultimoDiaSActual.getMonth()
    ultimoDiaSAnterior.setMonth(mesUltimoDiaSActual - mesesPorPeriodo);
  }
  return cs
}

export const dividirDatosSegun = (division, datos, colFecha, fechaFinal=new Date(), nDivisiones=N_DIVISIONES) => {
  console.log(division)
  switch (division) {
    case 'mensual':
      console.log("1")
      return dividirEnM(datos, colFecha, fechaFinal, nDivisiones)
    case 'trimestral':
      console.log("2")
      return dividirEnQ(datos, colFecha, fechaFinal, nDivisiones)
    case 'cuatrimestral':
      console.log("3")
      return dividirEnC(datos, colFecha, fechaFinal, nDivisiones)
    case 'semestral':
      console.log("4")
      return dividirEnS(datos, colFecha, fechaFinal, nDivisiones)
    default:
      console.log("5")
      return []
  }
}