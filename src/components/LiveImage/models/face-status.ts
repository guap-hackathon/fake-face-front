import { createStore, sample } from 'effector'
import { FaceStatus, ResponseWithFaceStatus } from '../../../common/types'
import { $isStopped, postSnapshotFx } from './polling'

export const $faceStatus = createStore<FaceStatus | null>(null)

postSnapshotFx.doneData.watch(() => console.log('done data'))
$faceStatus.watch((s) => console.log('face status', s))

const $responseSuccess = createStore<ResponseWithFaceStatus | null>(null).on(
  postSnapshotFx.doneData,
  (_, { data }) => data
)
$isStopped.watch((s) => console.log('isStopped', s))
sample({
  source: {
    response: $responseSuccess,
    isStopped: $isStopped
  },
  fn: ({ response }) => response?.face_status || null,
  filter: ({ isStopped }) => !isStopped,
  target: $faceStatus,
  greedy: false
})
