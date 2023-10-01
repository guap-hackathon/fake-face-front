import {
  $cameraPlaying,
  cameraStoppedClicked,
  cameraToggleClicked,
  settedCanvas,
  settedVideo
} from './camera'
import { $faceStatus } from './face-status'
import { shapshotCaptured, $snapshot, $isFetching, createSnapshotClicked } from './snapshot'

export const featureModel = {
  shapshotCaptured,
  $snapshot,
  $faceStatus,
  $isFetching,
  $cameraPlaying,
  cameraStoppedClicked,
  cameraToggleClicked,
  settedVideo,
  settedCanvas,
  createSnapshotClicked
}
