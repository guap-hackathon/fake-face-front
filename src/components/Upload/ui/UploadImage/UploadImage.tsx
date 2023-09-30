import { Button, Upload, UploadProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'
import { uploadModel } from '../../models'
import { UPLOAD_STATUS } from '../../const'
import { useStore } from 'effector-react'
import { Loader } from '../../../Loader'

export const UploadImage: React.FC = () => {
  const uploadIsDisabled = useStore(uploadModel.$uploadIsDisabled)
  const isUploading = useStore(uploadModel.$isUploading)

  console.log('UPLOAD IMAGE')
  console.log('is Uploading', isUploading)
  console.log('uploadIsDisabled', uploadIsDisabled)

  const handleBeforeUpload = (file: RcFile) =>
    new Promise<void>((res, rej) => {
      const startUpload = () => res()
      const cancelUpload = () => rej(Upload.LIST_IGNORE)
      uploadModel.fileInserted({ file, startUpload, cancelUpload })
    })

  const handleChangeUpload = ({ file }: UploadChangeParam<UploadFile>) => {
    if (file.status === UPLOAD_STATUS.SUCCESS || file.status === UPLOAD_STATUS.FAILED) {
      const { status, name: fileName, response } = file
      uploadModel.uploadFinished({
        status,
        fileName,
        response
      })
    }
  }

  const uploadProps: UploadProps = {
    name: 'file',
    action: '/app/check-face',
    // showUploadList: false,
    // maxCount: 1,
    // multiple: false,
    // listType: 'text',
    beforeUpload: handleBeforeUpload,
    onChange: handleChangeUpload,
    disabled: uploadIsDisabled
  }

  return (
    <Upload {...uploadProps}>
      {isUploading ? (
        <Loader style={{}} size="large" spinning={true} />
      ) : (
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      )}
    </Upload>
  )
}
