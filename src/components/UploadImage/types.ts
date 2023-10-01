import { RcFile } from 'antd/es/upload'

export type CustomFile = RcFile & {
  isValidated: boolean
}
