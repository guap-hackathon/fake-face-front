import { $faceStatus } from './face-status'
import { cameraStarted, cameraStopped } from './polling'
import { settedCanvas, settedVideo } from './set-refs'

export const featureModel = {
  settedVideo,
  settedCanvas,
  cameraStarted,
  cameraStopped,
  $faceStatus
}
