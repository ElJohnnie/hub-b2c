const { app, BrowserWindow } = require('electron');
const path = require('path');
const childProcess = require('child_process');
const url = require('url');

let mainWindow = null;

function startBackend() {
  console.log('Iniciando o backend Express...');

  const serverProcess = childProcess.spawn('npm', ['run', 'start'], {
    cwd: path.join(__dirname, '../server'),
    stdio: 'inherit',
  });

  if (!serverProcess) {
    console.error('Erro ao tentar iniciar o processo do backend.');
    return;
  }

  serverProcess.on('error', (err) => {
    console.error('Erro ao iniciar o backend:', err);
  });

  serverProcess.on('close', (code) => {
    console.log(`Backend encerrado com código ${code}`);
  });

  console.log('Processo do backend iniciado com sucesso.');
}


function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '../client/build/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}


app.on('ready', () => {
    startBackend();
    createWindow();
});

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
