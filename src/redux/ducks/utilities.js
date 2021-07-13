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

const esMenorQueFecha = (fecha, fechaLimite) => {
  return new Date(fecha) <= fechaLimite;
};

const esMayorQueFecha = (fecha, fechaLimite) => {
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

export const filtrarDatosTratamiento = (datos, empresa, fechaInicial, fechaFinal) => {
  let datosFiltrados = datos
  if (empresa !== "Todas") {
    datosFiltrados = datosFiltrados.filter((obj) => obj[colEmpresaPMV] === empresa);
  }
  datosFiltrados = datosFiltrados.filter(
    (obj) =>
      esMenorQueFecha(obj[colFechaPMV], fechaFinal) &&
      esMayorQueFecha(obj[colFechaPMV], fechaInicial)
  );
  return datosFiltrados;
};

// Por acuerdo con Patricio se filtran los datos de aquellos que hayan sido sembrados
// en el rango de fechas determinado
export const filtrarDatosEficacia = (datos, empresa, fechaInicial, fechaFinal) => {
  let datosFiltrados = datos
  if (empresa !== "Todas") {
    datosFiltrados = datos.filter((obj) => obj[colEmpresaEficacia] === empresa);
  }
  datosFiltrados = datosFiltrados.filter(
    (obj) =>
      esMenorQueFecha(obj[colFechaEficacia], fechaFinal) &&
      esMayorQueFecha(obj[colFechaEficacia], fechaInicial)
  );
  return datosFiltrados;
};

// TODO: Confirmar con patricio si Sampling date es la columna que filtrar por fecha
export const filtrarDatosPeces = (datos, empresa, fechaInicial, fechaFinal) => {
  let datosFiltrados = datos;
  if (empresa !== "Todas") {
    datosFiltrados = datos.filter((obj) => obj[colEmpresaPeces] === empresa);
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
