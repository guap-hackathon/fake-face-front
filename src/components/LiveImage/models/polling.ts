import { createEffect, createEvent, createStore, sample } from 'effector'
import { postImage } from '../../../common/api'
import { captureImage } from '../../../common/utils'
import { $canvas, $video } from './set-refs'
import { ResponseWithFaceStatus } from '../../../common/types'
import { message } from 'antd'

export const cameraStarted = createEvent()

export const cameraStopped = createEvent()

export const $isStopped = createStore(true)
  .on(cameraStarted, () => false)
  .on(cameraStopped, () => true)

export const gettedResponseFromPost = createEvent()

export const postSnapshotFx = createEffect<string | null, { data: ResponseWithFaceStatus }>(
  async (snapshot) => {
    if (!snapshot) {
      throw new Error('Ошибка при получении снэпшота')
    }
    return postImage(snapshot)
  }
)

export const captureImageFx = createEffect(
  ({ video, canvas }: { video: HTMLVideoElement | null; canvas: HTMLCanvasElement | null }) => {
    if (!video || !canvas) throw new Error('Не переданы значения объектов видео и ')
    return captureImage(video, canvas)
  }
)

captureImageFx.fail.watch(({ error }) =>
  message.warning('Ошибка при записи снэпшота' + error.message)
)

export const $snapshot = createStore<string | null>(null).on(
  captureImageFx.doneData,
  (_, value) => value
)

sample({
  clock: cameraStarted,
  source: {
    video: $video,
    canvas: $canvas
  },
  target: captureImageFx
})

sample({
  source: $snapshot,
  filter: (value) => Boolean(value),
  target: postSnapshotFx
})

sample({
  clock: postSnapshotFx.doneData,
  source: {
    video: $video,
    canvas: $canvas,
    isStopped: $isStopped
  },
  filter: ({ isStopped }) => !isStopped,
  target: captureImageFx
})
