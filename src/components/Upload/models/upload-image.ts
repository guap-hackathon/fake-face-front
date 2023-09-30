import { createEffect, createEvent } from 'effector'
import { sample } from 'effector/effector.mjs'
import { UPLOAD_STATUS } from '../const'
import { message } from 'antd'

type FileInsertedParams = {
  file: { type: string; name: string }
  startUpload: () => void
  cancelUpload: () => void
}

export const fileInserted = createEvent<FileInsertedParams>()
fileInserted.watch(() => console.log('fileInserted'))
export const uploadStarted = createEvent()
uploadStarted.watch(() => console.log('uploadStarted'))

type UploadFinished = {
  status: 'done' | 'error'
  fileName: string
  response: { faceStatus: boolean }
}

export const uploadFinished = createEvent<UploadFinished>()
uploadFinished.watch(() => console.log('uploadFinished'))

type UploadSuccessed = {
  response: { faceStatus: boolean }
}

export const uploadSuccessed = createEvent<UploadSuccessed>()
uploadSuccessed.watch(() => console.log('uploadSuccessed'))

type UploadFailed = {
  fileName: string
}

export const uploadFailed = createEvent<UploadFailed>()
uploadFailed.watch(() => console.log('uploadFailed'))

sample({
  clock: uploadFinished.filter({
    fn: (data) => data.status === UPLOAD_STATUS.FAILED
  }),
  source: uploadFinished,
  target: uploadFailed
})

sample({
  clock: uploadFinished.filter({
    fn: (data) => data.status === UPLOAD_STATUS.SUCCESS
  }),
  source: uploadFinished,
  target: uploadSuccessed
})

const showUploadFailedMessage = createEffect(({ fileName }: { fileName: string }) => {
  message.error(`${fileName} ошибка на сервере`)
})

const validateFileFx = createEffect(({ file, startUpload, cancelUpload }: FileInsertedParams) => {
  if (!file) {
    message.error('Ошибка при валидации файла')
    return cancelUpload()
  }
  uploadStarted()
  startUpload()
})

sample({
  source: uploadFailed,
  target: showUploadFailedMessage
})

sample({
  source: fileInserted,
  target: validateFileFx
})
