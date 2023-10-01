import { FaceStatus } from '../../common/types'
import { Alert, Space } from 'antd'
import { FACE_STATUS } from '../../common/const'
import { Loader } from '../Loader'

interface Props {
  status?: FaceStatus | null
  isFetching: boolean
}

export const FaceStatusAlert = ({ status, isFetching }: Props) => {
  const time = new Date().toLocaleTimeString()

  let alert
  if (status === FACE_STATUS.REAL) {
    alert = <Alert message={`Реальное фото. Время: ${time}`} type="success" showIcon />
  } else if (status === FACE_STATUS.FAKE) {
    alert = <Alert message={`Фейковое фото. Время: ${time}`} type="warning" showIcon />
  } else if (status === FACE_STATUS.NO_FACE) {
    alert = <Alert message={`На фото не обнаружено лица. Время: ${time}`} type="info" showIcon />
  } else {
    alert = (
      <Alert message={`Неизвестное значение статуса. Время: ${time}`} type="warning" showIcon />
    )
  }

  return (
    <Space split style={{ marginTop: '10px' }}>
      {status && alert}
      <Loader spinning={isFetching} />
    </Space>
  )
}
