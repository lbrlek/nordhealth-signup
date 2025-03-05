import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  ssr: false,
  css: ['@provetcloud/css', '~/assets/css/global.scss'],

  build: {
    transpile: ['@provetcloud/web-components']
  },

  vite: {
    vue: {
      //reactivityTransform: true,
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag.startsWith('provet-')
        }
      }
    }
  },

  modules: ['@nuxtjs/i18n', '@pinia/nuxt'],
  compatibilityDate: '2025-03-03',
});