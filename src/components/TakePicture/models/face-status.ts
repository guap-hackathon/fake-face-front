import { createEvent, createStore, sample } from 'effector'
import { FaceStatus } from '../../../common/types'
import { postSnapshotFx } from './snapshot'

export const $faceStatus = createStore<FaceStatus | null>(null).on(
  postSnapshotFx.doneData,
  (_, { data }) => data.face_status
)

export const faceStatusChanged = createEvent<FaceStatus>()

sample({
  clock: faceStatusChanged,
  target: $faceStatus
})
