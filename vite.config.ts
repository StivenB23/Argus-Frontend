import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { __dirname } from './src/utils/dirname.js'
console.log(path.resolve(__dirname, './src/assets'));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
    }
  }
})
