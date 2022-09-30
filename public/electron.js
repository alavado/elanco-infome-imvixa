const electron = require("electron");
const { ipcMain, Menu, MenuItem } = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const fs = require("fs");
const graficos = [
  {
    id: "GRAFICO_PECES_TRATADOS",
    titulo: "Peces tratados en el periodo",
  },
  {
    id: "GRAFICO_PESO_PROMEDIO",
    titulo: "Peso promedio",
  },
  {
    id: "GRAFICO_CUMPLIMIENTO",
    titulo: "Porcentaje incorporación en alimento",
  },
  {
    id: "GRAFICO_CONCENTRACION_MUSCULO",
    titulo: "Concentración en músculo post tratamiento",
  },
  {
    id: "GRAFICO_COMPARACION_CONCENTRACION",
    titulo: "Concentración en músculo por piscicultura",
  },
  {
    id: "GRAFICO_EFICACIA",
    titulo: "Eficacia en agua de mar",
  },
  {
    id: "GRAFICO_MACROZONAS",
    titulo: "Mapa protección histórica en macrozonas",
  },
];

const { autoUpdater } = require("electron-updater");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;
let menuItemVolverAParametros, menuItemImprimir;
let menuItemVerGraficos;

let estadosGraficos = graficos.map((g) => ({ ...g, visible: true }));
let visibilityVerMenu = false;
let hayComentarios = false;
let reporteID = 0;
let numeroDeLotes; // El reporte de alimento imprime una página por lote
let nombreEmpresa;
let numeroDePaginas;
let lotes;
let configFile = null
let appUserDataPath = app.getPath('userData');
const configRootPath = path.join(appUserDataPath, 'config.json');

console.log({appUserDataPath});

try {
  configFile = JSON.parse(fs.readFileSync(configRootPath, 'utf-8'));
  console.log({configFile, configRootPath});
} catch (e) {
  console.error(e);
}

// const REGISTER_FILE = 'Registro_reportes_impreso.xlsx'
// const registerPath =  path.join(appUserDataPath, REGISTER_FILE)

function construirMenu() {
  const menu = new Menu();
  menu.append(
    new MenuItem({
      label: "Archivo",
      submenu: [
        new MenuItem({
          label: "Cerrar aplicación",
          role: "close",
        }),
      ],
    })
  );
  if (visibilityVerMenu) {
    menuItemVerGraficos = new MenuItem({
      label: "Ver",
      visible: visibilityVerMenu,
      submenu: estadosGraficos.map(
        (g) =>
          new MenuItem({
            label: g.titulo,
            type: "checkbox",
            checked: g.visible,
            click: () => {
              if (g.visible) {
                g.visible = false;
                mainWindow.webContents.send("ocultar-grafico", g);
              } else {
                g.visible = true;
                mainWindow.webContents.send("mostrar-grafico", g);
              }
            },
          })
      ),
    });
    menu.append(menuItemVerGraficos);
  }
  menuItemVolverAParametros = new MenuItem({
    label: "Reingresar parámetros",
    click: volverAParametros,
    enabled: false,
  });
  menuItemImprimir = new MenuItem({
    label: "Exportar reporte a PDF",
    click: reporteAPDF,
    enabled: false,
  });
  menu.append(
    new MenuItem({
      label: "Opciones",
      submenu: [menuItemVolverAParametros, menuItemImprimir],
    })
  );
  mainWindow.setMenu(menu);
}

function createWindow() {
  const { version } = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../package.json"))
  );
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
    show: false,
    icon: "public/icono.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  construirMenu();
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  isDev && mainWindow.webContents.openDevTools();
  mainWindow.once("ready-to-show", () => {
    mainWindow.maximize();
    mainWindow.show();
  });
  mainWindow.webContents.once("did-finish-load", () => {
    mainWindow.setTitle(`Reporte Seguimiento IMVIXA - Versión ${version}`);
  });
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", () => {
  autoUpdater.checkForUpdates();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const uuidv4 = require("uuid/v4")

const reporteAPDF = async () => {
  // mainWindow.webContents.send("imprimirReporte")
  
// ipcMain.on("visualizandoReporte", async (_, datosRegistro) => {
//   mainWindow.webContents.send("imprimirReporte")
// })

// ipcMain.on("imprimirReporte", async (_, datosRegistro) => {
  switch (reporteID) {
    case 1:
      console.log("imprimirReporteAlimento")
      imprimirReporteAlimento()
      break
    case 2:
      console.log("imprimirReporteMusculo")
      imprimirReporteMusculo()
      break
    case 3:
      console.log("imprimirReporteCentro")
      imprimirReporteCentro()
      break
    default:
      console.log("imprimirReporteSeguimiento")
      imprimirReporteSeguimiento()
      break
  }
  // guardarRegistro({...datosRegistro, reporteID: uuidv4()})
}//)

