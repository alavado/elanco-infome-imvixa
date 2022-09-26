// Utilities tiene funciones que ayudan al procesamiento de datos
// en el reducer. 
import {
  colEmpresaAlimento,
  colEmpresaPMV,
  colEmpresaEficacia,
  colEmpresaPeces,
  colFechaAlimento,
  colFechaPMV,
  colFechaEficacia,
  colFechaPeces,
  colPPB
} from '../../constants'

export const localeSort = values => values.sort((a, b) => {
  return a.localeCompare(b, 'en', { sensitivity: 'base' });
});

export const esMenorQueFecha = (fecha, fechaLimite) => {
  return new Date(fecha) <= fechaLimite;
};

export const esMayorQueFecha = (fecha, fechaLimite) => {
  if (fechaLimite === null) return true;
  return new Date(fecha) >= fechaLimite;
};

export const filtrarDatosAlimento = (
  datos,
  empresa,
  fechaInicial,
  fechaFinal
) => {
  let datosFiltrados = datos
  if (empresa !== "Todas") {
    datosFiltrados = datosFiltrados.filter((obj) => obj[colEmpresaAlimento] === empresa);
  }
  datosFiltrados = datosFiltrados.filter(
    (obj) =>
      esMenorQueFecha(obj[colFechaAlimento], fechaFinal) &&
      esMayorQueFecha(obj[colFechaAlimento], fechaInicial)
  );
  return datosFiltrados;
};

export const filtrarDatosPecesTratados = (datos, empresa, fechaInicial, fechaFinal) => {
  let datosFiltrados = datos
  if (empresa !== "Todas") {
    datosFiltrados = datosFiltrados.filter((obj) => obj[colEmpresaPMV].toLowerCase() === empresa.toLowerCase());
  }
  datosFiltrados = datosFiltrados.filter(
    (obj) =>
      esMenorQueFecha(obj[colFechaPMV], fechaFinal) &&
      esMayorQueFecha(obj[colFechaPMV], fechaInicial)
  );
  return datosFiltrados;
};

export const filtrarDatosPecesTratadosSinInicio = (datos, empresa, fechaFinal) => {
  let datosFiltrados = datos
  if (empresa !== "Todas") {
    datosFiltrados = datosFiltrados.filter((obj) => obj[colEmpresaPMV].toLowerCase() === empresa.toLowerCase());
  }
  datosFiltrados = datosFiltrados.filter(
    (obj) =>
      esMenorQueFecha(obj[colFechaPMV], fechaFinal)
  );
  return datosFiltrados;
};


// Por acuerdo con Patricio se filtran los datos de aquellos que hayan sido sembrados
// hasta la fecha final, sin considerar la fecha inicial
// SOLO VALIDO PARA LOS GRAFICOS DE EFICACIA
export const filtrarDatosEficacia = (datos, empresa, fechaFinal) => {
  let datosFiltrados = datos
  if (empresa !== "Todas") {
    datosFiltrados = datos.filter((obj) => obj[colEmpresaEficacia].toLowerCase() === empresa.toLowerCase());
  }
  datosFiltrados = datosFiltrados.filter(
    (obj) => esMenorQueFecha(obj[colFechaEficacia], fechaFinal)
  );
  return datosFiltrados;
};

export const filtrarDatosPeces = (datos, empresa, fechaInicial, fechaFinal) => {
  let datosFiltrados = datos;
  if (empresa !== "Todas") {
    datosFiltrados = datos.filter((obj) => obj[colEmpresaPeces].toLowerCase() === empresa.toLowerCase());
  }
  datosFiltrados = datosFiltrados.filter(
    (obj) =>
      esMenorQueFecha(obj[colFechaPeces], fechaFinal) &&
      esMayorQueFecha(obj[colFechaPeces], fechaInicial)
  );
  datosFiltrados = datosFiltrados.filter(obj => obj[colPPB])
  return datosFiltrados;
};

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

export const selectMinMax = (lista) => {
  if (lista.length > 0) {
  return [Math.min(...lista), Math.max(...lista)]
  } return lista
}

export const selectMinMaxFecha = (listaCompleta) => {
  let listaAFecha = listaCompleta.map(v => v.endsWith('Z') ? new Date(v) : v)
  let lista = listaAFecha.filter(v => typeof(v) === 'object')
  let listaString = listaAFecha.filter(v => typeof(v) === 'string')
  if (lista.length > 0) {
      let menor = lista[0]
      let mayor = lista[0]
      lista.forEach(v => {
        if (esMenorQueFecha(v, menor)) {
          menor = v
        }
        if (esMayorQueFecha(v, mayor)) {
          mayor = v
        }
      })
      return [menor, mayor]
  } 
  return listaString
}

export const formatearFecha = (fecha) => {
  try {
    if ((new Date(fecha) === "Invalid Date") || isNaN(new Date(fecha))) {
      return fecha.toString()
    }
    return new Date(fecha).toISOString().substring(0, 10)
  } catch (error) {
    if (fecha) {
      return fecha.toString()
    }
    return fecha
  }
}


Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export const diasAtras = (date, dias) => {
  const timestamp = new Date(date)
  return timestamp.addDays(-dias)
}