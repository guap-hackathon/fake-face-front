import { createEffect, createEvent, sample } from 'effector'
import { RcFile } from 'antd/es/upload'
import { message } from 'antd'

type FileInsertedParams = {
  file: RcFile
  startUpload: () => void
  cancelUpload: () => void
}

export const fileInserted = createEvent<FileInsertedParams>()

const validateFileFx = createEffect(({ file, startUpload, cancelUpload }: FileInsertedParams) => {
  console.log('validate')
  if (!file.type.startsWith('image/')) {
    message.error(`${file.name}: неверный формат данных, нужен image`)
    return cancelUpload()
  }
  startUpload()
})

sample({
  source: fileInserted,
  target: validateFileFx
})
