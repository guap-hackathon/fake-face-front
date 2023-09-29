import { Layout } from 'antd'
import { UploadImage } from '../../UploadImage/UploadImage'

const { Content } = Layout

export const MainPage = () => {
  return (
    <Layout>
      <Content>
        <UploadImage />
      </Content>
    </Layout>
  )
}
