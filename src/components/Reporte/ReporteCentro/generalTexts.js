export const generalTexts = {
  seccion1: {
    es: 'I. Resumen de resultados obtenidos en alimento medicado y medicación de agua dulce',
    en: 'I. Summary of results obtained in medicated feed and Freshwater treatment'
  },
  gt_CuadroResumen: { 
    en: {
      filas: [
        "Visit date",
        "Elanco representative",
        "Customer rep.",
        "Visit representative"
      ]
    },
    es: {
      filas: [
        "Fecha de visita",
        "Representante Elanco",
        "Representante cliente",
        "Representante visita"
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
        "Time in FW from treatment",
        "Date of transferred to sea",
        "Production days at sampling",
        "Dd at sampling",
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
  gt_GraficoCumplimiento: {
    en: {
      titulo: 'In-feed concentration [mg/kg], (according to lot and feed mill), used in hatcheries from origin and tanks transferred to sea site for monitoring and follow-up',
      yaxis: '% achievement',
      sindatos: 'No data'
    },
    es: {
      titulo: 'Concentración (mg/kg) en alimento medicado según planta de alimento correspondiente al lote utilizado en pisciculturas de origen',
      yaxis: '% de cumplimiento',
      sindatos: 'Sin datos'
    }
  },
  gt_GraficoComparacion: {
    en: {
      titulo: 'Concentration comparison in muscle by hatchery of origin [ug/kg]',
      yaxis: 'Thousands',
      sindatos: 'No data'
    },
    es: {
      titulo: 'Concentración (ug/kg) en músculo post tratamiento según piscicultura de origen',
      yaxis: 'Miles',
      sindatos: 'Sin datos'
    }
  },
  gt_TablaMuestras: {
    en: {
      titulo: 'II.	Concentration results obtained on sea site follow-up samples',
      headers: [
        'Date sample',
        'Report ID',
        'Cage',
        'Sample',
        'Average\n(ppb)',
        'Min\n(ppb)',
        'Max\n(ppb)',
      ],
    },
    es: {
      titulo: 'II. Resultados de concentración obtenidos en muestreo de seguimiento en mar',
      headers: [
        'Fecha muestreo',
        'Informe N°',
        'Jaula',
        'Muestra',
        "Promedio (ppb)",
        "Min\n(ppb)",
        "Máx\n(ppb)",
      ],
    }
  },
  gt_curvapeso: {
    es: {
      titulo: 'Curva de depleción según peso',
      sindatos: 'Sin datos disponibles en el periodo seleccionado',
      yaxis: 'Concentración de Imvixa en músculo + piel (ppb)',
      xaxis: 'Peso (g)',
      jaula: 'Jaula'
    },
    en: {
      titulo: 'Depletion curve, Conc. vs Weight',
      sindatos: 'No data for the period selected',
      yaxis:'Imvixa muscle and skin concentration (ppb)',
      xaxis: 'Weight (g)',
      jaula: 'Cage'


    }
  },
  gt_curvauta: {
    es: {
      titulo: 'Curva de depleción según UTAS',
      sindatos: 'Sin datos disponibles en el periodo seleccionado',
      yaxis: 'Concentración de Imvixa en músculo + piel (ppb)',
      xaxis: 'Grados días',
      jaula: 'Jaula'
    },
    en: {
      titulo: 'Depletion curve, Conc. vs Degree days',
      sindatos: 'No data for the period selected',
      yaxis: 'Imvixa muscle and skin concentration (ppb)',
      xaxis: 'Degree days',
      jaula: 'Cage'
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