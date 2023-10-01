import { $faceStatus, $isFetching } from './face-status'
import {
  $cameraPlaying,
  $canvas,
  $video,
  cameraStoppedClicked,
  cameraToggleClicked,
  settedCanvas,
  settedVideo
} from './camera'

export const featureModel = {
  settedVideo,
  settedCanvas,
  cameraStoppedClicked,
  cameraToggleClicked,
  $faceStatus,
  $video,
  $canvas,
  $cameraPlaying,
  $isFetching
}
