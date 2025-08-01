// electron/preload.js
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // empty for now, safe access to node features
});
