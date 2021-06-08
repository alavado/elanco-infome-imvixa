var XLSX = require("xlsx");

const headerAlimentos = ["Estado", "Fecha de Fabricación", "year", "Cliente", "Codigo Elanco", "Codigo Imvixa Tools", "N° informe", "Receta", "Piscicultura", "Fabricante", "Lote/Batch", "Concentración (kg med/ton pt)", "Concentración Objetivo (ppm)", "Calibre", "N° de Muestras", "Fecha Informe", "Laboratorio", "Muestra 1", "Muestra 2", "Muestra 3", "Muestra 4", "Promedio (ppm)", "Desviacion Estandar (ppm)", "Coeficiente de variacion (%)", "Cumplimiento (Logrado/Intentado)"]
const headerPMV = ["Empresa", "PMV", "Fecha PMV/fab. Medicado", "Year_month_Pmv", "Month_pmv", "Piscicultura", "Tipo de Piscicultura", "Especie", "Año Inicio Siembra", "n Peces tratados FW", "Siep"]

const processWb = function (wb) {
  const HTMLOUT = document.getElementById("htmlout");
  wb.SheetNames.forEach(function (sheetName) {
    const htmlstr = XLSX.utils.sheet_to_html(wb.Sheets[sheetName], {
      editable: false,
    });
    HTMLOUT.innerHTML += htmlstr;
  });
};

export const checkAlimento = (wb) => {
  try {
    // abrir hoja Alimento
    const alimentoJson = XLSX.utils.sheet_to_json(wb.Sheets['Alimento'])
    const headerJson = Object.keys(alimentoJson[0])
    // Revisar que tenga las columnas de alimento
    if (!headerAlimentos.every(element => headerJson.includes(element))) {
      throw Error("Hoja alimento no tiene las columnas necesarias")
    }
    // Revisar que tenga datos
    if (alimentoJson.length < 1) {
      throw Error("Hoja Alimento no tiene datos")
    }
    // abrir hoja PMV
    const pmvJson = XLSX.utils.sheet_to_json(wb.Sheets['PMV'])
    const headerPMVJson = Object.keys(pmvJson[0])
    // Revisar que tenga las columnas de PMV
    if (!headerPMV.every(element => headerPMVJson.includes(element))) {
      throw Error("Hoja PMV no tiene las columnas necesarias")
    }
    // Revisar que tenga datos
    if (pmvJson.length < 1) {
      throw Error("Hoja PMV no tiene datos")
    }
  } catch (error){
    console.log(error)
    throw error
  }
};

export const checkPeces = (wb) => {
  // Revisar que tenga las columnas de peces

  // Revisar que tenga datos
};

export const checkEficacia = (wb) => {
  // Revisar que tenga las columnas de eficacia

  // Revisar que tenga datos
};

export const readFile = function (files, processWb) {
  const f = files[0];
  const reader = new FileReader()
  reader.onload = function (e) {
    let data = e.target.result
    data = new Uint8Array(data)
    processWb(XLSX.read(data, { type: "array" }))

  };
  reader.readAsArrayBuffer(f)
};

export const getShortPath = path => {
  if (path.length < 50) return path;
  const splitted = path.split("\\")
  return [splitted[0], '...' , ...splitted.slice(-2)].join('\\')
}