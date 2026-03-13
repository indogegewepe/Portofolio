// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-12-21',
  devtools: { enabled: true },

  // ssr: false,
  modules: ['@nuxt/fonts', 'vuetify-nuxt-module', '@nuxt/eslint', '@pinia/nuxt', '@nuxtjs/i18n'],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  css: [
    'assets/styles/layers.css',
    'vuetify/styles',
    'assets/styles/tailwind.css',
  ],

  vuetify: {
    moduleOptions: {
      ssrClientHints: {
        reloadOnFirstRequest: false,
        viewportSize: true,
        prefersReducedMotion: true,
      },
    },
    vuetifyOptions: {
      display: {
        mobileBreakpoint: 'md',
        thresholds: {
          xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920, xxl: 2560,
        },
      },
      theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#DA4848',
            secondary: '#5CBBF6',
            accent: '#8c9eff',
            error: '#ff5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#F7F6E5',
            surface: '#76D2DB'
          }
        },
        dark: {
          dark: true,
          colors: {
            primary: '#90CAF9',
            secondary: '#64B5F6',
            accent: '#FF4081',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#121212',
            surface: '#1E1E1E'
          }
        },
      }
    },
    },
  },

  eslint: {
    config: {
      import: {
        package: 'eslint-plugin-import-lite',
      },
    },
  },

  i18n: {
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts',
  },
})