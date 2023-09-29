import { Route, Routes } from 'react-router-dom'
import ErrorBoundary from 'antd/es/alert/ErrorBoundary'
import { Layout } from '../Layout'
import { MainPage } from '../pages/main/main-page'
import { VideoPage } from '../pages/video/video-page'
import { PhotoPage } from '../pages/photo/photo-page'

function App() {
  return (
    <ErrorBoundary>
      <Routes>
      
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="live" element={<VideoPage />} />
        <Route path="photo" element={<PhotoPage />} />
      </Route>
      </Routes>
    </ErrorBoundary>
  )
}

export default App
