import loadable from '@loadable/component'
import { getUrl } from 'apis/api'
import { CandleReceivedSignalR } from 'components/chart/models'

const signalRLib = loadable.lib(() => import('@microsoft/signalr'))

let signalRModule: any
let signalRLoaded = false

export interface Connections {
  [key: string]: signalR.HubConnection | null
}

export const currentConnections: Connections = {}

export const initNotificationHub = async (setCandleReceived: (params: CandleReceivedSignalR) => void) => {
  if (currentConnections.generic) return
  const connection = await buildConnection(getUrl('hubs/generic'))

  if (!connection) return

  currentConnections.generic = connection

  connection.on('CandleReceived', (params: CandleReceivedSignalR) => {
    console.log('CandleReceived', params)
    setCandleReceived(params)
  })

  if (connection.state === 'Disconnected') {
    try {
      console.log('Notifications hub starting connection')

      await connection.start()

      console.log('Notifications hub connection started')
    } catch (error) {
      console.error('Connection could not start', error)
    }
  }
}

export const stopNotificationHub = () => {
  if (currentConnections.generic) {
    currentConnections.generic.stop()
    currentConnections.generic = null
    console.log('notifications hub connection stopped')
  }
}

const initSignalR = async () => {
  if (signalRModule) return signalRModule

  if (signalRLoaded) return

  signalRLoaded = true

  signalRModule = await signalRLib.load()

  return signalRModule
}

export const buildConnection = async (url: string) => {
  const signalR = await initSignalR()

  if (!signalR) return

  return new signalR.HubConnectionBuilder()
    .withUrl(url, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    } as signalR.IHttpConnectionOptions)
    .withAutomaticReconnect([2000, 5000, 13000, 21000, 55000])
    .build()
}
