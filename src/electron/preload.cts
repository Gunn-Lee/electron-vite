const electron = require('electron')

/**
 * Only expose allowed electron method to the window object
 * Usage Example: window.electron.subscribeStatistics((statistics) => console.log(statistics))
 */

electron.contextBridge.exposeInMainWorld('electron', {
  subscribeStatistics: (callback) =>
    ipcOn('statistics', (statistics) => callback(statistics)),
  getStaticData: () => ipcInvoke('getStaticData')
} satisfies Window['electron'])

// ipc invoke and on using adapter pattern
function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key)
}

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (event: EventPayloadMapping[Key]) => void
) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload)
  electron.ipcRenderer.on(key, cb)
  return () => electron.ipcRenderer.off(key, cb)
}
