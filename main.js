const { app, BrowserWindow, BrowserView, ipcMain, session, dialog, nativeImage } = require('electron');
const path = require('path');
const keytar = require('keytar');
const Store = require('electron-store');
const { autoUpdater } = require('electron-updater');

const store = new Store();
const SERVICE_NAME = 'ERPNext-Desktop';

// Load app icon
const appIcon = nativeImage.createFromPath(path.join(__dirname, 'build', 'icon.png'));

let loginWindow = null;
let mainWindow = null;
let erpView = null;

// Security: Disable hardware acceleration for better compatibility
app.disableHardwareAcceleration();

// App lifecycle
app.whenReady().then(() => {
  // Set dock icon on macOS
  if (process.platform === 'darwin') {
    app.dock.setIcon(appIcon);
  }
  
  createLoginWindow();
  setupAutoUpdater();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createLoginWindow();
  }
});

// Create login window
function createLoginWindow() {
  loginWindow = new BrowserWindow({
    width: 450,
    height: 650,
    resizable: false,
    icon: appIcon,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload-login.js')
    },
    title: 'ERPNext Login',
    center: true
  });

  loginWindow.loadFile('login.html');
  
  // Remove menu bar
  loginWindow.setMenuBarVisibility(false);
  
  loginWindow.on('closed', () => {
    loginWindow = null;
  });
}

// Create main ERP window
function createMainWindow(erpUrl) {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    icon: appIcon,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload-main.js')
    },
    title: 'ERPNext',
    show: false
  });

  // Remove menu bar (optional - users might want File menu for print)
  // mainWindow.setMenuBarVisibility(false);

  // Create BrowserView for ERPNext
  erpView = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      partition: 'persist:erpnext'
    }
  });

  mainWindow.setBrowserView(erpView);
  
  // Set bounds to fill window
  const bounds = mainWindow.getContentBounds();
  erpView.setBounds({ x: 0, y: 0, width: bounds.width, height: bounds.height });
  erpView.setAutoResize({ width: true, height: true });

  // Load ERPNext URL
  erpView.webContents.loadURL(erpUrl);

  // Show window when ready
  erpView.webContents.on('did-finish-load', () => {
    mainWindow.show();
    if (loginWindow && !loginWindow.isDestroyed()) {
      loginWindow.close();
    }
  });

  // Handle navigation
  erpView.webContents.on('will-navigate', (event, url) => {
    // Only allow navigation within same domain
    const erpDomain = new URL(erpUrl).origin;
    if (!url.startsWith(erpDomain)) {
      event.preventDefault();
    }
  });

  // Setup printing
  setupPrinting(erpView.webContents);

  // Handle window close
  mainWindow.on('closed', () => {
    mainWindow = null;
    erpView = null;
  });

  // Offline detection
  erpView.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    if (errorCode === -105 || errorCode === -106) { // Name not resolved / Internet disconnected
      dialog.showErrorBox('Connection Error', 'Unable to connect to ERPNext. Please check your internet connection.');
    }
  });
}

// Handle login
ipcMain.handle('login', async (event, { url, username, password }) => {
  try {
    // Validate URL
    if (!url.startsWith('https://')) {
      throw new Error('ERPNext URL must use HTTPS');
    }

    const axios = require('axios');
    const https = require('https');

    // Create axios instance with cookie jar
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: true // Enforce valid SSL certificates
      }),
      withCredentials: true
    });
    
    // Attempt login
    const response = await instance.post(
      `${url}/api/method/login`,
      `usr=${encodeURIComponent(username)}&pwd=${encodeURIComponent(password)}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      }
    );

    if (response.data.message === 'Logged In' || response.status === 200) {
      // Store credentials securely
      await keytar.setPassword(SERVICE_NAME, username, password);
      store.set('lastUsername', username);
      store.set('erpUrl', url);

      // Get cookies from response
      const cookies = response.headers['set-cookie'];
      if (cookies) {
        const ses = session.fromPartition('persist:erpnext');
        for (const cookie of cookies) {
          const cookieParts = cookie.split(';')[0].split('=');
          const name = cookieParts[0];
          const value = cookieParts.slice(1).join('=');
          
          await ses.cookies.set({
            url: url,
            name: name,
            value: value,
            secure: true,
            httpOnly: true
          });
        }
      }

      // Create main window
      createMainWindow(url);
      
      return { success: true };
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      error: error.response?.data?.message || error.message || 'Login failed'
    };
  }
});

// Get saved credentials
ipcMain.handle('get-saved-credentials', async () => {
  const username = store.get('lastUsername');
  const url = store.get('erpUrl');
  let password = null;
  
  if (username) {
    try {
      password = await keytar.getPassword(SERVICE_NAME, username);
    } catch (error) {
      console.error('Error retrieving password:', error);
    }
  }
  
  return { url, username, password };
});

// Printing setup
function setupPrinting(webContents) {
  // Handle print requests
  webContents.on('did-create-window', (newWindow) => {
    // Handle popup windows (like print preview)
    newWindow.webContents.on('ready-to-show', () => {
      newWindow.show();
    });
  });

  // Custom print handler
  ipcMain.handle('print-page', async (event, options = {}) => {
    try {
      await webContents.print({
        silent: options.silent || false,
        printBackground: true,
        color: options.color !== false,
        margins: {
          marginType: options.marginType || 'default'
        },
        landscape: options.landscape || false,
        scaleFactor: options.scaleFactor || 100,
        pagesPerSheet: options.pagesPerSheet || 1,
        collate: options.collate !== false,
        copies: options.copies || 1,
        pageSize: options.pageSize || 'A4'
      });
      return { success: true };
    } catch (error) {
      console.error('Print error:', error);
      return { success: false, error: error.message };
    }
  });

  // Print to PDF
  ipcMain.handle('print-to-pdf', async (event, options = {}) => {
    try {
      const data = await webContents.printToPDF({
        printBackground: true,
        landscape: options.landscape || false,
        pageSize: options.pageSize || 'A4',
        margins: {
          marginType: options.marginType || 'default'
        }
      });
      
      // Show save dialog
      const { filePath } = await dialog.showSaveDialog({
        defaultPath: options.filename || 'document.pdf',
        filters: [{ name: 'PDF', extensions: ['pdf'] }]
      });
      
      if (filePath) {
        const fs = require('fs').promises;
        await fs.writeFile(filePath, data);
        return { success: true, filePath };
      }
      
      return { success: false, error: 'Cancelled' };
    } catch (error) {
      console.error('PDF export error:', error);
      return { success: false, error: error.message };
    }
  });
}

// Auto-updater setup
function setupAutoUpdater() {
  autoUpdater.checkForUpdatesAndNotify();
  
  autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Available',
      message: 'A new version is available. It will be downloaded in the background.'
    });
  });

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Ready',
      message: 'Update downloaded. The application will restart to install the update.',
      buttons: ['Restart', 'Later']
    }).then((result) => {
      if (result.response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
  });
}

// Logout handler
ipcMain.handle('logout', async () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.close();
  }
  
  // Clear session
  const ses = session.fromPartition('persist:erpnext');
  await ses.clearStorageData();
  
  createLoginWindow();
  return { success: true };
});
