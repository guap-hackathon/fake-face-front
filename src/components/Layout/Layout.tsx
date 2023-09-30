import React from 'react'
import { Layout as AntdLayout } from 'antd'
import { Outlet } from 'react-router-dom'
import { HeaderComponent } from '../Header/HeaderComponent'

import './Layout.css'

const { Header, Content } = AntdLayout

export const Layout: React.FC = () => {
  return (
    <AntdLayout className="layout">
      <Header className="header">
        <HeaderComponent />
      </Header>
      <Content className="content">
        <Outlet />
      </Content>
    </AntdLayout>
  )
}
