export type CustomFile = {
  faceStatus?: 'real' | 'fake' | 'no_face'
  inProgress: boolean
  name: string
  hasFaceStatus: boolean
  isValidated: boolean
  url?: string
}
