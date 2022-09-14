import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import alias from "@rollup/plugin-alias";
import styleImport, { VantResolve } from "vite-plugin-style-import";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    alias(),
    vue(),
    styleImport({
      resolves: [VantResolve()]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      input: {
        demo: path.resolve(__dirname, 'demo.html'),
        goodsList: path.resolve(__dirname, 'goodsList.html'),
        search: path.resolve(__dirname, 'search.html')
      },
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      }
    },
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,

  },
  base: '/',
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(__dirname, 'src/assets/styles/variable.scss')}";`
      }
    }
  },
  server: {
    proxy: {}
  }
})
