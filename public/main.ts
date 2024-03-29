import { app, BrowserWindow } from "electron";

import isDev from "electron-is-dev";
import path from "path";

require("@electron/remote/main").initialize();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file//${path.join(__dirname, "../build/index.html")}`
  );
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform === "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
