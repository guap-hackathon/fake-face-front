import { createStore, sample } from 'effector'
import { FaceStatus, ResponseWithFaceStatus } from '../../../common/types'
import { postSnapshotFx } from './polling'
import { $cameraPlaying, cameraStoppedClicked } from './camera'

export const $faceStatus = createStore<{ value: FaceStatus } | null>(null).on(
  cameraStoppedClicked,
  () => null
)

postSnapshotFx.doneData.watch(() => console.log('done data'))

const $responseSuccess = createStore<ResponseWithFaceStatus | null>(null).on(
  postSnapshotFx.doneData,
  (_, { data }) => data
)

export const $isFetching = postSnapshotFx.pending.on(cameraStoppedClicked, () => false)

sample({
  source: {
    response: $responseSuccess,
    isPlaying: $cameraPlaying
  },
  fn: ({ response }) => {
    if (response?.face_status) {
      return { value: response.face_status }
    }
    return null
  },
  filter: ({ isPlaying }) => isPlaying,
  target: $faceStatus,
  greedy: false
})
