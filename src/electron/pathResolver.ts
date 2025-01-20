import path from 'path'
import { app } from 'electron'
import { isDev } from './util.js'

export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? '.' : '..',
    '/dist-electron/preload.cjs'
  )
}

// This function is used in the main process to get the path to the UI
export function getUIPath() {
  return path.join(app.getAppPath(), '/dist-vite/index.html')
}

// This function is used in the main process to get the path to the assets folder
export function getAssetPath() {
  return path.join(app.getAppPath(), isDev() ? '.' : '..', '/src/assets')
}
