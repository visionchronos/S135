import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true
      }
    }
  },
  build: {
    // Raise the warning threshold — we acknowledge the large bundle
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Split large vendor libs into separate cacheable chunks
        manualChunks: {
          'vendor-charts': ['recharts'],
          'vendor-icons': ['lucide-react'],
          'vendor-state': ['zustand'],
          'vendor-http': ['axios'],
        }
      }
    }
  }
});
