import { useStore } from 'effector-react'
import { featureModel } from '../models'
import { Alert } from 'antd'
import { FACE_STATUS } from '../../../common/const'
import { Loader } from '../../Loader'

export const Status = () => {
  const faceStatus = useStore(featureModel.$faceStatus)
  const isFetching = useStore(featureModel.$isFetching)

  if (!faceStatus) return null

  let alert
  if (faceStatus === FACE_STATUS.REAL) {
    alert = <Alert message={`Реальное фото`} type="success" showIcon />
  } else if (faceStatus === FACE_STATUS.FAKE) {
    alert = <Alert message={`Фейковое фото`} type="warning" showIcon />
  } else if (faceStatus === FACE_STATUS.NO_FACE) {
    alert = <Alert message={`На фото не обнаружено лица`} type="info" showIcon />
  } else {
    alert = <Alert message="Неправильное значение статуса" type="warning" showIcon />
  }

  return (
    <>
      {alert}
      <Loader spinning={isFetching} />
    </>
  )
}
