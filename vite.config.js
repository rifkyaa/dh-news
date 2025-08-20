import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  css: {
    postcss: {
      plugins: [
        require('tailwindcss')({
          theme: {
            extend: {
              fontFamily: {
                roboto: ['Roboto', 'sans-serif'],
                playfair: ['"Playfair Display"', 'serif'],
              },
            },
          },
        }),
      ],
    },
  },
})
