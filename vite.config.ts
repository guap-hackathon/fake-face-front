import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/app': {
        target: 'http://127.0.0.1:8060/app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/app/, '')
      }
    }
  }
})
