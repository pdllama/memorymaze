import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
      '@components': path.join(__dirname, './src/components'),
      '@types': path.join(__dirname, './src/types'),
      '@windows': path.join(__dirname, './src/windows')
    }
  }
})
