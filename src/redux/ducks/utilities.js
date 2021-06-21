// Utilities tiene funciones que ayudan al procesamiento de datos
// en el reducer. Hay funciones que hacen referencia a columnas
// de las planillas de datos, por lo que si cambian los encabezados
// de las planillas, se debe actualizar este archivo.

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
  let datosFiltrados;
  if (empresa !== "Todas") {
    datosFiltrados = datos.filter((obj) => obj["Cliente"] === empresa);
  }
  datosFiltrados = datosFiltrados.filter(
    (obj) =>
      esMenorQueFecha(obj["Fecha de Fabricación"], fechaFinal) &&
      esMayorQueFecha(obj["Fecha de Fabricación"], fechaInicial)
  );
  return datosFiltrados;
};

export const filtrarDatosPMV = (datos, empresa, fechaInicial, fechaFinal) => {
  let datosFiltrados;
  if (empresa !== "Todas") {
    datosFiltrados = datos.filter((obj) => obj["Empresa"] === empresa);
  }
  console.log(datosFiltrados)
  console.log(empresa)
  datosFiltrados = datosFiltrados.filter(
    (obj) =>
      esMenorQueFecha(obj["Fecha PMV/fab. Medicado"], fechaFinal) &&
      esMayorQueFecha(obj["Fecha PMV/fab. Medicado"], fechaInicial)
  );
  return datosFiltrados;
};

export const filtrarDatosEficacia = (datos, empresa, fechaInicial, fechaFinal) => {
  let datosFiltrados;
  if (empresa !== "Todas") {
    datosFiltrados = datos.filter((obj) => obj["Empresa"] === empresa);
  }
  console.log(datosFiltrados)
  console.log(empresa)
  datosFiltrados = datosFiltrados.filter(
    (obj) =>
      esMenorQueFecha(obj["Fecha PMV/fab. Medicado"], fechaFinal) &&
      esMayorQueFecha(obj["Fecha PMV/fab. Medicado"], fechaInicial)
  );
  return datosFiltrados;
};

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};
