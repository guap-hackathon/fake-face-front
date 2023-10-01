import { useStore } from 'effector-react'
import { featureModel } from '../models'
import { Alert } from 'antd'
import { FACE_STATUS } from '../../../common/const'

export const Status = () => {
  const faceStatus = useStore(featureModel.$faceStatus)
  console.log('FACE SATTUS', faceStatus)
  if (!faceStatus) return null

  if (faceStatus === FACE_STATUS.REAL) {
    return <Alert message={`Реальное фото`} type="success" showIcon />
  }
  if (faceStatus === FACE_STATUS.FAKE) {
    return <Alert message={`Фейковое фото`} type="warning" showIcon />
  }
  if (faceStatus === FACE_STATUS.NO_FACE) {
    return <Alert message={`На фото не обнаружено лица`} type="info" showIcon />
  }

  return <Alert message="Неправильное значение статуса" type="warning" showIcon />
}
