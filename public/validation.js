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
const estadoPeces = 'Status';
const headerPecesHojaImvixa = [
  "Status",
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
  "Fecha inicio"
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

const productColumn = "estrategia"

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

function trimKeys(anObject) {
  return Object.entries(anObject).reduce((acc, curr) => ({...acc, [curr[0].trim()]: curr[1]}), {})
}

const checkAlimento = (wb, product) => {
  // abrir hoja Alimento
  const sheetName = 'Alimentos';
  const headerJson = get_header_row(wb.Sheets[sheetName]);
  const alimentoJson = XLSX.utils.sheet_to_json(
    wb.Sheets[sheetName],
    {header: headerJson, skipHidden: true, range: 2}
  ).map(row => trimKeys(row));

  // Revisar que tenga datos
  if (alimentoJson.length < 1) {
    throw Error("Hoja Alimento no tiene datos");
  }
  // Revisar que tenga las columnas de alimento
  const headerTrimmed = headerJson.map(v => v.trim())
  if (!headerAlimentos.every((element) => headerTrimmed.includes(element))) {
    throw Error(`Hoja alimento no tiene las columnas necesarias: ${headerAlimentos.join(',')}`);
  }
  console.log({product})
  const skipFilterByProduct = product.all;
  const productName = product.titulo;
  const validStrategies = product.estrategia.map(v => v.toLowerCase());
  const productHeader = headerJson.find(h => h.toLowerCase().trim() === productColumn)
  console.log({
    productHeader
  })
  if (!skipFilterByProduct && productHeader === undefined) {
    throw Error(`Planilla no tiene hojas con la columna Estrategia ${productName}`);
  }
  // Filtrar datos por estado Reportado y producto
  const alimentoJsonReportado = alimentoJson.filter(
    (row) => row[estadoAlimento] === "Reportado" &&
    (skipFilterByProduct || validStrategies.includes(row[productHeader]?.toLowerCase()))
  );
  if (alimentoJsonReportado.length < 1) {
    throw Error("Hoja Alimento no tiene datos válidos");
  }
  return alimentoJsonReportado;
};

const checkPecesHojaTratamiento = (path, product) => {
  wb  = XLSX.readFile(path, { type: "binary", cellDates: true, sheetRows: 2});
  const checkSheetName = wb.SheetNames.find((v) =>
    v.toLowerCase().includes("trat")
    );
  if (!checkSheetName) {
    throw Error(
      "Hoja de registro de tratamientos no encontrada: el nombre de la hoja debe incluir 'trat'"
    );
  }
  // abrir hoja BD Trat
  wb = XLSX.readFile(path, { type: "binary", cellDates: true, sheets: checkSheetName});
  const sheetName = checkSheetName
  const headerJSON = get_header_row(wb.Sheets[sheetName]);
  const tratJSON = XLSX.utils.sheet_to_json(
    wb.Sheets[sheetName],
    (header = headerJSON),
    (range = 2)
  ).map(row => trimKeys(row));
  // Revisar que tenga datos
  if (tratJSON.length < 1) {
    throw Error("Hoja BD Trat no tiene datos");
  }
  // Revisar que tenga las columnas de PMV
  const headerTrimmed = headerJSON.map(v => v.trim())
  if (!headerPecesHojaTrat.every((element) => headerTrimmed.includes(element))) {
    throw Error(`Hoja BD Trat no tiene las columnas necesarias: ${headerPecesHojaTrat.join(',')}`);
  }

  const skipFilterByProduct = product.all;
  const productName = product.titulo;
  const validStrategies = product.estrategia.map(v => v.toLowerCase());

  const productHeader = headerTrimmed.find(h => h.toLowerCase() === productColumn)
  if (!skipFilterByProduct && productHeader === undefined) {
    throw Error(`Planilla no tiene hojas con la columna Estrategia ${productName}`);
  }
  // Filter by product
  const tratFiltered = tratJSON.filter(row =>
      skipFilterByProduct || validStrategies.includes(row[productHeader]?.toLowerCase())
  );

  if (tratFiltered.length < 1) {
    throw Error("Hoja Alimento no tiene datos válidos");
  }
  return tratFiltered;
};

const checkPecesHojaImvixa = (path, product) => {
  console.time('checkPecesHojaImvixa read')
  wb  = XLSX.readFile(path, { type: "binary", cellDates: true, sheetRows: 2});
  console.timeEnd('checkPecesHojaImvixa read')
  console.time('checkPecesHojaImvixa validate sheet')
  const checkSheetName = wb.SheetNames.find((v) =>
    v.toLowerCase().includes("imvixa")
    );
  if (!checkSheetName) {
    throw Error(
      "Hoja de registro BD Imvixa no encontrada: el nombre de la hoja debe incluir 'imvixa'"
    );
  }
  console.timeEnd('checkPecesHojaImvixa validate sheet')

  console.time('checkPecesHojaImvixa read again')
  const sheetName = checkSheetName;

  wb = XLSX.readFile(path, { type: "binary", cellDates: true, sheets: sheetName});
  console.timeEnd('checkPecesHojaImvixa read again')

  console.time('get data')
  const headerJson = get_header_row(wb.Sheets[sheetName]);
  const pecesJson = XLSX.utils.sheet_to_json(
    wb.Sheets[sheetName],
    (header = headerJson),
    (range = 2)
  ).map(row => trimKeys(row));
  // Revisar que tenga datos
  if (pecesJson.length < 1) {
    throw Error("Planilla Peces no tiene datos");
  }
  // Revisar que tenga las columnas de peces
  const headerTrimmed = headerJson.map(v => v.trim())
  if (!headerPecesHojaImvixa.every((element) => headerTrimmed.includes(element))) {
    throw Error(`Planilla Peces no tiene las columnas necesarias: ${headerPecesHojaImvixa.join(',')}`);
  }
  const skipFilterByProduct = product.all;
  const productName = product.titulo;
  const validStrategies = product.estrategia.map(v => v.toLowerCase());
  const productHeader = headerJson.find(h => h.toLowerCase().trim() === productColumn)
  if (!skipFilterByProduct && productHeader === undefined) {
    throw Error(`Planilla no tiene hojas con la columna Estrategia ${productName}`);
  }
  // Filter by status and product
  const pecesJsonReportado = pecesJson.filter(row => 
    (row[estadoPeces] === 'Reportado') &&
    (skipFilterByProduct || validStrategies.includes(row[productHeader]?.toLowerCase()))
  )
  if (pecesJsonReportado.length < 1) {
    throw Error("Hoja Peces no tiene datos válidos")
  }
  console.timeEnd('get data')

  return pecesJsonReportado;
};

const checkEficacia = (wb, product) => {
  const sheetName = wb.SheetNames.find((v) => v.toLowerCase().includes("eficacia"));
  const headerJson = get_header_row(wb.Sheets[sheetName]);
  const eficaciaJson = XLSX.utils.sheet_to_json(
    wb.Sheets[sheetName],
    (header = headerJson),
    (range = 2)
  ).map(row => trimKeys(row));
  // Revisar que tenga datos
  if (eficaciaJson.length < 1) {
    throw Error("Planilla Eficacia no tiene datos");
  }
  // Revisar que tenga las columnas de peces
  const headerTrimmed = headerJson.map(v => v.trim())
  if (!headerEficacia.every((element) => headerTrimmed.includes(element))) {
    throw Error(`Planilla Eficacia no tiene las columnas necesarias: ${headerEficacia.join(',')}`);
  }
  const skipFilterByProduct = product.all;
  const productName = product.titulo;
  const productHeader = headerJson.find(h => h.toLowerCase().trim() === productColumn)
  const validStrategies = product.estrategia.map(v => v.toLowerCase())
  if (!skipFilterByProduct && productHeader === undefined) {
    throw Error(`Planilla no tiene hojas con la columna Estrategia ${productName}`);
  }
  // Filter by status and product
  const eficaciaFilteredAndClean = []
  for (const row of eficaciaJson) {
    if (
      skipFilterByProduct || validStrategies.includes(row[productHeader]?.toLowerCase())
    ) {
      cleanRow = {}
      headerEficacia.forEach(h => {
        cleanRow[h] = row[h]
      })
      eficaciaFilteredAndClean.push({
        ...cleanRow,
        hexaflumuron: row['Causa'] ? row['Causa'].toString().toLowerCase().includes('hexa') : false
      });
    }
  }
  return eficaciaFilteredAndClean;
};

const checkTratamiento = (wb, product) => {
  const sheetsNames = []
  const skipFilterByProduct = product.all;
  const productName = product.titulo;
  const validStrategies = product.estrategia.map(v => v.toLowerCase())

  wb.SheetNames.forEach((sheet, i) => {
    const headerJSON = get_header_row(wb.Sheets[sheet]);
    const headerJSONLC = headerJSON.map(v => v.toLowerCase().trim())
    const mandatoryHeader = [...headerTrat].map(v => v.toLowerCase())
    if (!skipFilterByProduct) {
      mandatoryHeader.push('Estrategia')
    }
    // Revisar que tenga las columnas de PMV
    if (mandatoryHeader.every((element) => headerJSONLC?.includes(element.toLowerCase()))) {
      sheetsNames.push(sheet)
    }
  }) 

  if (sheetsNames.length === 0) {
    throw Error(`Planilla no tiene hojas con las columnas necesarias: ${headerTrat.join(',')}`);
  }

  let productHeader;
  const tratJSON = []
  sheetsNames.forEach((sheet, i) => {
    const headerJSON = get_header_row(wb.Sheets[sheet]);
    sheetData = XLSX.utils.sheet_to_json(
      wb.Sheets[sheet],
      (header = headerJSON),
      (range = 2)
    ).map(row => trimKeys(row))
    productHeader = headerJSON.find(h => h.toLowerCase().trim() === productColumn)
    // Filter by product
    const validRows = sheetData.filter(row => (skipFilterByProduct || validStrategies.includes(row[productHeader]?.toLowerCase())))
    tratJSON.push(...validRows)
  })
  // Revisar que tenga datos
  if (tratJSON.length < 1) {
    throw Error("BD Tratamiento no tiene datos válidos");
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
