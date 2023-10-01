import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'antd'
import './LiveImage.css'
import { featureModel } from '../models'
import { Status } from './Status'

export const LiveImage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  // const [videoIsStopped, setVideoIsStopped] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        featureModel.cameraStarted()
      }
    } catch (error) {
      console.error('Ошибка при получении видеопотока:', error)
    }
  }

  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream
      if (stream) {
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
        videoRef.current.srcObject = null
      }
      setIsStreaming(false)
      setImage(null)
      featureModel.cameraStopped()
    }
  }

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      featureModel.settedVideo(videoRef.current)
      featureModel.settedCanvas(canvasRef.current)
    }
  }, [videoRef.current, canvasRef.current])

  useEffect(() => {
    console.log('Компонент монтируется')

    return () => {
      console.log('Компонент размонтируется')
      stopCamera()
    }
  }, [])

  const toggleCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      stopCamera()
    } else {
      startCamera()
      setIsStreaming(true)
    }
  }

  if (window.innerWidth < 500) {
    return (
      <div className="container">
        <div className="video-container">
          <video className="video" ref={videoRef} />
        </div>
        <Button onClick={toggleCamera} style={{ width: 'auto' }}>
          {isStreaming ? 'Остановить трансляцию' : 'Начать трансляцию'}
        </Button>
        {image && <img className="video-image" src={image} alt="Снимок" />}
      </div>
    )
  } else {
    return (
      <div className="container-desc">
        <div className="video-container-desc">
          <video className="video" ref={videoRef} />
        </div>
        <Button onClick={toggleCamera} style={{ width: 'auto' }}>
          {isStreaming ? 'Остановить трансляцию' : 'Начать трансляцию'}
        </Button>
        {image && <img className="video-image" src={image} alt="Снимок" />}
        <canvas ref={canvasRef}></canvas>
        <Status />
      </div>
    )
  }
}
