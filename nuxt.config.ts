// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja'
      },
      title: 'edinfo',
      meta: [
        { name: 'description', content: '緊急車両の出動情報をWebサイトの形で掲載する' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  css: [
    "bulma"
  ],
  runtimeConfig: {
    EDBOT_BASE_URL: 'https://edbot.osumiakari.jp', // emergency-dispatchが設置されているアドレスを指定する
    public: {
      EDBOT_BASE_URL: 'https://edbot.osumiakari.jp' // emergency-dispatchが設置されているアドレスを指定する
    }
  }
})
