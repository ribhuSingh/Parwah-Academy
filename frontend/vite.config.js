import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,

    // Host config for Cloudflare tunnel
    host: true,
    allowedHosts: ['swing-ebook-paul-slideshow.trycloudflare.com', 'localhost', '127.0.0.1'],

    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})