// const guardarRegistro = async (datosRegistro) => {
//   const {
//     reporteID,
//     tipoID,
//     reporte,
//     fecha,
//     empresa,
//     datos
//   } = datosRegistro
//   const datosString = JSON.stringify(datos)
//   // TODO: Check if file exists if not create if exists then append
//   const wb = XLSX.readFile(registerPath, { type: "binary", cellDates: true });
//   const firstSheetName = workbook.SheetNames[0];
//   const sheet = workbook.Sheets[firstSheetName];
//   XLSX.utils.sheet_add_aoa(sheet, [reporteID, tipoID, reporte, fecha, empresa, datosString], {origin:-1})
//   XLSX.writeFile(wb, registerPath)
// }

const imprimirReporteAlimento = async () => {
  try {
    console.log({numeroDeLotes, nombreEmpresa})
    let data;
    for (let index = 0; index < numeroDeLotes; index++) {
      data = await mainWindow.webContents.printToPDF({
        printBackground: true,
        marginsType: 1,
        pageSize: {
          width: 25400 * 50.0,
          height: 25400 * 66.42,
        },
        pageRanges: {
          from: index,
          to: index,
        },
      });
      const hoy = new Date().toISOString().substring(0,10);
      const titulo = `Reporte de concentración en alimento-${nombreEmpresa}-${lotes[index]}-${hoy}.pdf`
      fs.writeFileSync(
        path.join(app.getPath("desktop"), titulo), 
        data
      );
      await electron.shell.openPath(
        path.join(app.getPath("desktop"), titulo)
      );
      
    }
  } catch (err) {
    console.log("err", err);
  }
};

const imprimirReporteMusculo = async () => {
  try {
    const data = await mainWindow.webContents.printToPDF({
      printBackground: true,
      marginsType: 1,
      pageSize: {
        width: 25400 * 50.0,
        height: 25400 * 66.42,
      },
      pageRanges: {
        from: 0,
        to: numeroDePaginas - 1,
      },
    });

    const hoy = new Date().toISOString().substring(0,10);
    const titulo = `Reporte de concentración en músculo-${nombreEmpresa}-${hoy}.pdf`
    fs.writeFileSync(
      path.join(app.getPath("desktop"), titulo), 
      data
    );
    await electron.shell.openPath(
      path.join(app.getPath("desktop"), titulo)
    );
  } catch (err) {
    console.log("err", err);
  }
};

const imprimirReporteCentro = async () => {
  try {
    const data = await mainWindow.webContents.printToPDF({
      printBackground: true,
      marginsType: 1,
      pageSize: {
        width: 25400 * 50.0,
        height: 25400 * 66.42,
      },
      pageRanges: {
        from: 0,
        to: numeroDePaginas - 1,
      },
    });

    const hoy = new Date().toISOString().substring(0,10);
    const titulo = `Reporte de seguimiento por centro-${nombreEmpresa}-${hoy}.pdf`
    fs.writeFileSync(
      path.join(app.getPath("desktop"), titulo), 
      data
    );
    await electron.shell.openPath(
      path.join(app.getPath("desktop"), titulo)
    );
  } catch (err) {
    console.log("err", err);
  }
};

const imprimirReporteSeguimiento = async () => {
  const graficoEficacia = estadosGraficos.find(
    (g) => g.id === "GRAFICO_EFICACIA"
  );
  const graficoMapa = estadosGraficos.find(
    (g) => g.id === "GRAFICO_MACROZONAS"
  );
  const graficosSegundaPaginaVisibles =
    graficoEficacia.visible || graficoMapa.visible;
  const imprimirDosPaginas = graficosSegundaPaginaVisibles || hayComentarios;
  try {
    const data = await mainWindow.webContents.printToPDF({
      printBackground: true,
      marginsType: 1,
      pageSize: {
        width: 25400 * 50.0,
        height: 25400 * 66.42,
      },
      pageRanges: {
        from: 0,
        to: imprimirDosPaginas ? 1 : 0,
      },
    });
    const hoy = new Date().toISOString().substring(0,10);
    const titulo = `Reporte de seguimiento Imvixa -${nombreEmpresa}-${hoy}.pdf`
    fs.writeFileSync(
      path.join(app.getPath("desktop"), titulo),
      data
    );
    await electron.shell.openPath(
      path.join(app.getPath("desktop"), titulo)
    );
  } catch (err) {
    console.log("err", err);
  }
};

