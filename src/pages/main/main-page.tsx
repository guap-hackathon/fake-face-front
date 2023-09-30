import { Layout } from 'antd'
import DragAndDrop from '../../components/UploadImage/ui/UploadImage'

const { Content } = Layout

export const MainPage = () => {
  return (
    <Layout>
      <Content>
        <DragAndDrop />
      </Content>
    </Layout>
  )
}
