import { Layout } from 'antd'
import DragAndDrop from '../../UploadImage/UploadImage'

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
