import React, { useState } from 'react'
import { Upload, Button, UploadProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'
import './DragAndDrop.css'

const DragAndDrop: React.FC = () => {
  const [image, setImage] = useState<string | null>(null)
  const [responseText, setResponseText] = useState<string>('')

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      if (reader.result && typeof reader.result === 'string') {
        setImage(reader.result)
        sendImageToBackend(reader.result)
      }
    }

    reader.readAsDataURL(file)
  }

  const handleChange: UploadProps['onChange'] = (info) => {
    console.log('INFO', info)
  }

  const sendImageToBackend = async (imageData: string) => {
    try {
      const response = await axios.post('/api/validate-face', imageData)

      setResponseText(response.data.text)
    } catch (error: any) {
      if (error.response) {
        setResponseText(error.response.data.text || 'Ошибка на сервере')
      } else if (error.request) {
        setResponseText('Ответ от сервера не получен')
      } else {
        setResponseText('Ошибка настройки запроса')
      }
      console.error('Ошибка при отправке изображения на бэкенд:', error)
    }
  }

  const handleBackClick = () => {
    setImage(null)
    setResponseText('')
  }

  return (
    <div style={{ padding: '20px', background: '#fff', margin: 'auto', textAlign: 'center' }}>
      {image ? (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img src={image} alt="Uploaded" style={{ maxWidth: '400px', maxHeight: '400px' }} />
          <p style={{ marginTop: '20px' }}>{responseText}</p>
          <Button style={{ marginTop: '20px' }} onClick={handleBackClick}>
            Назад
          </Button>
        </div>
      ) : (
        <Upload.Dragger
          beforeUpload={(file) => {
            handleImageUpload(file)
            return true
          }}
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
      )}
    </div>
  )
}

export default DragAndDrop
