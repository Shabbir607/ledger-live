const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

// Fix black screen issues on Wine (disable GPU)
app.disableHardwareAcceleration();

// Handle Squirrel startup events (Windows auto-update)
if (require('electron-squirrel-startup')) {
  app.quit();
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    backgroundColor: '#1e1e1e',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.once('ready-to-show', () => {
    win.show();
  });

  // Define fallback paths to locate index.html
  const fallbackPaths = [
    path.join(process.resourcesPath, 'app', 'dist', 'index.html'), // Packaged: Windows/Linux
    path.join(__dirname, '..', 'dist', 'index.html'),              // Dev: Ubuntu
    path.join(__dirname, 'dist', 'index.html'),                    // Local
    path.join(__dirname, '..', '..', 'dist', 'index.html'),        // Nested builds
    path.join(process.cwd(), 'dist', 'index.html'),                // Fallback
  ];

  let loaded = false;

  for (const p of fallbackPaths) {
    console.log(`🔍 Checking: ${p}`);
    if (fs.existsSync(p)) {
      console.log(`✅ Found index.html at: ${p}`);
      win.loadFile(p);
      loaded = true;
      break;
    }
  }

  if (!loaded) {
    console.error(`❌ Could not find index.html`);
    const htmlError = `
      <html>
        <body style="background: #1e1e1e; color: white; font-family: sans-serif; padding: 2rem;">
          <h1>⚠️ index.html not found</h1>
          <p>Searched these paths:</p>
          <ul>${fallbackPaths.map(p => `<li>${p}</li>`).join('')}</ul>
        </body>
      </html>`;
    win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(htmlError));
  }

  // Log failed UI load attempts
  win.webContents.on('did-fail-load', (event, code, description) => {
    console.error(`❌ Failed to load page: ${description} (Code: ${code})`);
  });

  // Enable DevTools only in development
  if (!app.isPackaged) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
