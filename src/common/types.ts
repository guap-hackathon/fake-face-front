export type FaceStatus = 'real' | 'fake' | 'no_face'

export type ResponseWithFaceStatus = {
  face_status: FaceStatus
}