// ESTADO DE BOTÓN DE REGRESAR A PARÁMETROS
ipcMain.on("viendoReporte", async (_, rID) => {
  reporteID = rID;
  if (rID === 4) {
    // Reporte de seguimiento
    visibilityVerMenu = true
    construirMenu()
  } else {
    if (visibilityVerMenu) {
      visibilityVerMenu = false
      construirMenu()
    }
  }
  menuItemImprimir.enabled = true
  menuItemVolverAParametros.enabled = true
});

ipcMain.on("yaNoViendoReporte", async () => {
  menuItemVolverAParametros.enabled = false
  menuItemVerGraficos.visible = false
  menuItemImprimir.enabled = false
});

ipcMain.on("datosReporte", async (_, data) => {
  numeroDeLotes = data.numeroDeLotes
  nombreEmpresa = data.nombreEmpresa
  numeroDePaginas = data.numeroDePaginas
  lotes = data.lotes
  console.log({numeroDeLotes, nombreEmpresa, lotes})
});

// Reporte seguimiento - si hay comentarios son dos páginas
ipcMain.on("hayComentarios", async () => {
  hayComentarios = true;
});
ipcMain.on("yaNoHayComentarios", async () => {
  hayComentarios = false;
});

const volverAParametros = async () => {
  mainWindow.webContents.send("volverAParametros");
};

// LEER ARCHIVOS XLSX

var XLSX = require("xlsx");
var validation = require("./validation");

ipcMain.on("leer", async (event, state) => {
  const typeSheet = state.tipo
  const pathString = state.path;
  try {
    let datos;
    let wb;
    switch (typeSheet) {
      case "alimento":
        wb = XLSX.readFile(pathString, { type: "binary", cellDates: true });
        datosAlimento = validation.checkAlimento(wb);
        event.sender.send(typeSheet, {
          path: pathString,
          datos: datosAlimento,
        });
        break;
      case "peces":
        datosPeces = validation.checkPecesHojaImvixa(pathString);
        datosTratamiento = validation.checkPecesHojaTratamiento(pathString);
        event.sender.send(typeSheet, {
          path: pathString,
          datos: {
            datosPeces,
            datosTratamiento
          },
        });
        break;
      case "eficacia":
        wb = XLSX.readFile(pathString, { type: "binary", cellDates: true });
        datosEficacia = validation.checkEficacia(wb);
        event.sender.send(typeSheet, {
          path: pathString,
          datos: datosEficacia
        });
        break;
      case "tratamiento":
        wb = XLSX.readFile(pathString, { type: "binary", cellDates: true });
        datosTratamiento = validation.checkTratamiento(wb);
        event.sender.send(typeSheet, {
          path: pathString,
          datos: datosTratamiento
        });
        break;
      default:
        datos = [];
    }
  } catch (err) {
    console.log("ERR ", err);
    event.sender.send(typeSheet, {
      path: pathString,
      datos: []
    });
  }
});

// Manejar configuracion de gráficos de reporte centro

ipcMain.on("cargarConfiguracionGraficos", async (event) => {
  mainWindow.webContents.send("cargarConfiguracionGraficos", configFile);
});

ipcMain.on("guardarConfiguracionGraficos", async (event, data) => {
  const newConfigJSON = {
    defaultGraficoUtas: data.graficoUTAs,
    defaultGraficoPeso: data.graficoPeso
  }
  // guardar objeto de configuracion
  fs.writeFileSync(configRootPath, JSON.stringify(newConfigJSON))
});

autoUpdater.on("checking-for-update", () => {
  console.log("checking-for-update");
});
autoUpdater.on("update-available", (info) => {
  console.log("update-available", info);
  mainWindow.webContents.send("descargando-actualizacion");
});
autoUpdater.on("update-not-available", (info) => {
  console.log("update-not-available", info);
});
autoUpdater.on("error", (err) => {
  console.log("error", err);
});
autoUpdater.on("download-progress", (progressObj) => {
  console.log("download-progress", progressObj);
});
autoUpdater.on("update-downloaded", (info) => {
  console.log("update-downloaded", info);
  autoUpdater.quitAndInstall();
});
