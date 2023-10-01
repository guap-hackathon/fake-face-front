import { createEffect, createEvent, createStore, sample } from 'effector'
import { ResponseWithFaceStatus } from '../../../common/types'
import { message } from 'antd'
import { postImage } from '../../../common/api'
import { captureImage } from '../../../common/utils'
import { $video, $canvas, $cameraPlaying } from './camera'

export const shapshotCaptured = createEvent<string>()

export const createSnapshotClicked = createEvent()

export const postSnapshotFx = createEffect<string | null, { data: ResponseWithFaceStatus }>(
  async (snapshot: string | null) => {
    if (!snapshot) {
      throw new Error('Ошибка при получении снэпшота')
    }
    return postImage(snapshot)
  }
)

postSnapshotFx.failData.watch((error) => {
  message.error('Произошла ошибка во время запроса статуса: ' + error.message)
})

export const captureImageFx = createEffect(
  ({ video, canvas }: { video: HTMLVideoElement | null; canvas: HTMLCanvasElement | null }) => {
    if (!video || !canvas) throw new Error('Не переданы значения объектов видео и ')
    return captureImage(video, canvas)
  }
)

captureImageFx.fail.watch(({ error }) =>
  message.warning('Ошибка при записи снэпшота' + error.message)
)

export const $isFetching = postSnapshotFx.pending

export const $snapshot = createStore<string | null>(null).on(
  captureImageFx.doneData,
  (_, value) => value
)

sample({
  clock: createSnapshotClicked,
  source: {
    video: $video,
    canvas: $canvas,
    cameraPlaying: $cameraPlaying
  },
  filter: ({ cameraPlaying }) => cameraPlaying,
  target: captureImageFx
})

sample({
  source: $snapshot,
  filter: (data) => Boolean(data),
  target: postSnapshotFx
})
