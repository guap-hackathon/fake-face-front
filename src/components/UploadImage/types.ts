import { RcFile } from 'antd/es/upload'

export type CustomFile = RcFile & {
  isValidated: boolean
}

export type FaceStatus = 'real' | 'fake' | 'no_face'

export type WithFaceStatus = {
  faceStatus: FaceStatus
}
