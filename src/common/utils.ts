export const captureImage = (
  videoValue: HTMLVideoElement | null,
  canvasValue: HTMLCanvasElement | null
) => {
  if (videoValue && canvasValue) {
    const canvas = canvasValue
    const ctx = canvas.getContext('2d')
    if (ctx) {
      canvas.width = videoValue.videoWidth
      canvas.height = videoValue.videoHeight
      ctx.drawImage(videoValue, 0, 0, canvas.width, canvas.height)
      const snapshot = canvas.toDataURL('image/png')
      ctx.reset()
      canvas.width = 0
      canvas.height = 0
      return snapshot
    }
  }
  return null
}
