const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("TENO", {
    E: {
        version: process.env.npm_package_version,
        versions: process.versions
    }
})