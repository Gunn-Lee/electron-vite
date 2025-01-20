import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: 'dist-vite'
  },
  server: {
    port: 5050,
    strictPort: true,
  }
})
