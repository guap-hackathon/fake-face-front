import { message } from 'antd'
import { createEffect, createEvent, createStore, sample } from 'effector'

export const cameraStartClicked = createEvent()

export const cameraStoppedClicked = createEvent()

export const cameraToggleClicked = createEvent()

export const settedVideo = createEvent<HTMLVideoElement>()

export const settedCanvas = createEvent<HTMLCanvasElement>()

export const $video = createStore<HTMLVideoElement | null>(null).on(
  settedVideo,
  (_, value) => value
)

export const $canvas = createStore<HTMLCanvasElement | null>(null).on(
  settedCanvas,
  (_, value) => value
)

export const startCameraFx = createEffect(async (video: HTMLVideoElement | null) => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true })
  if (video) {
    video.srcObject = stream
    return await video.play()
  }
  throw new Error('Объект видео не определен')
})

startCameraFx.failData.watch(() => message.error('Ошибка при получении видеопотока'))

sample({
  clock: cameraStartClicked,
  source: $video,
  target: startCameraFx
})

export const stopCameraFx = createEffect((video: HTMLVideoElement | null) => {
  if (video) {
    const stream = video.srcObject as MediaStream
    if (stream) {
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())
      video.srcObject = null
    }
  }
})

sample({
  clock: cameraStoppedClicked,
  source: $video,
  target: stopCameraFx
})

export const $cameraPlaying = createStore(false)
  .on(startCameraFx.done, () => true)
  .on(startCameraFx.fail, () => false)
  .on(stopCameraFx.done, () => false)

sample({
  clock: cameraToggleClicked,
  source: $cameraPlaying,
  filter: (playing) => !playing,
  target: cameraStartClicked
})

sample({
  clock: cameraToggleClicked,
  source: $cameraPlaying,
  filter: (playing) => playing,
  target: cameraStoppedClicked
})
