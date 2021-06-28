var XLSX = require("xlsx");

const headerAlimentos = ["Estado", "Fecha de Fabricación", "year", "Cliente", "Codigo Elanco", "Codigo Imvixa Tools", "N° informe", "Receta", "Piscicultura", "Fabricante", "Lote/Batch", "Concentración (kg med/ton pt)", "Concentración Objetivo (ppm)", "Calibre", "N° de Muestras", "Fecha Informe", "Laboratorio", "Muestra 1", "Muestra 2", "Muestra 3", "Muestra 4", "Promedio (ppm)", "Desviacion Estandar (ppm)", "Coeficiente de variacion (%)", "Cumplimiento (Logrado/Intentado)"]
const headerPMV = ["Empresa", "PMV", "Fecha PMV/fab. Medicado", "Year_month_Pmv", "Month_pmv", "Piscicultura", "Tipo de Piscicultura", "Especie", "Año Inicio Siembra", "n Peces tratados FW", "Siep"]
const headerPeces = ["Status", "Sampling date", "Year", "Report id.", "Elanco id.", "1st day of treatment", "Last day of treatment", "Company", "Sea site of destination", "Hatchery of origin", "Sample Origin", "tank/sea cage", "degree days", "PMV", "Lote Alimento 1", "Fish no.", "Imvixa [ ] in fillet (ppb)", "Fish Length (cm)", "Fish body weight (g)", "k", "Specie"]
const headerEficacia = ["Empresa", "Centro", "Barrio", "Inicio siembra", "Termino siembra", "Año de siembra", "Macrozona", "Región", "Termino Eficacia", "Meses sin bañar", "Fecha tto", "Días al 1er tto", "Mes hasta 1er baño (días/30,4)", "Semana cultivo Tratamiento"]

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
    throw Error("Hoja alimento no tiene las columnas necesarias")
  }
  // Filtrar datos por Estado Reportado
  const alimentoJsonReportado = alimentoJson.filter(row => row['Estado'] === 'Reportado')
  if (alimentoJsonReportado.length < 1) {
    throw Error("Hoja Alimento no tiene datos válidos")
  }
  return alimentoJsonReportado
};

const checkPMV = wb => {
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
  const pecesJsonReportado = pecesJson.filter(row => row['Status'] === 'Reportado')
  if (pecesJsonReportado.length < 1) {
    throw Error("Hoja Peces no tiene datos válidos")
  }
  return pecesJsonReportado
};

const checkEficacia = wb => {
  const eficaciaJson = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'])
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
  checkPMV,
  checkEficacia,
  checkPeces
}