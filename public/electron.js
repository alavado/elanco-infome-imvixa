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
let hayComentarios = false;
let reporteID = 0;
let numeroDeLotes; // El reporte de alimento imprime una página por lote
let nombreEmpresa;

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
  menuItemVerGraficos = new MenuItem({
    label: "Ver",
    visible: false,
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

const reporteAPDF = async () => {
  switch (reporteID) {
    case 1:
      console.log("imprimirReporteAlimento")
      imprimirReporteAlimento()
      break
    default:
      console.log("imprimirReporteSeguimiento")
      imprimirReporteSeguimiento()
      break
  }
};

const imprimirReporteAlimento = async () => {
  try {
    console.log({numeroDeLotes, nombreEmpresa})
    const data = await mainWindow.webContents.printToPDF({
      printBackground: true,
      marginsType: 1,
      pageSize: {
        width: 25400 * 50.0,
        height: 25400 * 66.42,
      },
      pageRanges: {
        from: 0,
        to: numeroDeLotes - 1,
      },
    });

    const hoy = new Date().toISOString().substring(0,10);
    const titulo = `Reporte de concentración en alimento-${nombreEmpresa}-${hoy}.pdf`
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
    graficoEficacia.visible && graficoMapa.visible;
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
    console.log("ODLU IM HERE")
    menuItemVerGraficos.visible = true;
  }
  menuItemImprimir.enabled = true;
  menuItemVolverAParametros.enabled = true;
});

ipcMain.on("yaNoViendoReporte", async () => {
  menuItemVolverAParametros.enabled = false;
  menuItemVerGraficos.visible = false;
  menuItemImprimir.enabled = false;
});

ipcMain.on("datosReporte", async (_, data) => {
  console.log({data})
  
  numeroDeLotes = data.numeroDeLotes;
  nombreEmpresa = data.nombreEmpresa;
  console.log({numeroDeLotes, nombreEmpresa})
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
  try {
    const wb = XLSX.readFile(state.path, { type: "binary", cellDates: true });
    let datos;
    switch (state.tipo) {
      case "alimento":
        datosAlimento = validation.checkAlimento(wb);
        event.sender.send(state.tipo, {
          path: state.path,
          datos: datosAlimento,
        });
        break;
      case "peces":
        datosPeces = validation.checkPeces(wb);
        datosTratamiento = validation.checkTratamiento(wb);
        event.sender.send(state.tipo, {
          path: state.path,
          datos: {
            datosPeces,
            datosTratamiento
          },
        });
        break;
      case "eficacia":
        datosEficacia = validation.checkEficacia(wb);
        event.sender.send(state.tipo, {
          path: state.path,
          datos: datosEficacia,
        });
        break;
      // case "tratamiento":
      //   datosTratamiento = validation.checkTratamiento(wb);
      //   event.sender.send(state.tipo, {
      //     path: state.path,
      //     datos: datosTratamiento,
      //   });
      //   break;
      default:
        datos = [];
    }
  } catch (err) {
    event.sender.send(state.tipo, {
      path: state.path,
      datos: [],
    });
    console.log("err", err);
  }
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
