import React from 'react'
import { Table, Tag, Image } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useStore } from 'effector-react'
import { featureModel } from '../models'
import { FaceStatus } from '../../../common/types'
import { FACE_STATUS } from '../../../common/const'
import { CustomFile } from '../types'

const TAG_BY_STATUS = (status: FaceStatus): { text: string; color: string } => {
  if (status === FACE_STATUS.REAL) {
    return {
      text: 'Реальное изображение',
      color: 'green'
    }
  }
  if (status === FACE_STATUS.FAKE) {
    return {
      text: 'Фейк',
      color: 'volcano'
    }
  }
  if (status === FACE_STATUS.NO_FACE) {
    return {
      text: 'Лица не обнаружено',
      color: 'geekblue'
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
    render: (url: string) => <Image src={url} width={200} />
  },
  {
    title: 'Статус',
    key: 'faceStatus',
    dataIndex: 'faceStatus',
    render: (faceStatus: FaceStatus) => {
      const tag = TAG_BY_STATUS(faceStatus)
      return <Tag color={tag.color}>{tag.text.toUpperCase()}</Tag>
    }
  }
]

export const FileTable: React.FC = () => {
  const fileData = useStore(featureModel.$filesData)

  return <Table columns={columns} dataSource={fileData || []} />
}
