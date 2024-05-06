import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { itwinuiReactAliases } from 'helpers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 1701,
  },
  base: './',
  resolve: {
    alias: itwinuiReactAliases,
  },
});
