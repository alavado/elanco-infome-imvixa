
// Columnas para filtrar hoja alimento
export const colEmpresaAlimento = "Cliente"
export const colFechaAlimento = "Fecha de Fabricación"
export const colNMuestrasAlimento = "N° de Muestras"
export const colPisciculturaAlimento = "Piscicultura"
export const colCumplimiento = "Cumplimiento (Logrado/Intentado)"
export const colPlanta = "Fabricante"
export const colAñoAlimento = "year"
export const colRecetaAlimento = "Receta"
export const colInformeAlimento = "N° informe"
export const colLoteAlimento = "Lote/Batch"
export const colCantidadProgramadaAlimento = "Cantidad Programada por receta (kg)"
export const colConcentracionObjetivo = "Concentración Objetivo (ppm)"
export const colAlimentoMuestra = "Muestra "
export const colAlimentoM1 = "Muestra 1"
export const colAlimentoM2 = "Muestra 2"
export const colAlimentoM3 = "Muestra 3"
export const colAlimentoM4 = "Muestra 4"
export const colAlimentoProm = "Promedio (ppm)"
export const colAlimentoSTD = "Desviacion Estandar (ppm)"
export const colAlimentoCV = "Coeficiente de variacion (%)"
export const colAlimentoCalibre = "Calibre"

// Columnas para filtrar hoja pmv
export const colEmpresaPMV = "Company"
export const colFechaPMV = "fecha_pmv"  // no existe pero si la comento no corre
export const colTipoPMV = "tipo_pisc" // no existe pero si la comento no corre
export const colNPecesPMV = "n_peces_tratados_fw" // no existe pero si la comento no corre
export const tipoRecPMV = "Recirculación"
export const tipoFAPMV = "Flujo Abierto"

// Columnas para filtrar hoja BD trat
export const colEmpresaTrat = "Company"
export const colFechaTrat = "Sampling date"
export const colInformePecesTrat = "Elanco id."
export const colInformePecesRTrat = "Report id."
export const colDestinoTrat = "Sea site of destination"
export const colPesoInicialTrat = "Peso al Inicio Tto"
export const colFechaVeranoTrat = "Fecha inicio verano"
export const colFechaInicioTrat = "1st day of treatment"
export const colFechaTerminoTrat = "Last day of treatment"
export const colPMVTrat = "PMV"
export const colLote1Trat = "Lote Alimento 1"
export const colLote2Trat = "Lote Alimento 2"
export const colLote3Trat = "Lote Alimento 3"
export const colLote4Trat = "Lote Alimento 4"

// Columnas para filtrar hoja BD imvixa
export const colEmpresaPeces = "Company"
export const colFechaPeces = "Sampling date"
export const colPisciculturaPeces = "Hatchery of origin"
export const colPeso1 = "peso_al_inicio_tto" // no existe pero si la comento no corre
export const colPeso2 = "Fish body weight (g)"
export const colPPB = "Imvixa [] in fillet (ppb)"
export const colNumeroPezPeces = "Fish no."
export const colEstanquePeces = "tank/sea cage"
export const colInformePeces = "Elanco id."
export const colInformePecesR = "Report id."
export const colSampleOrigin = "Sample Origin"
export const tipoFreshWater = "FW"
export const tipoSeaWater = "SW"
export const colCentroPeces = "seasite_code"

// Columnas para filtrar hoja eficacia
export const colEmpresaEficacia = "company_code"
export const colFechaEficacia = "inicio_siembra"
export const colMacrozonaEficacia = "macrozona"
export const colEficaciaEficacia = "mes_hasta_1er_bano_dias_30_4"
export const colHexaEficacia = "hexaflumuron"
export const colCentroEficacia = "seasite_code"

export const comentarioBajoCumplimiento = "Los resultados obtenidos de incorporación de Imvixa en el alimento son bajos. Se recomienda suplementar con un nuevo lote de alimento fabricado para este fin, así alcanzar niveles adecuados de dosificación en los peces."
export const comentarioAltoCumplimiento = "Los resultados obtenidos de incorporación de Imvixa en el alimento se encuentran dentro de los parámetros esperados."