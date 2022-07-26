import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 饿了么
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import path from 'path'

const resolve = (dir: string) => path.join(__dirname, dir)
// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/sytle/variables.scss";`,
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "vuex"], // 自动导入vue和vue-router相关函数
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
      'comps': resolve('src/components'),
      'apis': resolve('src/apis'),
      'views': resolve('src/views'),
      'utils': resolve('src/utils'),
      'routes': resolve('src/routes'),
      'styles': resolve('src/styles')
    }
  },
})
