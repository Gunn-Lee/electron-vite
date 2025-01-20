import { ipcMain, WebContents, WebFrameMain } from 'electron'
import { pathToFileURL } from 'url'
import { getUIPath } from './pathResolver.js'

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development'
}

// Define the mapping of IPC event names to their payload types
export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: () => EventPayloadMapping[Key]
) {
  ipcMain.handle(key, (event) => {
    if (!event.senderFrame) throw new Error('No sender frame')
    validateEventFrame(event.senderFrame)
    return handler()
  })
}

export function ipcWebContentSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key]
) {
  webContents.send(key, payload)
}

export function validateEventFrame(frame: WebFrameMain) {
  if (isDev() && new URL(frame.url).host === 'localhost:5050') {
    return
  }
  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error('Malicious event detected')
  }
}
