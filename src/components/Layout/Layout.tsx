import React from 'react';
import { Layout as AntdLayout } from 'antd';
import { Outlet } from 'react-router-dom';
import { HeaderComponent } from '../Header/HeaderComponent';

const { Header, Content } = AntdLayout;

const layoutStyle: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column'
};

const headerStyle: React.CSSProperties = {
  paddingTop: 20,
  background: '#fff',
  width: '100vw',
  textAlign: 'center',
  color: '#fff',
  height: 120,
  paddingInline: 50,
  position: 'fixed',
  zIndex: 1,
  display: 'flex', // Центрируем по горизонтали
  alignItems: 'center'
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '200px 50px',
  color: '#fff',
  flex: 1,
  marginTop: 120
};

export const Layout: React.FC = () => {
  return (
    <AntdLayout style={layoutStyle}>
      <Header style={headerStyle}>
      <HeaderComponent/>
        </Header>
      <Content style={contentStyle}>
        <Outlet />
      </Content>
    </AntdLayout>
  )
}
