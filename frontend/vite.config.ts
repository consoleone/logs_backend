import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const base = '/log/';
export default defineConfig({
  base,
  plugins: [react()],
});
