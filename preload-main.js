const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods for main ERP window
contextBridge.exposeInMainWorld('electronAPI', {
  print: (options) => ipcRenderer.invoke('print-page', options),
  printToPDF: (options) => ipcRenderer.invoke('print-to-pdf', options),
  logout: () => ipcRenderer.invoke('logout')
});
