import { defineConfig } from 'vite';

const base = process.env.VITE_BASE || '/';

export default defineConfig({
  base: base.endsWith('/') ? base : `${base}/`,
});
