import { app, BrowserWindow, Menu } from 'electron'
import { ipcMainHandle, ipcMainOn, isDev } from './util.js'
import { getStaticData, pollResources } from './resourceManager.js'
import { getPreloadPath, getUIPath } from './pathResolver.js'
import { createTray } from './tray.js'
import { createMenu } from './menu.js'
import fs from 'fs'
import path from 'path'
import os from 'os'

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath()
    }
    // // disables default system frame (dont do this if you want a proper working menu bar)
    // frame: false
  })
  if (isDev()) {
    mainWindow.loadURL('http://localhost:5050')
  } else {
    mainWindow.loadFile(getUIPath())
  }

  pollResources(mainWindow)

  ipcMainHandle('getStaticData', () => {
    return getStaticData()
  })

  ipcMainOn('sendFrameAction', (payload) => {
    switch (payload) {
      case 'CLOSE':
        mainWindow.close()
        break
      case 'MAXIMIZE':
        mainWindow.maximize()
        break
      case 'MINIMIZE':
        mainWindow.minimize()
        break
    }
  })

  ipcMainHandle('createFolder', async () => {
    return await createFolder()
  })

  createTray(mainWindow)
  handleCloseEvents(mainWindow)
  createMenu(mainWindow)
})

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false

  mainWindow.on('close', (e) => {
    if (willClose) {
      return
    }
    e.preventDefault()
    mainWindow.hide()
    if (app.dock) {
      app.dock.hide()
    }
  })

  app.on('before-quit', () => {
    willClose = true
  })

  mainWindow.on('show', () => {
    willClose = false
  })
}

async function createFolder(): Promise<{
  type: string
  folderName: string
  message: string
}> {
  const folderPath = path.join(
    isDev() ? app.getAppPath() : app.getPath('desktop'),
    '/tmp/test-folder'
  )
  console.log('Creating folder:', folderPath)

  // create folder logic
  try {
    await fs.promises.mkdir(folderPath, { recursive: true })
    return {
      type: 'success',
      folderName: folderPath,
      message: 'Folder created successfully'
    }
  } catch (error) {
    console.error('Error creating folder:', error)
    throw error
  }
}
