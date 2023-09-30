import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'antd'
import axios from 'axios'
import './LiveImage.css'

const LiveImage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [videoIsStopped, setVideoIsStopped] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()

        captureAndUpload()
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
      setVideoIsStopped(true)
      setIsStreaming(false)
      setImage(null)
    }
  }

  const captureAndUpload = () => {
    if (videoIsStopped) {
      return
    }
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        canvas.width = videoRef.current.videoWidth
        canvas.height = videoRef.current.videoHeight
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

        const capturedImage = canvas.toDataURL('image/png')
        setImage(capturedImage)

        // Отправляем снимок на бэкенд
        axios
          .post('URL_БЭКА', { image: capturedImage })
          .then((response) => {
            console.log('Ответ от сервера:', response.data)

            captureAndUpload()
          })
          .catch((error) => {
            console.error('Ошибка при отправке изображения на сервер:', error)
          })
      }
    }
  }

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
      </div>
    )
  }
}

export default LiveImage
