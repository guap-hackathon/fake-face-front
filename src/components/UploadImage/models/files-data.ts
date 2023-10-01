import { createEvent, createStore, sample } from 'effector'
import { UploadFileStatus } from 'antd/es/upload/interface'
import { ResponseWithFaceStatus } from '../../../common/types'

type CustomFile = {
  faceStatus?: 'real' | 'fake' | 'no_face'
  status?: 'done' | 'error' | 'uploading' | 'removed'
  name: string
  hasFaceStatus: boolean
  isValidated: boolean
  url?: string
}

export const $filesData = createStore<CustomFile[] | null>(null)

type ActualizeFilesDataParams = Array<{
  response?: ResponseWithFaceStatus
  name: string
  percent?: number
  status?: UploadFileStatus
  originFileObj?: File
}>

export const actualizedFilesData = createEvent<ActualizeFilesDataParams>()
$filesData.watch((data) => console.log('filesData', data))

sample({
  clock: actualizedFilesData,
  fn: (files) => {
    return files
      .map(({ response, name, percent, status, originFileObj }): CustomFile => {
        return {
          name,
          status,
          faceStatus: response?.face_status,
          hasFaceStatus: Boolean(response?.face_status),
          isValidated: !(percent === 0 && status == null),
          url: originFileObj && URL.createObjectURL(originFileObj)
        }
      })
      .filter((file) => file.isValidated)
  },
  target: $filesData
})
