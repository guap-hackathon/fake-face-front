import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { uploadProps } from './upload-config'

export const UploadImage: React.FC = () => {
  return (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  )
}
