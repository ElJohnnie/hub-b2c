const { app, BrowserWindow } = require('electron');
const path = require('path');
const childProcess = require('child_process');
const net = require('net');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow = null;
let serverProcess = null;  // Armazena o processo do servidor (backend)
let buildProcess = null;   // Armazena o processo de build (se necessário)

function startBackend() {
  console.log('Iniciando o backend Express...');

  buildProcess = childProcess.spawn('npm', ['run', 'build'], {
    cwd: path.join(__dirname, '../server'),
    stdio: 'inherit',
  });

  serverProcess = childProcess.spawn('npm', ['run', isDev ? 'dev' : 'start'], {
    cwd: path.join(__dirname, '../server'),
    stdio: 'inherit',
  });

  if (!buildProcess) {
    console.error('Erro ao tentar iniciar o processo de build do backend.');
    return;
  }

  if (!serverProcess) {
    console.error('Erro ao tentar iniciar o processo do backend.');
    return;
  }

  buildProcess.on('error', (err) => {
    console.error('Erro ao iniciar o build do backend:', err);
  });

  serverProcess.on('error', (err) => {
    console.error('Erro ao iniciar o backend:', err);
  });

  serverProcess.on('close', (code) => {
    console.log(`Backend encerrado com código ${code}`);
  });

  console.log('Processo do backend iniciado com sucesso.');
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
  if (isDev) {
    console.log('Iniciando o processo de desenvolvimento do frontend...');

    const devFrontProcess = childProcess.spawn('npm', ['run', 'start'], {
      cwd: path.join(__dirname, '../client'),
      stdio: 'inherit',
    });

    if (!devFrontProcess) {
      console.error('Erro ao tentar iniciar o processo de build dev do frontend.');
      return;
    }

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

    const startURL = `file://${path.join(__dirname, '../client/build/index.html')}`;

    mainWindow.loadURL(startURL);

    mainWindow.on('closed', () => (mainWindow = null));
  }
}

app.on('ready', () => {
  startBackend();
  createWindow();
});

app.on('window-all-closed', () => {
  if (serverProcess) {
    console.log('Encerrando o backend...');
    serverProcess.kill();
  }

  if (buildProcess) {
    buildProcess.kill();
  }

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
