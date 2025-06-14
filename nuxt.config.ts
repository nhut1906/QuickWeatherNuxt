import { fileURLToPath, URL } from 'url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  server: {
    host: '0.0.0.0',
    port: 8081
  },
  plugins: ['~/plugins/api.ts'],
  ssr: true,
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public: {
      VITE_SERVER_URL: process.env.VITE_SERVER_URL || 'https://thoitiet365.org',
      VITE_APP_URL: process.env.VITE_APP_URL || 'https://thoitiet365.org',
      apiBase: process.env.VITE_API_URL || 'https://thoitiet365.org/api/v1',
    },
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  vite: {
    build: {
      minify: false,
    },
    resolve: {
      alias: {
        '@app': fileURLToPath(new URL('./modules/app', import.meta.url)),
        '@auth': fileURLToPath(new URL('./modules/auth', import.meta.url)),
        '@master': fileURLToPath(new URL('./modules/master', import.meta.url)),
        '@': fileURLToPath(new URL('./', import.meta.url)), // nếu bạn vẫn dùng @ như Vue CLI
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Cho phép SCSS hiểu alias như @
          additionalData: `@use "@/assets/styles/_available.scss" as *;`, // nếu bạn cần inject biến toàn cục
        }
      }
    }
  }
})
