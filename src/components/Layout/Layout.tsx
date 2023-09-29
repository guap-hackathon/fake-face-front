import { Layout as AntdLayout } from 'antd'
import { Outlet } from 'react-router-dom'

const { Content } = AntdLayout

export const Layout: React.FC = () => {
  return (
    <AntdLayout>
      <Content>
        <Outlet />
      </Content>
    </AntdLayout>
  )
}
