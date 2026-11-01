
const { app, BrowserWindow } = require('electron');
const path = require('path');

let ventana;
let pantallaCarga;

function createWindow() {

    console.log('CREANDO PANTALLA DE CARGA');

    pantallaCarga = new BrowserWindow({
        width: 550,
        height: 420,
        frame: false,
        resizable: false,
        center: true,
        alwaysOnTop: true,
        backgroundColor: '#050711',
        show: true
    });

    pantallaCarga.loadFile(
        path.join(__dirname, 'splash.html')
    );

    pantallaCarga.webContents.on('did-fail-load',
        (event, errorCode, errorDescription) => {
            console.error('ERROR SPLASH:', errorCode, errorDescription);
        }
    );

    pantallaCarga.webContents.on('did-finish-load', () => {
        console.log('PANTALLA ESPACIAL CARGADA');
    });

    ventana = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        show: false,
        autoHideMenuBar: true,
        title: 'Fragmentos de Luna Llena',
        icon: path.join(__dirname, 'build', 'icon.ico')
    });

    ventana.loadFile(
        path.join(__dirname, 'index.html')
    );

    ventana.once('ready-to-show', () => {

        console.log('APLICACION PRINCIPAL LISTA');

        setTimeout(() => {

            if (pantallaCarga && !pantallaCarga.isDestroyed()) {
                pantallaCarga.close();
            }

            ventana.show();

        }, 5500);

    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
