import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Sitio de una sola página: el plan Básico en la raíz (/).
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
