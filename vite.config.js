import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,  // เปิดให้เข้าถึงจากเครือข่าย
    port: 10005,  // กำหนดพอร์ตใหม่
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})