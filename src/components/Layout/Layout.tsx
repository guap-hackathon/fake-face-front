import React from 'react';
import { Layout as AntdLayout } from 'antd';
import { Outlet } from 'react-router-dom';
import { HeaderComponent } from '../Header/HeaderComponent';

const { Header, Content } = AntdLayout;

const layoutStyle: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  color: '#fff',
};

const headerStyle: React.CSSProperties = {
  paddingTop: 20,
  background: '#fff',
  width: '100vw',
  textAlign: 'center',
  color: '#fff',
  height: 200,
  paddingInline: 50,
  position: 'fixed',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center'
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  width: '100vw',
  height: '100vh',
  padding: '0 50px',
  position: 'fixed',
  background: '#fff',
  flex: 1,
  margin: 'auto',
  marginTop: 50,
  display: 'flex',
  alignItems: 'center'
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
