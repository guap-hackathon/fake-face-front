import React from 'react'
import { Upload, Button, UploadProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { RcFile } from 'antd/es/upload'

import './UploadImage.css'
import { featureModel } from '../models'
import { ResponseWithFaceStatus } from '../../../common/types'
import { FileTable } from './FileTable'

export const DragAndDrop: React.FC = () => {
  const handleChange: UploadProps<ResponseWithFaceStatus>['onChange'] = ({ fileList }) => {
    console.log('HANDLE CHANGE INFO', fileList)
    console.log('URL', fileList[0].thumbUrl)
    featureModel.actualizedFilesData(fileList)
  }

  const handleBeforeUpload = (file: RcFile) =>
    new Promise<void>((res, rej) => {
      console.log('BEFORE', file)
      const startUpload = () => res()
      const cancelUpload = () => rej()
      featureModel.fileInserted({
        file,
        startUpload,
        cancelUpload
      })
    })

  return (
    <div style={{ padding: '20px', background: '#fff', margin: 'auto', textAlign: 'center' }}>
      <Upload.Dragger
        name="image"
        action="/api/validate-face"
        beforeUpload={handleBeforeUpload}
        onChange={handleChange}
        multiple
        showUploadList={false}
        style={{
          height: '400px',
          minHeight: '400px',
          border: '2px dashed #ccc',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
        <p>Загрузите изображение</p>
        <p>или</p>
        <p>Перетащите его сюда</p>
        <Button icon={<UploadOutlined />}>Выберите файл</Button>
      </Upload.Dragger>
      <FileTable />
    </div>
  )
}
