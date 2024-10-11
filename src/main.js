const { app, BrowserWindow } = require('electron');
const path = require('path');
const childProcess = require('child_process');
const net = require('net');
require('dotenv').config();

let mainWindow = null;
let serverProcess = null;
let devFrontProcess = null;

function startBackend() {
  console.log('Iniciando o backend Express...');

  const serverPath = app.isPackaged 
    ? path.join(process.resourcesPath, 'server')
    : path.join(__dirname, '../server');

  serverProcess = childProcess.spawn(
    'node',
    [path.join(serverPath, 'dist/server.js')],
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

function stopBackend() {
  if (serverProcess) {
    console.log('Parando o backend...');
    serverProcess.kill();
    serverProcess = null;
  }
}

async function createWindow() {
  console.log('Iniciando a janela do Electron...');

  try {
    await waitForServer(3000);
  } catch (error) {
    console.error('Erro: O backend não foi iniciado corretamente:', error);
    app.quit();
    return;
  }

  console.log('Iniciando o frontend em modo produção...');

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      disableHardwareAcceleration: true,
      enableBlinkFeatures: 'None',
    },
    useVsync: false,
  });

  const startURL = `file://${path.join(process.resourcesPath, 'client/build/index.html')}`;

  mainWindow.loadURL(startURL);

  mainWindow.on('closed', () => (mainWindow = null));
}

function waitForServer(port, host = 'localhost', timeout = 5000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const checkServer = () => {
      const socket = net.createConnection(port, host, () => {
        socket.end();
        resolve();
      });

      socket.on('error', (err) => {
        if (Date.now() - startTime >= timeout) {
          reject(new Error(`Servidor não respondeu dentro do tempo limite (${timeout}ms)`));
        } else {
          setTimeout(checkServer, 500);
        }
      });
    };

    checkServer();
  });
}

function stopFrontend() {
  if (devFrontProcess) {
    console.log('Parando o frontend...');
    devFrontProcess.kill();
    devFrontProcess = null;
  }
}

app.on('ready', () => {
  startBackend();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    stopBackend();
    stopFrontend();
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
