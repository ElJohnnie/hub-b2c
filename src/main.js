const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const net = require('net');
require('dotenv').config();

const isDev = process.env.NODE_ENV === 'development';
let mainWindow = null;

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
  const serverPath = isDev 
    ? path.join(__dirname, '../bff/dist')
    : path.join(process.resourcesPath, 'app/bff/dist');

  const serverScriptPath = path.join(serverPath, 'server.js');
  console.log(`Caminho do server: ${serverScriptPath}`);
  console.log(`Iniciando backend em modo ${isDev ? 'desenvolvimento' : 'produção'}...`);

  const nodePath = process.execPath; 

  return new Promise((resolve, reject) => {
    const serverProcess = spawn(nodePath, [serverScriptPath], {
      cwd: serverPath,
      stdio: 'pipe',
    });

    serverProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    serverProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    serverProcess.on('error', (error) => {
      console.error(`Erro ao iniciar o backend: ${error.message}`);
      showError(`Erro ao iniciar o backend: ${error.message}`);
      reject(error);
    });

    console.log('Processo do backend iniciado com sucesso.');

    waitForServer(2345, 1000)
      .then(() => {
        console.log('Backend está ouvindo na porta 2345');
        resolve();
      })
      .catch((error) => {
        console.error('Erro ao esperar o backend:', error.message);
        showError(`Erro ao esperar o backend: ${error.message}`);
        reject(error);
      });
  });
}

function waitForServer(port, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const client = new net.Socket();

      client.connect({ port }, () => {
        clearInterval(interval);
        client.end();
        resolve(true);
      });

      client.on('error', () => {
        if (Date.now() - startTime >= timeout) {
          clearInterval(interval);
          reject(new Error(`Timeout ao aguardar o server na porta ${port}`));
        }
      });
    }, 1000);
  });
}

async function startFrontend() {
  try {
    console.log('Frontend pronto, criando a janela do Electron...');
    createWindow();
    mainWindow.loadURL('http://localhost:2345');
  } catch (error) {
    console.error('Erro ao iniciar o frontend:', error);
    showError('Erro ao iniciar o frontend: ' + error.message);
  }
}

app.on('ready', async () => {
  try {
    await startBackend();
    await startFrontend();
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error);
    showError('Erro ao iniciar a aplicação: ' + error.message);
    app.quit();
  }
});

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
