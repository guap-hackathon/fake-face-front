import { Layout } from 'antd'
import { UploadImage } from '../../components/Upload/ui/UploadImage'

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
