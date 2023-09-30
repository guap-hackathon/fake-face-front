import { Route, Routes } from 'react-router-dom'
import ErrorBoundary from 'antd/es/alert/ErrorBoundary'
import { Layout } from '../Layout'
import { MainPage } from '../pages/main/main-page'

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
        </Route>
        <Route path="/profile" element={<div>1231313</div>}></Route>
      </Routes>
    </ErrorBoundary>
  )
}

export default App
