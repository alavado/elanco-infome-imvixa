const electron = require('electron');
const { ipcMain } = require('electron')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs')

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  isDev || mainWindow.removeMenu()
  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize()
    mainWindow.show()    
  })
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('imprimir', async (event, state) => {
  try {
    const data = await mainWindow.webContents.printToPDF({
      printBackground: true,
      marginsType: 1,
      pageSize: {
        width: 352,
        height: 638.8096
      }
    })
    fs.writeFileSync(path.join(app.getPath('desktop'), 'Informe Seguimiento Imvixa.pdf'), data)
    await electron.shell.openPath(path.join(app.getPath('desktop'), 'Informe Seguimiento Imvixa.pdf'))
  }
  catch(err) {
    console.log('err', err)
  }
})

// LEER ARCHIVOS XLSX

var XLSX = require("xlsx");
var validation = require("./validation")

ipcMain.on('leer', async (event, state) => {
  try {
    const wb = XLSX.readFile(state.path)
    let datos
    switch (state.tipo) {
      case 'alimento':
        datosAlimento = validation.checkAlimento(wb)
        datosPMV = validation.checkPMV(wb)
        event.sender.send(state.tipo, {
          path: state.path,
          datos: {
            datosAlimento,
            datosPMV
          }})
        break
      case 'peces':
        datosPeces = validation.checkPeces(wb)
        event.sender.send(state.tipo, {
          path: state.path,
          datos: datosPeces})
      case 'eficacia':
        datosEficacia = validation.checkEficacia(wb)
        event.sender.send(state.tipo, {
          path: state.path,
          datos: datosEficacia})
      default:
        datos = {}
    }
  }
  catch(err) {
    console.log('err', err)
  }
})