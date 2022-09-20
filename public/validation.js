var XLSX = require("xlsx");

//const headerAlimentos = ["estado", "company_code", "hatchery_code", "cantidad_programada_por_receta_kg", "cumplimiento_logrado_intentado", "n_de_muestras", "fecha_de_fabricacion", "planta_code"]
const headerAlimentos = [
  "Estado",
  "year",
  "Cliente",
  "Piscicultura",
  "Cantidad Programada por receta (kg)",
  "Cumplimiento (Logrado/Intentado)",
  "N° de Muestras",
  "Fecha de Fabricación",
  "Fabricante",
  "Lote/Batch",
  "Receta",
  "N° informe",
  "Concentración Objetivo (ppm)",
  "Muestra 1",
  "Muestra 2",
  "Muestra 3",
  "Muestra 4",
  "Muestra 5",
  "Muestra 6",
  "Muestra 7",
  "Muestra 8",
  "Muestra 9",
  "Muestra 10",
  "Muestra 11",
  "Muestra 12",
  "Muestra 13",
  "Muestra 14",
  "Muestra 15",
  "Muestra 16",
  "Promedio (ppm)",
  "Desviacion Estandar (ppm)",
  "Coeficiente de variacion (%)",
  "Calibre",
];
const estadoAlimento = headerAlimentos[0];
const headerPecesHojaImvixa = [
  "Sampling date",
  "Elanco id.",
  "Company",
  "Hatchery of origin",
  "Sample Origin",
  "tank/sea cage",
  "Fish no.",
  "Imvixa [] in fillet (ppb)",
  "Fish Length (cm)",
  "Fish body weight (g)",
];

const headerPecesHojaTrat = [
  "Company", 
  "Sea site of destination", 
  "Peso al Inicio Tto"
];

const headerTrat = [
  "Empresa", 
  "peces tratados",
  "tipo",
  "Fecha inicio "
];

const headerEficacia = [
  "Empresa",
  "Centro",
  "Inicio siembra",
  "Macrozona",
  "Región",
  "Mes hasta 1er baño (días/30,4)",
  "Causa",
];

function get_header_row(sheet) {
  var headers = [];
  var range = XLSX.utils.decode_range(sheet["!ref"]);
  var C,
    R = range.s.r; /* start in the first row */
  /* walk every column in the range */
  for (C = range.s.c; C <= range.e.c; ++C) {
    var cell =
      sheet[
        XLSX.utils.encode_cell({ c: C, r: R })
      ]; /* find the cell in the first row */

    var hdr = "UNKNOWN " + C; // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);

    headers.push(hdr);
  }
  return headers;
}

const checkAlimento = (wb) => {
  // abrir hoja Alimento
  const sheetName = wb.SheetNames[0];
  const headerJson = get_header_row(wb.Sheets[sheetName]);
  const alimentoJson = XLSX.utils.sheet_to_json(
    wb.Sheets[sheetName],
    (header = headerJson),
    (range = 2)
  );
  // Revisar que tenga datos
  if (alimentoJson.length < 1) {
    throw Error("Hoja Alimento no tiene datos");
  }
  // Revisar que tenga las columnas de alimento
  if (!headerAlimentos.every((element) => headerJson.includes(element))) {
    throw Error("Hoja alimento no tiene las columnas necesarias");
  }
  // Filtrar datos por estado Reportado
  const alimentoJsonReportado = alimentoJson.filter(
    (row) => row[estadoAlimento] === "Reportado"
  );
  if (alimentoJsonReportado.length < 1) {
    throw Error("Hoja Alimento no tiene datos válidos");
  }
  return alimentoJsonReportado;
};

