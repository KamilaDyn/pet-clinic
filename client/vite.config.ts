import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      '@shared': path.join(__dirname, '../shared/'),
      '@': path.join(__dirname, 'src/'),
    },
  },
  build: {
    outDir: '../dist',
  },
  server: {
    port: 8080,
  },
});
