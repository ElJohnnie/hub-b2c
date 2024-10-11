const { app, BrowserWindow } = require('electron');
const path = require('path');
const childProcess = require('child_process');
const net = require('net');
require('dotenv').config();

const isDev = process.env.NODE_ENV === 'development';

let mainWindow = null;
let serverProcess = null;
let devFrontProcess = null;

function startBackend() {
  console.log('Iniciando o backend Express...');

  const serverPath = isDev
    ? path.join(__dirname, '../server')
    : path.join(process.resourcesPath, 'server');

  const nodeExecutable = isDev ? 'node' : process.execPath;

  serverProcess = childProcess.spawn(
    nodeExecutable, 
    isDev ? ['run', 'dev'] : [path.join(serverPath, 'server.js')], 
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

function waitForReactDevServer(port, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      const client = new net.Socket();

      client.connect({ port }, () => {
        clearInterval(interval);
        client.end();
        resolve(true);
      });

      client.on('error', () => {
        if (Date.now() - start >= timeout) {
          clearInterval(interval);
          reject(new Error('Dev server timeout'));
        }
      });
    }, 1000);
  });
}

async function createWindow() {
  console.log('Iniciando a janela do Electron...');

  if (isDev) {
    console.log('Iniciando o processo de desenvolvimento do frontend...');

    const clientPath = path.join(__dirname, '../client');

    devFrontProcess = childProcess.spawn('npm', ['run', 'start'], {
      cwd: clientPath,
      stdio: 'inherit',
    });

    devFrontProcess.on('error', (err) => {
      console.error('Erro ao iniciar o build dev do frontend:', err);
    });

    try {
      await waitForReactDevServer(3000);
      console.log('Frontend está pronto, criando a janela do Electron...');

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

      mainWindow.loadURL('http://localhost:3000');

      mainWindow.on('closed', () => (mainWindow = null));
    } catch (error) {
      console.error('Erro ao iniciar o frontend:', error);
    }
  } else {
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
