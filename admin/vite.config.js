import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  base: './', // Ensures assets work properly in deployed site
  build: {
    outDir: 'dist',
  },
})
