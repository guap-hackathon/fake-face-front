import { createEvent, createStore, sample } from 'effector'
import { UploadFileStatus } from 'antd/es/upload/interface'
import { ResponseWithFaceStatus } from '../../../common/types'

type File = {
  faceStatus?: 'real' | 'fake' | 'no_face'
  name: string
  hasFaceStatus: boolean
  isValidated: boolean
  inProgress: boolean
}

export const $filesData = createStore<File[] | null>(null)

type ActualizeFilesDataParams = Array<{
  response?: ResponseWithFaceStatus
  name: string
  percent?: number
  status?: UploadFileStatus
}>

export const actualizedFilesData = createEvent<ActualizeFilesDataParams>()
$filesData.watch((data) => console.log('filesData', data))

sample({
  clock: actualizedFilesData,
  fn: (files) => {
    return files.map(({ response, name, percent, status }): File => {
      return {
        name,
        faceStatus: response?.face_status,
        hasFaceStatus: Boolean(response?.face_status),
        isValidated: !(percent === 0 && status == null),
        inProgress: status === 'uploading'
      }
    })
  },
  target: $filesData
})
