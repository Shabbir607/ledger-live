// electron/main.cjs
const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // optional
      contextIsolation: true,
      nodeIntegration: false,
    }
  })

  // ✅ Works for dev AND packaged build
  const indexHtml = path.join(__dirname, '..', 'dist', 'index.html')

  if (fs.existsSync(indexHtml)) {
    win.loadFile(indexHtml)
  } else {
    win.loadURL('data:text/html,<h1>⚠️ index.html not found</h1>')
    console.error('❌ index.html not found at:', indexHtml)
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
