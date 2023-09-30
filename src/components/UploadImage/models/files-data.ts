import { createEvent, createStore, sample } from 'effector'
import { WithFaceStatus } from '../types'

type File = {
  faceStatus?: 'real' | 'fake' | 'no_face'
  name: string
  hasFaceStatus: boolean
  isValidated: boolean
}

export const $filesData = createStore<File[] | null>(null)

type ActualizeFilesDataParams = Array<{
  response?: WithFaceStatus
  name: string
  percent?: number
  status?: string
}>

export const actualizedFilesData = createEvent<ActualizeFilesDataParams>()
$filesData.watch((data) => console.log('filesData', data))

sample({
  clock: actualizedFilesData,
  fn: (files) => {
    return files.map(({ response, name, percent, status }): File => {
      return {
        name,
        faceStatus: response?.faceStatus,
        hasFaceStatus: Boolean(response?.faceStatus),
        isValidated: !(percent === 0 && status == null)
      }
    })
  },
  target: $filesData
})
