import { Layout } from 'antd'
import TakePicture from '../../components/TakePicture/TakePicture'

const { Content } = Layout

export const PhotoPage = () => {
  return (
    <Layout>
      <Content>
        <TakePicture />
      </Content>
    </Layout>
  )
}
