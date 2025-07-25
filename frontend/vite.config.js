import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: {
    outDir: 'dist',
  },
  base: './', // 👈 required for relative assets in deployed environment
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
