import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { ipcMainHandle, isDev } from './util.js'
import { getStaticData, pollResources } from './resourceManager.js'
import { getPreloadPath } from './pathResolver.js'

type test = string

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // nodeIntegration: true -> security risk
      preload: getPreloadPath()
    }
  })

  if (isDev()) {
    console.log('Development mode')
    mainWindow.loadURL('http://localhost:5050')
  } else {
    console.log('Production mode')
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-vite/index.html'))
  }

  pollResources(mainWindow)

  ipcMainHandle('getStaticData', () => {
    return getStaticData()
  })
})
