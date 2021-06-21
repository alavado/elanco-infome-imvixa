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
  // let datosFiltrados;
  // if (empresa !== "Todas") {
  //   datosFiltrados = datos.filter((obj) => obj["Cliente"] === empresa);
  // }
  // datosFiltrados = datosFiltrados.filter(
  //   (obj) =>
  //     esMenorQueFecha(obj["Fecha de Fabricación"], fechaFinal) &&
  //     esMayorQueFecha(obj["Fecha de Fabricación"], fechaInicial)
  // );
  // return datosFiltrados;
};

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};
