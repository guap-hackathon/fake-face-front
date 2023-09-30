import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'antd'
import axios from 'axios'

export const TakePicture: React.FC = () => {
  const [image, setImage] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

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
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#fff'
      }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div
          style={{
            border: '2px solid #1890ff',
            height: '303px',
            borderRadius: '10px',
            marginBottom: '2px',
            marginRight: '10px',
            position: 'relative'
          }}>
          <video
            ref={videoRef}
            style={{ width: '400px', height: '300px', borderRadius: '9px', position: 'relative' }}
          />
        </div>
        <div
          style={{
            width: '400px',
            height: '303px',
            border: '2px solid #1890ff',
            borderRadius: '10px',
            position: 'relative'
          }}>
          {image && (
            <img
              src={image}
              alt="Снимок"
              style={{
                objectFit: 'contain',
                width: '100%',
                minWidth: '400px',
                height: '100%',
                borderRadius: '8px'
              }}
            />
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={startCamera} style={{ marginRight: '10px' }}>
          Включить камеру
        </Button>
        <Button onClick={stopCamera} style={{ marginRight: '10px' }}>
          Отключить камеру
        </Button>
        <Button onClick={captureAndUpload}>Сделать снимок</Button>
      </div>
    </div>
  )
}
