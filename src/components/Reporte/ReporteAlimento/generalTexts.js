export const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]
export const months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
]

export const generalTexts = {
  gt_DatosEmpresa: {
    fechaEmision: {
      en: (año, mes, dia) => `Report issued: ${months[mes]} ${dia}, ${año}`,
      es: (año, mes, dia) => `Fecha emisión informe: ${dia} de ${meses[mes]} ${año}`
    },
    subtitulo: {
      en: (nombreEmpresa) => `· Prepared by Aqua Elanco Technical Services · For more information, contact your Elanco representative. The data in this report is confidential and belongs to ${nombreEmpresa}. The distribution of this report is prohibited without the authorization of the company.`,
      es: (nombreEmpresa) => `· Elaborado por Technical Services de Aqua Elanco · Para mayor información, contacte a su representante de Elanco. Los datos del presente informe son confidenciales y pertenecen a ${nombreEmpresa}. Prohibida su distribución sin autorización de la empresa. `
    }
  },
  seccion1: {
    es: 'Información General',
    en: 'General information'
  },
  gt_TablaResumen: { 
    en: {
      titulo: 'In-feed concentration report',
      filas: [
        "ID. Laboratory report",
        "Hatchery",
        "Feed mill",
        "Manufacturing date",
        "Prescription (PMV)",
        "Feed lot ID",
        "Target concentration PMV [ppm]",
        "Number of kilos PMV [kg]",
        "Caliber"
      ]
    },
    es: {
      titulo: 'Reporte de concentración en alimento',
      filas: [
        "ID. Reporte laboratorio",
        "Piscicultura",
        "Planta de alimento",
        "Fecha de elaboración",
        "PMV",
        "Lote de alimento",
        "Concentración objetivo PMV (ppm)",
        "Cantidad Programada por receta (kg)",
        "Calibre"
      ]
    }
  },
  gt_GraficoCumplimiento: {
    en: {
      titulo: 'In-feed concentration achieved (%)  (achieved/targeted)',
      textoEje: '% achieved'
    },
    es: {
      titulo: 'Cumplimiento (%) concentración en alimento (logrado / intentado)',
      textoEje: '% de cumplimiento'
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