var XLSX = require("xlsx");

const headerAlimentos = ["estado", "company_code", "hatchery_code", "cantidad_programada_por_receta_kg", "cumplimiento_logrado_intentado", "n_de_muestras", "fecha_de_fabricacion", "fabricante"]
const estadoAlimento = headerAlimentos[0]
const headerPMV = []
const headerPeces = ["elanco_id", "company_code", "hatchery_code", "seasite_code", "sampling_date", "sample_origin", "tank_sea_cage", "peso_al_inicio_tto", "fish_no", "imvixa_in_fillet_ppb", "fish_length_cm", "fish_body_weight_g"]
const estadoPeces = headerPeces[0]
const headerEficacia = ["company_code","seasite_code", "inicio_siembra", "macrozona", "region", "mes_hasta_1er_bano_dias_30_4"]

const checkAlimento = wb => {
  // abrir hoja Alimento
  const alimentoJson = XLSX.utils.sheet_to_json(wb.Sheets['Alimento'])
  // Revisar que tenga datos
  if (alimentoJson.length < 1) {
    throw Error("Hoja Alimento no tiene datos")
  }
  const headerJson = Object.keys(alimentoJson[0])
  // Revisar que tenga las columnas de alimento
  if (!headerAlimentos.every(element => headerJson.includes(element))) {
    console.log(headerJson)
    console.log(headerAlimentos)
    console.log(alimentoJson.length)
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
  const pmvJson = XLSX.utils.sheet_to_json(wb.Sheets['PMV']);
  // Revisar que tenga datos
  if (pmvJson.length < 1) {
    throw Error("Hoja PMV no tiene datos");
  }
  const headerPMVJson = Object.keys(pmvJson[0]);
  // Revisar que tenga las columnas de PMV
  if (!headerPMV.every(element => headerPMVJson.includes(element))) {
    throw Error("Hoja PMV no tiene las columnas necesarias");
  }
  return pmvJson;
}

const checkPeces = wb => {
  const pecesJson = XLSX.utils.sheet_to_json(wb.Sheets['Peces'])
  // Revisar que tenga datos
  if (pecesJson.length < 1) {
    throw Error("Planilla Peces no tiene datos")
  }
  const headerJson = Object.keys(pecesJson[0])
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
  const eficaciaJson = XLSX.utils.sheet_to_json(wb.Sheets['Sheet 1'])
  // Revisar que tenga datos
  if (eficaciaJson.length < 1) {
    throw Error("Planilla Eficacia no tiene datos")
  }
  const headerJson = Object.keys(eficaciaJson[0])
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