export const generalTexts = {
  seccion1: {
    es: 'Información General',
    en: 'General information'
  },
  gt_CuadroResumen: { 
    en: {
      filas: [
        "Hatchery",
        "Elanco representative",
        "Visit date",
        "Visit representative",
        "Customer rep.",
      ]
    },
    es: {
      filas: [
        "Piscicultura",
        "Representante Elanco",
        "Fecha de visita",
        "Representante visita",
        "Representante cliente",
      ]
    }
  },
  gt_TablaAntecedentes: {
    en: {
      titulo: 'Treated group background',
      columna1: [
        "Prescription",
        "Group",
        "Number of fish",
        "Weight at treatment (g)",
        "Medicated tanks (units)",
        "Feed lot ID.",
        "Feed mill"
      ],
      columna2: [
        "Target concentration PMV (ppm)",
        "In-feed inclusion rate (%)",
        "Feed intake (kg)",
        "Treatment starting date",
        "Treatment ended date",
        "Photoperiod starting date",
        "Site of destination"
      ]
    },
    es: {
      titulo: 'Antecedentes del grupo tratado',
      columna1: [
        "PMV",
        "Grupo",
        "Número de peces",
        "Peso al inicio de tratamiento (g)",
        "Estanques medicados",
        "Lote de alimento",
        "Planta de alimento"
      ],
      columna2: [
        "Concentración objetivo PMV (ppm)",
        "Inclusión de activo en alimento (%)",
        "Alimento consumido (kg)",
        "Fecha de inicio de tratamiento",
        "Fecha de término de tratamiento",
        "Fecha de inicio fotoperiodo",
        "Centro de destino"
      ]
    }
  },
  gt_GraficoCumplimiento: {
    en: {
      titulo: 'In-feed concentration achieved (%) (achieved/targeted)',
      yaxis: '% achievement',
      sindatos: 'No data available for selected period'
    },
    es: {
      titulo: 'Cumplimiento (%) concentración en alimento (logrado / intentado)',
      yaxis: '% de cumplimiento',
      sindatos: 'Sin datos disponibles para el periodo seleccionado'
    }
  },
  gt_GraficoComparacion: {
    en: {
      titulo: 'Concentration in muscle/skin per unit',
      xaxis: 'Tanks',
      yaxis: 'Thousands (ppb)'
    },
    es: {
      titulo: 'Concentración en músculo/piel por estanque',
      xaxis: 'Estanque',
      yaxis: 'Miles (ppb)'
    }
  },
  gt_TablaMuestras: {
    en: {
      titulo: 'Sample assessment by tank',
      headers: [
        'Report ID',
        'Tank',
        'Sample',
        'Average',
        'CV',
        'min',
        'max',
        'Result'
      ],
      headers2:  ['Assessment', 'Interpretation'],
      rows: [
        'Complies with concentration and dispersion range (mean ',
        'Complies with concentration average, but presents a high dispersion coeficient  (mean',
        'Does not meet the criterias for concentration and dispersion coeficient (mean '
      ]

    },
    es: {
      titulo: 'Tabla de resultados de muestras por estanque',
      headers: [
        'Informe N°',
        'Estanque',
        'Muestra',
        'Promedio',
        'CV',
        'min',
        'max',
        'Resultado'
      ],
      headers2: ['Resultado', 'Interpretación'],
      rows: [
        `Cumple con rango de concentración y dispersión (media `,
        'Cumple con rango de concentración pero presenta alta dispersión (media ',
        ' No cumple con rango de concentración (media '
      ]
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