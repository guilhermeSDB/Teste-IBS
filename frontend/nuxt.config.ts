// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  vite: {
    optimizeDeps: {
      exclude: ['class-validator']
    }
  },
  runtimeConfig: {
    // Public keys that are exposed to the client
    public: {
      apiBase: 'http://localhost:7000'
    }
  }
})
