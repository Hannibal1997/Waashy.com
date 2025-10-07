import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow external connections
    port: 3000, // Use port 3000
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
