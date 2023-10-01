import React, { useEffect } from 'react'
import { Button } from 'antd'
import './LiveImage.css'
import { featureModel } from '../models'
import { useStore } from 'effector-react'
import { FaceStatusAlert } from '../../FaceStatus/FaceStatusAlert'

export const LiveImage: React.FC = () => {
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

  return (
    <div className="container-desc">
      <div className="video-container-desc">
        <video
          className="video"
          ref={(videoRef) => {
            if (videoRef) featureModel.settedVideo(videoRef)
          }}
        />
      </div>
      <Button onClick={toggleCamera} style={{ width: 'auto' }}>
        {playing ? 'Остановить трансляцию' : 'Начать трансляцию'}
      </Button>
      <canvas
        ref={(canvasRef) => {
          if (canvasRef) featureModel.settedCanvas(canvasRef)
        }}></canvas>
      {playing && <FaceStatusAlert status={faceStatus?.value} isFetching={isFetching} />}
    </div>
  )
}
