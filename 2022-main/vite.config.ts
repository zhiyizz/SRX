import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // publicDir:'src',
  server:{
    open: true,
    port: 5000,
    host: '0.0.0.0'
  }
})
