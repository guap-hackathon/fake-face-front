import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'antd'
import axios from 'axios'
import './TakePicture.css'

export const TakePicture: React.FC = () => {
  const [image, setImage] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isCameraOn, setIsCameraOn] = useState(false)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
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
      setIsCameraOn(false)
    }
  }

  const captureAndUpload = () => {
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
      setIsCameraOn(true)
    }
  }

  return (
    <div className="container">
      <div className="videoContainer">
        <div className="videoFrame">
          <video ref={videoRef} className="video" />
        </div>
        <div className="imageContainer">
          {image && <img src={image} alt="Снимок" className="image" />}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
      </div>
      <div className="buttonsContainer">
        <Button onClick={toggleCamera}>
          {isCameraOn ? 'Отключить камеру' : 'Включить камеру'}
        </Button>
        <Button onClick={captureAndUpload}>Сделать снимок</Button>
      </div>
    </div>
  )
}
