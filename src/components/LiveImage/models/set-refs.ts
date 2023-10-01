import { createEvent, createStore } from 'effector'

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
