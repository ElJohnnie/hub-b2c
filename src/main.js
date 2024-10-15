const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const { fork } = require('child_process');
const net = require('net');
const fs = require('fs');
require('dotenv').config();

let mainWindow = null;
let serverProcess = null;
const SERVER_PORT = 2345 || process.env.SERVER_PORT;
const serverPath = path.join(__dirname, 'dist');
const serverScriptPath = path.join(serverPath, 'server.js');
process.env.SERVER_PATH = serverPath;
process.env.PUBLIC_PATH = path.join(serverPath, 'public');

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
  if (!fs.existsSync(serverScriptPath)) {
    const errorMsg = `Arquivo que serve a aplicação não encontrado em: ${serverScriptPath}`;
    console.error(errorMsg);
    showError(errorMsg);
    return Promise.reject(new Error(errorMsg));
  }

  serverProcess = fork(serverScriptPath, {
    cwd: serverPath,
    env: process.env,
    stdio: 'pipe',
  });

  serverProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data.toString()}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data.toString()}`);
  });

  serverProcess.on('close', (code) => {
    console.error(`Processo do aplicação encerrado com código ${code}`);
  });

  serverProcess.on('error', (error) => {
    console.error(`Erro ao iniciar a aplicação: ${error.message}`);
    showError(`Erro ao iniciar a aplicação: ${error.message}`);
  });

  console.log('Processo da aplicação iniciado com sucesso.');
}

function checkServer() {
  return new Promise((resolve, reject) => {
    const client = net.createConnection({ port: SERVER_PORT }, () => {
      client.end();
      resolve(true);
    });

    client.on('error', () => {
      reject(new Error(`Aplicação não está rodando na porta ${SERVER_PORT}`));
    });
  });
}

async function startFrontend() {
  try {
    await checkServer();
    createWindow();
    mainWindow.loadURL(`http://localhost:${SERVER_PORT}`);
  } catch (error) {
    console.error('Erro ao iniciar o layout:', error);
    showError('Erro ao iniciar o layout: ' + error.message);
  }
}

async function initializeApp() {
  try {
    startBackend();
    setTimeout(() => startFrontend(), 1000);
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error);
    showError('Erro ao iniciar a aplicação: ' + error.message);
    app.quit();
  }
}

app.on('before-quit', () => {
  if (serverProcess) {
    console.log('Encerrando o processo do servidor...');
    serverProcess.kill('SIGINT');
  }
});

app.on('ready', initializeApp);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    startFrontend();
  }
});
