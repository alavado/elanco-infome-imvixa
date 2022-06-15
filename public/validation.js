var XLSX = require("xlsx");

//const headerAlimentos = ["estado", "company_code", "hatchery_code", "cantidad_programada_por_receta_kg", "cumplimiento_logrado_intentado", "n_de_muestras", "fecha_de_fabricacion", "planta_code"]
const headerAlimentos = ["Estado", "year", "Cliente", "Piscicultura", "Cantidad Programada por receta (kg)", "Cumplimiento (Logrado/Intentado)", "N° de Muestras", "Fecha de Fabricación", "Fabricante", "Lote/Batch", "Receta", "N° informe", "Concentración Objetivo (ppm)","Muestra 1","Muestra 2","Muestra 3","Muestra 4","Promedio (ppm)","Desviacion Estandar (ppm)","Coeficiente de variacion (%)", "Calibre"]
const estadoAlimento = headerAlimentos[0]
const headerPMV = ["company_code", "tipo_pisc", "n_peces_tratados_fw", "fecha_pmv"]
const headerPeces = ["elanco_id", "company_code", "hatchery_code", "seasite_code", "sampling_date", "sample_origin", "tank_sea_cage", "peso_al_inicio_tto", "fish_no", "imvixa_in_fillet_ppb", "fish_length_cm", "fish_body_weight_g"]
const headerEficacia = ["company_code","seasite_code", "inicio_siembra", "macrozona", "region", "mes_hasta_1er_bano_dias_30_4", "hexaflumuron"]

function get_header_row(sheet) {
  var headers = [];
  var range = XLSX.utils.decode_range(sheet['!ref']);
  var C, R = range.s.r; /* start in the first row */
  /* walk every column in the range */
  for(C = range.s.c; C <= range.e.c; ++C) {
      var cell = sheet[XLSX.utils.encode_cell({c:C, r:R})] /* find the cell in the first row */

      var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
      if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);

      headers.push(hdr);
  }
  return headers;
}

const checkAlimento = wb => {
  // abrir hoja Alimento
  const sheetName = wb.SheetNames[0]
  const headerJson = get_header_row(wb.Sheets[sheetName])
  const alimentoJson = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], header=headerJson, range=2)
  // Revisar que tenga datos
  if (alimentoJson.length < 1) {
    throw Error("Hoja Alimento no tiene datos")
  }
  // Revisar que tenga las columnas de alimento
  if (!headerAlimentos.every(element => headerJson.includes(element))) {
    throw Error("Hoja alimento no tiene las columnas necesarias")
  }
  // Filtrar datos por estado Reportado
  const alimentoJsonReportado = alimentoJson.filter(row => row[estadoAlimento] === 'Reportado')
  if (alimentoJsonReportado.length < 1) {
    throw Error("Hoja Alimento no tiene datos válidos")
  }
  return alimentoJsonReportado
};

const checkTratamiento = wb => {
  // abrir hoja PMV
  const sheetName = wb.SheetNames[0]
  const headerJson = get_header_row(wb.Sheets[sheetName])
  const pmvJson = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], header=headerJson, range=2)
  // Revisar que tenga datos
  if (pmvJson.length < 1) {
    throw Error("Hoja PMV no tiene datos");
  }
  // Revisar que tenga las columnas de PMV
  if (!headerPMV.every(element => headerJson.includes(element))) {
    throw Error("Hoja PMV no tiene las columnas necesarias");
  }
  return pmvJson;
}

const checkPeces = wb => {
  const sheetName = wb.SheetNames[0]
  const headerJson = get_header_row(wb.Sheets[sheetName])
  const pecesJson = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], header=headerJson, range=2)
  // Revisar que tenga datos
  if (pecesJson.length < 1) {
    throw Error("Planilla Peces no tiene datos")
  }
  // Revisar que tenga las columnas de peces
  if (!headerPeces.every(element => headerJson.includes(element))) {
    throw Error("Planilla Peces no tiene las columnas necesarias")
  }
  // const pecesJsonReportado = pecesJson.filter(row => row[estadoPeces] === 'Reportado')
  // if (pecesJsonReportado.length < 1) {
  //   throw Error("Hoja Peces no tiene datos válidos")
  // }
  return pecesJson // pecesJsonReportado
};

const checkEficacia = wb => {
  const sheetName = wb.SheetNames[0]
  const headerJson = get_header_row(wb.Sheets[sheetName])
  const eficaciaJson = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], header=headerJson, range=2)
  // Revisar que tenga datos
  if (eficaciaJson.length < 1) {
    throw Error("Planilla Eficacia no tiene datos")
  }
  // Revisar que tenga las columnas de peces
  if (!headerEficacia.every(element => headerJson.includes(element))) {
    throw Error("Planilla Eficacia no tiene las columnas necesarias")
  }
  return eficaciaJson
};

module.exports = {
  checkAlimento,
  checkTratamiento,
  checkEficacia,
  checkPeces
}