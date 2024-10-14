const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const { fork } = require('child_process');
const net = require('net');
const fs = require('fs');
require('dotenv').config();

let mainWindow = null;

const serverPath = path.join(__dirname, 'dist');

process.env.SERVER_PATH = serverPath;

function createWindow(options = {}) {
  const defaultOptions = {
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      disableHardwareAcceleration: true,
      enableBlinkFeatures: 'None',
    },
    useVsync: false,
  };

  mainWindow = new BrowserWindow({ ...defaultOptions, ...options });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function showError(message) {
  dialog.showErrorBox('Erro', message);
}

function startBackend() {
  process.env.PUBLIC_PATH = path.join(serverPath, 'public');
  const serverScriptPath = path.join(serverPath, 'server.js');

  if (!fs.existsSync(serverScriptPath)) {
    console.error(`Arquivo do servidor não encontrado em: ${serverScriptPath}`);
    showError(`Arquivo do servidor não encontrado em: ${serverScriptPath}`);
    return Promise.reject(new Error('Arquivo do servidor não encontrado'));
  }

  const serverProcess = fork(serverScriptPath, {
    cwd: serverPath,
    env: process.env,
    stdio: 'pipe'
  });

  serverProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data.toString()}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data.toString()}`);
  });

  serverProcess.on('close', (code) => {
    console.error(`Processo do servidor encerrado com código ${code}`);
  });

  serverProcess.on('error', (error) => {
    console.error(`Erro ao iniciar o backend: ${error.message}`);
    showError(`Erro ao iniciar o backend: ${error.message}`);
  });

  console.log('Processo do backend iniciado com sucesso.');
}

function checkServer() {
  return new Promise((resolve, reject) => {
    const client = net.createConnection({ port: 2345 }, () => {
      client.end();
      resolve(true);
    });
    client.on('error', () => {
      reject(new Error('Servidor não está rodando na porta 2345'));
    });
  });
}

async function startFrontend() {
  try {
    await checkServer();
    createWindow();
    mainWindow.loadURL('http://localhost:2345');
  } catch (error) {
    console.error('Erro ao iniciar o frontend:', error);
    showError('Erro ao iniciar o frontend: ' + error.message);
  }
}

app.on('ready', async () => {
  try {
    startBackend();
    setTimeout(() => startFrontend(), 1000);
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error);
    showError('Erro ao iniciar a aplicação: ' + error.message);
    app.quit();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  } else {
    mainWindow = null;
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    startFrontend();
  }
});
