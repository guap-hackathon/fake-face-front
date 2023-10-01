export type FaceStatus = 'real' | 'fake' | 'no_face'

export type ResponseWithFaceStatus = {
  face_status: FaceStatus
}

export type UploadStatus = 'done' | 'error' | 'uploading' | 'removed'
