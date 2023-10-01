import React from 'react'
import { Table, Tag, Image } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useStore } from 'effector-react'
import { featureModel } from '../models'
import { FaceStatus } from '../../../common/types'
import { FACE_STATUS } from '../../../common/const'
import { CustomFile } from '../types'

const TAG_BY_STATUS = (
  faceStatus: FaceStatus,
  inProgress: boolean
): { text: string; color: string } => {
  if (faceStatus === FACE_STATUS.REAL) {
    return {
      text: 'Реальное лицо',
      color: 'green'
    }
  }
  if (faceStatus === FACE_STATUS.FAKE) {
    return {
      text: 'Фейк',
      color: 'volcano'
    }
  }
  if (faceStatus === FACE_STATUS.NO_FACE) {
    return {
      text: 'Лица не обнаружено',
      color: 'geekblue'
    }
  }
  if (inProgress) {
    return {
      text: 'Ожидаем ответ',
      color: 'magenta'
    }
  }
  return {
    text: 'Ошибка сервера',
    color: 'volcano'
  }
}

const columns: ColumnsType<CustomFile> = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Изображение',
    dataIndex: 'url',
    key: 'url',
    render: (url: string) => <Image src={url} width={50} />
  },
  {
    title: 'Статус',
    key: 'faceStatus',
    dataIndex: 'faceStatus',
    render: (faceStatus: FaceStatus, file) => {
      const tag = TAG_BY_STATUS(faceStatus, file.inProgress)
      return <Tag color={tag.color}>{tag.text.toUpperCase()}</Tag>
    }
  }
]

export const FileTable: React.FC = () => {
  const fileData = useStore(featureModel.$filesData)

  return <Table columns={columns} pagination={false} dataSource={fileData || []} />
}
