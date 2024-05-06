import { defineConfig } from 'vite';
import { itwinuiReactAliases } from 'helpers';

export default defineConfig({
  server: { open: false },
  resolve: {
    alias: itwinuiReactAliases,
  },
});
