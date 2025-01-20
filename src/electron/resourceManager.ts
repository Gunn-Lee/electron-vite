import osUtils from 'os-utils'
import os from 'os'
import fs from 'fs'
import { BrowserWindow } from 'electron'
import { ipcWebContentSend } from './util.js'

const POLLING_INTERVAL_MS = 500

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage()
    const ramUsage = getRamUsage()
    const storageData = getStorageData()
    ipcWebContentSend('statistics', mainWindow.webContents, {
      cpuUsage,
      ramUsage,
      storageUsage: storageData.usage
    })
    // console.log({ cpuUsage, ramUsage, storageUsage: storageData.usage })
  }, POLLING_INTERVAL_MS)
}

export function getStaticData() {
  const totalStorage = getStorageData().total
  const cpuModel = os.cpus()[0].model
  const totalMemoryGB = Math.round((os.totalmem() / 1024) * 100) / 100 // in GB

  return {
    totalStorage,
    cpuModel,
    totalMemoryGB
  }
}

export function getCpuUsage(): Promise<number> {
  return new Promise((resolve, reject) => {
    osUtils.cpuUsage(resolve)
  })
}

export function getRamUsage() {
  return 1 - osUtils.freememPercentage()
}

export function getStorageData() {
  const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/')
  const total = stats.bsize * stats.blocks
  const free = stats.bsize * stats.bfree

  return {
    total: Math.round((total / 1_000_000_000) * 100) / 100, // in GB
    usage: 1 - free / total // in percentage
  }
}
