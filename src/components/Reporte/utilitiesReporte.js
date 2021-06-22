const N_DIVISIONES = 5


const esMenorOIgualQueFecha = (fecha, fechaLimite) => {
  return new Date(fecha) <= fechaLimite;
};

const esMayorEstrictoQueFecha = (fecha, fechaLimite) => {
  return new Date(fecha) > fechaLimite;
};

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

const dividirEnQ = (datos, colFecha, fechaFinReporte, nDivisiones) => {
  let fechaActual = new Date(fechaFinReporte)
  let qActual = Math.floor(fechaActual.getMonth() / 3)
  const mesesDivisoresDeQ = [2, 5, 8, 11]
  let ultimoDiaQActual = new Date(fechaActual.getFullYear(), mesesDivisoresDeQ[qActual] + 1, 0)
  let mesUltimoDiaQActual = ultimoDiaQActual.getMonth()
  let ultimoDiaQAnterior = new Date(ultimoDiaQActual)
  ultimoDiaQAnterior.setMonth(mesUltimoDiaQActual - 3)
  const qs = []
  for (var i = 0; i < nDivisiones; i++) {
    qs.unshift(datos.filter(obj => {
      const fecha = new Date(obj[colFecha])
      return esMenorOIgualQueFecha(fecha, ultimoDiaQActual) && esMayorEstrictoQueFecha(fecha, ultimoDiaQAnterior)
    }))
    ultimoDiaQActual.setMonth(mesUltimoDiaQActual - 3);
    mesUltimoDiaQActual = ultimoDiaQActual.getMonth()
    ultimoDiaQAnterior.setMonth(mesUltimoDiaQActual - 3);
  }
  return qs
}

const dividirEnC = (datos, colFecha, fechaFinReporte, nDivisiones) => {

  return []
}

const dividirEnS = (datos, colFecha, fechaFinReporte, nDivisiones) => {

  return []
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
      return []
  }
}