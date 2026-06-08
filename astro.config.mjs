import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://comme-chien-et-chat.com',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  compressHTML: true,
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' }
  }
});
