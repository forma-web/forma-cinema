import { resolve } from 'path';

const SRC = resolve(__dirname, 'src');

export default defineNuxtConfig({
  srcDir: SRC,
  ssr: false,
  app: {
    head: {
      title: 'Forma Media',
      link: [{ rel: 'icon', href: '/logo.svg' }],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/_variables.scss" as *;',
        },
      },
    },
  },
  css: ['@/assets/styles/main.scss'],
  typescript: {
    typeCheck: true,
  },
  modules: ['@vueuse/nuxt'],
});

