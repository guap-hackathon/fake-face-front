import { fileInserted, uploadFinished } from './upload-image'
import { $uploadStatus, $isUploading, $uploadIsDisabled } from './upload-status'

export const uploadModel = {
  fileInserted,
  uploadFinished,
  $uploadStatus,
  $isUploading,
  $uploadIsDisabled
}
