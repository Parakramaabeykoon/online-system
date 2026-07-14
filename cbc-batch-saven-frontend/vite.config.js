import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react-router', 'react-router-dom'], // 👈 Rolldown බන්ඩ්ලර් එකේ පැටලීම නවත්වන්නේ මේ පේළියෙන්
  },
})