export const generalTexts = {
  titulo1: {
    es: 'Información General',
    en: 'General information'
  },
  gt_TablaResumen: { 
    en: {
      titulo: 'Summary',
      filas: [
        "Hatchery visits",
        "Seasite visits",
        "Hatchery sample size",
        "Sea site sample size",
        "Feed sample size",
        ""
      ]
    },
    es: {
      titulo: 'Resumen',
      filas: [
        'N° visitas piscicultura',
        'N° visitas a centros de mar',
        'N° peces analizados en piscicultura',
        'N° peces analizados en centros de mar',
        'N° muestras alimento analizadas',
        'N° acumulado peces tratados RAS',
        'N° acumulado peces tratados - Flujo abierto',
        'N° acumulado total de peces tratados'
      ]
    }
  },
  gt_TablaAntecedentes: {
    en: {
      titulo: 'Treated group background',
      columna: [
        "Origin",
        "Group",
        "Cages sampled",
        "Stay at FW",
        "Dates of transferred to sea",
        "Days of production at sample date",
        "Dd at sample",
      ],
    },
    es: {
      titulo: 'Antecedentes del grupo tratado',
      columna: [
        "Origen",
        "Grupo",
        "Jaulas muestreadas",
        "Residencia en FW",
        "Fecha de traslado al mar",
        "Días cultivo al muestreo",
        "Utas al muestreo",
      ]
    }
  },
  gt_GraficoPecesTratados: {
    en: {
      titulo: 'Number of fishes treated',
      yaxis: 'Millions',
      sindatos: 'No data'
    },
    es: {
      titulo: 'N° de peces tratados',
      yaxis: 'Millones',
      sindatos: 'sin datos'
    }
  },
  gt_GraficoPesoPromedio: {
    en: {
      titulo: 'Average fish weight (g) at treatment by hatchery',
      yaxis: 'Grams',
      sindatos: 'No data'
    },
    es: {
      titulo: 'Peso promedio pez (g) al tratamiento por piscicultura',
      yaxis: 'Gramos',
      sindatos: 'Sin datos disponibles para el periodo seleccionado'
    }
  },
  gt_GraficoCumplimiento: {
    en: {
      titulo: 'In-feed concentration achieved (%)  (achieved/targeted)',
      yaxis: '% achievement',
      sindatos: 'No data',
      industria: 'Industry'
    },
    es: {
      titulo: 'Cumplimiento (%) concentración en alimento (logrado / intentado)',
      yaxis: '% de cumplimiento',
      sindatos: 'Sin datos disponibles en el periodo seleccionado',
      industria: 'Industria'
    }
  },
  gt_GraficoComparacion: {
    en: {
      titulo: 'Concentration comparison in muscle (ppb)',
      yaxis: 'Thousands',
      sindatos: 'No data',
      industria: 'Industry',
      empresa: 'Company'
    },
    es: {
      titulo: 'Comparación concentración (ppb)',
      yaxis: 'Miles',
      sindatos: 'Sin datos disponibles en el periodo seleccionado',
      industria: 'Industria',
      empresa: 'Empresa'
    }
  },
  gt_GraficoConcentracionEnMusculo: {
    en: {
      titulo: 'Post-treatment in muscle concentration [ug/kg]',
      yaxis: 'Thousands',
      sindatos: 'No data',
      sd: 'no data'
    },
    es: {
      titulo: 'Concentración (ug/kg) en músculo post tratamiento',
      yaxis: 'Miles',
      sindatos: 'Sin datos disponibles en el periodo seleccionado',
      sd: 'sin datos'
    }
  },
  ResultadosConcentracion: {
    en: 'Feed concentration and fresh water assessment',
    es: 'Resultado de concentración en alimento y agua dulce'
  },
  ResultadosEficacia: {
    en: 'Imvixa efficacy assessment',
    es: 'Resultados de eficacia Imvixa'
  },
  gt_Tratamiento: {
    en: {
      cuadradito2: 'Imvixa + other' ,
      sb: 'Sin baño',
      titulo: 'Tiempo transcurrido (meses) entre la siembra y primer tratamiento contra caligidosis',
      sindatos:'Sin datos de eficacia disponibles en los últimos 18 meses' ,
      sd: 'sin datos',
      meses: 'months',
      prind: 'Industry average',
      premp: 'Company average',
      nota: 'NOTA: Gráfico muestra eficacia de IMVIXA hasta el primer baño en centros que fueron tratados solo con IMVIXA; centros tratados con IMVIXA y otro producto antes del término de la eficacia de IMVIXA; y centros que aún no han recibido baños.'
    },
    es: {
      cuadradito2: 'Imvixa + otro' ,
      sb: 'Sin baño',
      titulo: 'Tiempo transcurrido (meses) entre la siembra y primer tratamiento contra caligidosis',
      sindatos:'Sin datos de eficacia disponibles en los últimos 18 meses' ,
      sd: 'sin datos',
      meses: 'meses',
      prind: 'PromedioIndustria',
      premp: 'Promedio Empresa',
      nota: 'NOTA: Gráfico muestra eficacia de IMVIXA hasta el primer baño en centros que fueron tratados solo con IMVIXA; centros tratados con IMVIXA y otro producto antes del término de la eficacia de IMVIXA; y centros que aún no han recibido baños.'
    }
  },
  ProteccionMacrozonas: {
    es: {
      macrozona: 'Macrozona',
      titulo: 'Protección histórica promedio industria registrada por IMVIXA por macrozona (datos desde 2016)',
      leyenda1: (nombreEmpresa) => `Macrozona sin centros de ${nombreEmpresa}`,
      leyenda2: (nombreEmpresa) => `Macrozona con centros de ${nombreEmpresa}`,
    },
    en: {
      macrozona: 'Macrozone',
      titulo: 'Protección histórica promedio industria registrada por IMVIXA por macrozona (datos desde 2016)',
      leyenda1: (nombreEmpresa) => `Macrozona sin centros de ${nombreEmpresa}`,
      leyenda2: (nombreEmpresa) => `Macrozona con centros de ${nombreEmpresa}`,
      
    }
  },
  gt_Comentarios: {
    es: 'Comentarios',
    en: 'Comments/Observations'
  },
  gt_Sandalias: {
    es: `Imvixa, Elanco y la barra diagonal son marcas registradas de Elanco o sus afiliadas. © ${new Date().getFullYear()} Elanco`,
    en: `Imvixa, Elanco and the forward slash are trademarks of Elanco or its affiliates. © ${new Date().getFullYear()} Elanco`
  }
}