import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname,"src"),
    }
  },
  css:{
    preprocessorOptions:{
      less:{
        charset:false,
        additionalData:`@import "${path.resolve(__dirname,'src/assets/common.less')}";`
      }
    }
  }
})
