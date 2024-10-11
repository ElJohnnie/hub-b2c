const { app, BrowserWindow } = require('electron');
const path = require('path');
const childProcess = require('child_process');
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

function startBackend() {
  const serverPath = isDev ? path.join(__dirname, '../server') : path.join(process.resourcesPath, 'server/dist');
  const command = isDev ? 'dev' : 'start';

  console.log(`Iniciando backend em modo ${isDev ? 'desenvolvimento' : 'produção'}...`);

  const serverProcess = childProcess.spawn('npm', ['run', command], {
    cwd: serverPath,
    stdio: 'inherit',
  });

  serverProcess.on('error', (err) => {
    console.error(`Erro ao iniciar o backend: ${err.message}`);
  });

  serverProcess.on('close', (code) => {
    console.log(`Backend encerrado com código ${code}`);
  });

  console.log('Processo do backend iniciado com sucesso.');
}

function waitForReactDevServer(port, timeout = 30000) {
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
          reject(new Error(`Timeout ao aguardar o dev server na porta ${port}`));
        }
      });
    }, 1000);
  });
}

async function startFrontend() {
  const clientPath = isDev ? path.join(__dirname, '../client') : path.join(process.resourcesPath, 'client');
  
  console.log(`Iniciando frontend em modo ${isDev ? 'desenvolvimento' : 'produção'}...`);

  const devFrontProcess = childProcess.spawn('npm', ['run', 'start'], {
    cwd: clientPath,
    stdio: 'inherit',
  });

  devFrontProcess.on('error', (err) => {
    console.error(`Erro ao iniciar o frontend: ${err.message}`);
  });

  try {
    await waitForReactDevServer(1234);
    console.log('Frontend pronto, criando a janela do Electron...');
    createWindow();
    mainWindow.loadURL('http://localhost:1234');
  } catch (error) {
    console.error('Erro ao iniciar o frontend:', error);
  }
}

function clearPorts(ports) {
  ports.forEach((port) => {
    const command = process.platform === 'win32' 
      ? `netstat -ano | findstr :${port}` 
      : `lsof -i :${port}`;

    childProcess.exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao verificar a porta ${port}: ${error.message}`);
        return;
      }

      const pid = process.platform === 'win32' ? stdout.split(/\s+/)[4] : stdout.split(/\s+/)[1];
      if (pid) {
        const killCommand = process.platform === 'win32' ? `taskkill /PID ${pid} /F` : `kill -9 ${pid}`;
        childProcess.exec(killCommand, (killError) => {
          if (killError) {
            console.error(`Erro ao matar processo na porta ${port}: ${killError.message}`);
            return;
          }
          console.log(`Porta ${port} liberada. Processo ${pid} encerrado.`);
        });
      } else {
        console.log(`Nenhum processo encontrado na porta ${port}`);
      }
    });
  });
}

app.on('ready', () => {
  startBackend();
  startFrontend();
});

app.on('window-all-closed', () => {
  clearPorts([1234, 2345]);
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    startFrontend();
  }
});
