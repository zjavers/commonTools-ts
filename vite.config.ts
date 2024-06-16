import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:19090',  // 目标接口的域名
        changeOrigin: true,
        secure: false,  // 如果是https接口，需要配置这个参数
        rewrite: (path) => path.replace(/^\/api/, '')  // 重写路径，把/api去掉
      }
    },
  },
})
