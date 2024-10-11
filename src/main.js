const { app, BrowserWindow } = require('electron');
const path = require('path');
const childProcess = require('child_process');
require('dotenv').config();

let mainWindow = null;
let serverProcess = null;

function startBackend() {
  console.log('Iniciando o backend Express...');

  const serverPath = path.join(__dirname, '..', 'server/dist');

  serverProcess = childProcess.spawn(
    'node',
    [path.join(serverPath, 'server.js')],
    {
      cwd: serverPath,
      stdio: 'inherit',
    }
  );

  serverProcess.on('error', (err) => {
    console.error('Erro ao iniciar o backend:', err);
  });

  serverProcess.on('close', (code) => {
    console.log(`Backend encerrado com código ${code}`);
  });

  console.log('Processo do backend iniciado com sucesso.');
}

function startFrontend() {
  console.log('Iniciando o frontend React...');

  const frontPath = path.join(__dirname, '..', 'client');
  
  childProcess.spawn(
    'npm',
    ['start'],
    {
      cwd: frontPath,
      stdio: 'inherit',
    }
  );

  console.log('Processo do frontend iniciado com sucesso.');
}

async function createWindow() {
  console.log('Iniciando a janela do Electron...');

  const startURL = `http://localhost:${process.env.REACT_APP_PORT}`;
  console.log('Carregando URL:', startURL);

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
    },
  });

  mainWindow.loadURL(startURL);

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', () => {
  startBackend();
  startFrontend();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    serverProcess && serverProcess.kill();
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
