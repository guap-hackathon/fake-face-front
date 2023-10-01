import { createEffect, createEvent, createStore, sample } from 'effector'
import { ResponseWithFaceStatus } from '../../../common/types'
import { message } from 'antd'
import { postImage } from '../../../common/api'

export const shapshotCaptured = createEvent<string>()

export const $snapshot = createStore<string | null>(null).on(shapshotCaptured, (_, value) => value)

export const postSnapshotFx = createEffect<string | null, { data: ResponseWithFaceStatus }>(
  async (snapshot: string | null) => {
    if (!snapshot) {
      throw new Error('Ошибка при получении снэпшота')
    }
    return postImage(snapshot)
  }
)

postSnapshotFx.failData.watch((error) =>
  message.error('Ошибка при загрузке изображения: ' + error.message)
)

sample({
  source: $snapshot,
  filter: (data) => Boolean(data),
  target: postSnapshotFx
})
