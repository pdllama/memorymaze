import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
      '@Components': path.join(__dirname, './src/components'),
      '@Types': path.join(__dirname, './src/types'),
      '@Windows': path.join(__dirname, './src/windows'),
      '@App': path.join(__dirname, './src/app')
    }
  }
})