const checkPecesHojaTratamiento = (wb) => {
  // abrir hoja BD Trat
  const sheetName = wb.SheetNames.find((v) => v.toLowerCase().includes("trat"));
  if (!sheetName) {
    throw Error(
      "Hoja de registro de tratamientos no encontrada: el nombre de la hoja debe incluir 'trat'"
    );
  }
  const headerJSON = get_header_row(wb.Sheets[sheetName]);
  const tratJSON = XLSX.utils.sheet_to_json(
    wb.Sheets[sheetName],
    (header = headerJSON),
    (range = 2)
  );
  // Revisar que tenga datos
  if (tratJSON.length < 1) {
    throw Error("Hoja BD Trat no tiene datos");
  }
  // Revisar que tenga las columnas de PMV
  if (!headerPecesHojaTrat.every((element) => headerJSON.includes(element))) {
    throw Error("Hoja BD Trat no tiene las columnas necesarias");
  }
  return tratJSON;
};

const checkPecesHojaImvixa = (wb) => {
  const sheetName = wb.SheetNames.find((v) =>
    v.toLowerCase().includes("imvixa")
  );
  if (!sheetName) {
    throw Error(
      "Hoja de registro BD Imvixa no encontrada: el nombre de la hoja debe incluir 'imvixa'"
    );
  }
  const headerJson = get_header_row(wb.Sheets[sheetName]);
  const pecesJson = XLSX.utils.sheet_to_json(
    wb.Sheets[sheetName],
    (header = headerJson),
    (range = 2)
  );
  // Revisar que tenga datos
  if (pecesJson.length < 1) {
    throw Error("Planilla Peces no tiene datos");
  }
  // Revisar que tenga las columnas de peces
  if (!headerPecesHojaImvixa.every((element) => headerJson.includes(element))) {
    throw Error("Planilla Peces no tiene las columnas necesarias");
  }
  // const pecesJsonReportado = pecesJson.filter(row => row[estadoPeces] === 'Reportado')
  // if (pecesJsonReportado.length < 1) {
  //   throw Error("Hoja Peces no tiene datos válidos")
  // }
  return pecesJson; // pecesJsonReportado
};

const checkEficacia = (wb) => {
  const sheetName = wb.SheetNames.find((v) => v.toLowerCase().includes("eficacia"));
  const headerJson = get_header_row(wb.Sheets[sheetName]);
  const eficaciaJson = XLSX.utils.sheet_to_json(
    wb.Sheets[sheetName],
    (header = headerJson),
    (range = 2)
  );
  // Revisar que tenga datos
  if (eficaciaJson.length < 1) {
    throw Error("Planilla Eficacia no tiene datos");
  }
  // Revisar que tenga las columnas de peces
  if (!headerEficacia.every((element) => headerJson.includes(element))) {
    throw Error("Planilla Eficacia no tiene las columnas necesarias");
  }
  const cleanEficacia = eficaciaJson.map(v => {
    cleanRow = {}
    headerEficacia.forEach(h => {
      cleanRow[h] = v[h]
    })
    return {
      ...cleanRow,
      hexaflumuron: v['Causa'] ? v['Causa'].toString().toLowerCase().includes('hexa') : false
    }
  })
  return cleanEficacia;
};

const checkTratamiento = (wb) => {
  const sheetsNames = []
  wb.SheetNames.forEach((sheet, i) => {
    const headerJSON = get_header_row(wb.Sheets[sheet]);
    // Revisar que tenga las columnas de PMV
    if (headerTrat.every((element) => headerJSON.includes(element))) {
      sheetsNames.push(sheet)
    }
  }) 

  if (sheetsNames.length === 0) {
    throw Error("Planilla no tiene hojas con las columnas necesarias");
  }
  const tratJSON = []
  sheetsNames.forEach((sheet, i) => {
    const headerJSON = get_header_row(wb.Sheets[sheet]);
    sheetData = XLSX.utils.sheet_to_json(
      wb.Sheets[sheet],
      (header = headerJSON),
      (range = 2)
    )
    if (sheetData.length >= 1) {
      tratJSON.push(...sheetData);
    }
  })
  // Revisar que tenga datos
  if (tratJSON.length < 1) {
    throw Error("Hoja BD Trat no tiene datos");
  }
  return tratJSON;
};

module.exports = {
  checkAlimento,
  checkTratamiento,
  checkPecesHojaImvixa,
  checkPecesHojaTratamiento,
  checkEficacia,
};
