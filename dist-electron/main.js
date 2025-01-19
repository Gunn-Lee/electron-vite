import { app, BrowserWindow } from 'electron';
import path from 'path';
app.on('ready', () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile(path.join(app.getAppPath(), '/dist-vite/index.html'));
});
