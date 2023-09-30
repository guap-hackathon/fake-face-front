import { LoadingOutlined } from '@ant-design/icons'
import { Spin, SpinProps } from 'antd'

const circleIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

export const Loader = (props: SpinProps) => <Spin indicator={circleIcon} {...props} />
