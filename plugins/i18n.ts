import { defineNuxtPlugin } from 'nuxt/app'
import { createI18n } from 'vue-i18n'
import en from '~/locales/en.json'
import fi from '~/locales/fi.json'
import de from '~/locales/de.json'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en', 
    fallbackLocale: 'en',
    messages: { en, fi, de }
  })

  nuxtApp.vueApp.use(i18n)
})
