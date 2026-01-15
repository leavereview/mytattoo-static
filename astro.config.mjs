import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://mytattoo.software',
  integrations: [
    tailwind()
  ],
  build: {
    inlineStylesheets: 'auto'
  }
});
