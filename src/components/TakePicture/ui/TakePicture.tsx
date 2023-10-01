import React, { useEffect } from 'react'
import { Button } from 'antd'
import './TakePicture.css'
import { featureModel } from '../models'
import { useStore } from 'effector-react'
import { FaceStatusAlert } from '../../FaceStatus/FaceStatusAlert'

export const TakePicture: React.FC = () => {
  const snapshot = useStore(featureModel.$snapshot)
  const playing = useStore(featureModel.$cameraPlaying)
  const faceStatus = useStore(featureModel.$faceStatus)
  const isFetching = useStore(featureModel.$isFetching)

  useEffect(() => {
    return () => {
      featureModel.cameraStoppedClicked()
    }
  }, [])

  const toggleCamera = () => {
    featureModel.cameraToggleClicked()
  }

  const createSnapshot = () => {
    featureModel.createSnapshotClicked()
  }

  return (
    <div className="container">
      <div className="videoContainer">
        <div className="videoFrame">
          <video
            ref={(videoRef) => {
              if (videoRef) featureModel.settedVideo(videoRef)
            }}
            className="video"
          />
        </div>
        <div className="imageContainer">
          {snapshot && <img src={snapshot} alt="Снимок" className="image" />}
          <canvas
            ref={(canvasRef) => {
              if (canvasRef) featureModel.settedCanvas(canvasRef)
            }}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      <div className="buttonsContainer">
        <Button onClick={toggleCamera} style={{ marginRight: '10px' }}>
          {playing ? 'Отключить камеру' : 'Включить камеру'}
        </Button>
        <Button onClick={createSnapshot} disabled={!playing}>
          Сделать снимок
        </Button>
      </div>
      <FaceStatusAlert status={faceStatus} isFetching={isFetching} />
    </div>
  )
}
