import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:4000', // Proxy API requests
      '/ws': {
        target: 'ws://localhost:4000', // Proxy WebSocket requests
        ws: true, // Enable WebSocket proxying
      },
    },
  },
});