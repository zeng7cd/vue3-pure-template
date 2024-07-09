import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    plugins: [vue()],
    base: env.VITE_APP_BASE_URL,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      rollupOptions: {
        plugins: [visualizer()],
        output: {
          manualChunks: {
            echarts: ['echarts']
          }
        }
      }
    }
  })
}
