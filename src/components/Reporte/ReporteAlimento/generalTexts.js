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
      en: (nombreEmpresa) => `· Prepared by MSD Animal Health Technical Services · For more information, contact your MSD representative. The data in this report is confidential and belongs to ${nombreEmpresa}. The distribution of this report is prohibited without the authorization of the company.`,
      es: (nombreEmpresa) => `· Elaborado por Technical Services de MSD Salud Animal · Para mayor información, contacte a su representante de MSD. Los datos del presente informe son confidenciales y pertenecen a ${nombreEmpresa}. Prohibida su distribución sin autorización de la empresa. `
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
        "Total feed produced PMV [kg]",
        "Diet feed name"
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
        "Nombre de la dieta"
      ]
    }
  },
  gt_GraficoCumplimiento: {
    en: {
      titulo: 'In-feed concentration achieved (%)  (achieved/targeted)',
      textoEje: '% achieved',
      sindatos: 'No data'
    },
    es: {
      titulo: 'Cumplimiento (%) concentración en alimento (logrado / intentado)',
      textoEje: '% de cumplimiento',
      sindatos: 'Sin datos'
    }
  },
  gt_Comentarios: {
    es: 'Comentarios',
    en: 'Comments/Observations'
  },
  gt_Sandalias: {
    es: `Copyright ©${new Date().getFullYear()} Merck & Co., Inc., Rahway, NJ, USA y sus afiliadas. Todos los derechos reservados.`,
    en: `Copyright ©${new Date().getFullYear()} Merck & Co., Inc., Rahway, NJ, USA and its affiliate. All rights reserved.`
  }
}