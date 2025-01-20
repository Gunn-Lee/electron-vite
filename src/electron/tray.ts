import { getAssetPath } from './pathResolver.js'
import { app, BrowserWindow, Menu, Tray } from 'electron'
import path from 'path'

export function createTray(mainWindow: BrowserWindow) {
  const tray = new Tray(
    path.join(
      getAssetPath(),
      process.platform === 'darwin' ? 'trayIconTemplate.png' : 'trayIcon.png'
    )
  )

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'Show',
        click: () => {
          mainWindow.show()
          // For macOS
          if (app.dock) {
            app.dock.show()
          }
        }
      },
      {
        label: 'Quit',
        click: () => {
          app.quit()
        }
      }
    ])
  )
}
