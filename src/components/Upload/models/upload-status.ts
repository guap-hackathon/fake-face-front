import { createStore } from 'effector'
import { UploadStatus } from '../type'
import { UPLOAD_STATUS } from '../const'
import { fileInserted, uploadFailed, uploadSuccessed, uploadStarted } from './upload-image'

export const $uploadStatus = createStore<UploadStatus | null>(null)
  .on(fileInserted, () => null)
  .on(uploadFailed, () => UPLOAD_STATUS.FAILED)
  .on(uploadSuccessed, () => UPLOAD_STATUS.SUCCESS)
$uploadStatus.watch((state) => console.log('upload status', state))

export const $isUploading = createStore(false)
  .on(uploadStarted, () => true)
  .on([uploadSuccessed, uploadFailed], () => false)
$isUploading.watch((state) => console.log('is uploading', state))

export const $uploadIsDisabled = createStore(false)
  .on(uploadStarted, () => true)
  .on([uploadSuccessed, uploadFailed], () => false)
$uploadIsDisabled.watch((state) => console.log('uploadIsDisabled', state))
