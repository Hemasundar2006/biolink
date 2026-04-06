import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        '/api': {
          target: 'https://biolink-5e35.onrender.com/api',
          changeOrigin: true,
        },
      },
    },
  },
});
