const { app, BrowserWindow } = require('electron');
const path = require('path');
const childProcess = require('child_process');


let mainWindow = null;

function startBackend() {
  console.log('Iniciando o backend Express...');

  const serverProcess = childProcess.spawn('npm', ['run', 'dev'], {
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

async function createWindow() {
  const { default: isDev } = await import('electron-is-dev');

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

  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startURL);

  mainWindow.openDevTools();

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', () => {
  // startBackend();
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
