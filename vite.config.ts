import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/react-ts-task-app/',
  plugins: [react()],
  esbuild: {
    drop: ['console', 'debugger']
  }
});
