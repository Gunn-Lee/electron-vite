type Statistics = {
  cpuUsage: number
  ramUsage: number
  storageUsage: number
}

type StaticData = {
  totalStorage: number
  cpuModel: string
  totalMemoryGB: number
}

type View = 'CPU' | 'RAM' | 'STORAGE'

type FrameWindowAction = 'CLOSE' | 'MAXIMIZE' | 'MINIMIZE'

type CreateFolder = {
  type: string
  folderName: string
  message: string
}

type EventPayloadMapping = {
  statistics: Statistics
  getStaticData: StaticData
  changeView: View
  sendFrameAction: FrameWindowAction
  createFolder: CreateFoler
}

type UnsubscribeFunction = () => void

interface Window {
  electron: {
    subscribeStatistics: (
      callback: (statistics: Statistics) => void
    ) => UnsubscribeFunction
    getStaticData: () => Promise<StaticData>
    subscribeChangeView: (callback: (view: View) => void) => UnsubscribeFunction
    sendFrameAction: (payload: FrameWindowAction) => void
    createFolder: () => Promise<CreateFolder>
  }
}
