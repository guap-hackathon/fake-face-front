// import { useStore } from 'effector-react'
// import { featureModel } from '../models'
// import { Alert, Space } from 'antd'
// import { FACE_STATUS } from '../../../common/const'

// export const StatusList: React.FC = () => {
//   const filesData = useStore(featureModel.$filesData)

//   if (!filesData) {
//     return <Alert type="info" message="Данных для отображения нет" showIcon />
//   }

//   return (
//     <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
//       {filesData.map(({ name, faceStatus, uploadStatus, hasFaceStatus, isValidated }, idx) => {
//         if (uploadStatus === 'uploading') {
//           return (
//             <Alert
//               key={`${name}-${idx}`}
//               message={`${name}: Ожидание ответа от сервера`}
//               showIcon
//               type="info"
//             />
//           )
//         }
//         if (!isValidated) {
//           return (
//             <Alert
//               key={`${name}-${idx}`}
//               message={`${name}: Файл не прошел валидацию`}
//               description="Файл должен иметь формат изображения image"
//               showIcon
//               type="error"
//             />
//           )
//         }
//         if (!hasFaceStatus) {
//           return (
//             <Alert
//               key={`${name}-${idx}`}
//               message={`${name}: Нет ответа от сервера`}
//               description="Произошла ошибка при запросе на сервер"
//               type="error"
//               showIcon
//             />
//           )
//         }
//         if (faceStatus === FACE_STATUS.REAL) {
//           return (
//             <Alert
//               key={`${name}-${idx}`}
//               message={`${name}: Реальное фото`}
//               type="success"
//               showIcon
//             />
//           )
//         }
//         if (faceStatus === FACE_STATUS.FAKE) {
//           return (
//             <Alert
//               key={`${name}-${idx}`}
//               message={`${name}: Фейковое фото`}
//               type="warning"
//               showIcon
//             />
//           )
//         }
//         if (faceStatus === FACE_STATUS.NO_FACE) {
//           return (
//             <Alert
//               key={`${name}-${idx}`}
//               message={`${name}: На фото не обнаружено лица`}
//               type="info"
//               showIcon
//             />
//           )
//         }
//       })}
//     </Space>
//   )
// }
