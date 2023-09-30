import { Layout } from 'antd'
import { LiveImage } from '../../components/LiveImage'

const { Content } = Layout

export const VideoPage = () => {
  return (
    <Layout>
      <Content>
        <LiveImage />
      </Content>
    </Layout>
  )
}
