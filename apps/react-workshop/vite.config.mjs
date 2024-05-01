import { defineConfig } from 'vite';
import { itwinuiReactAliases } from 'helpers';

console.log(itwinuiReactAliases);

export default defineConfig({
  server: { open: false },
  resolve: {
    alias: itwinuiReactAliases,
  },
});
