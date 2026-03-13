// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-12-21',
  devtools: { enabled: true },

  // ssr: false,
  modules: [
    '@nuxt/fonts',
    'vuetify-nuxt-module',
    '@nuxt/eslint',
    '@pinia/nuxt'
  ],
  vite: {
    optimizeDeps: {
      include: [
        'gsap',
        'gsap/ScrollTrigger',
        'gsap/ScrambleTextPlugin'
      ]
    }
  },

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
              primary: '#4F46E5',        // Indigo — tegas, profesional
              secondary: '#6366F1',      // Indigo muda — harmonis dengan primary
              accent: '#818CF8',         // Soft indigo untuk highlight
              error: '#E53E3E',          // Merah elegan, tidak terlalu neon
              info: '#3B82F6',           // Biru bersih
              success: '#059669',        // Hijau tua elegan
              warning: '#D97706',        // Amber hangat
              background: '#F5F4F8',     // Off-white keunguan, tidak putih polos
              surface: '#FFFFFF',        // Card/surface putih bersih
              'on-background': '#1E1B2E',// Teks gelap di background
              'on-surface': '#1E1B2E',   // Teks gelap di card
            }
          },
          dark: {
            dark: true,
            colors: {
              primary: '#818CF8',        // Indigo terang — kontras di dark bg
              secondary: '#6366F1',      // Indigo medium
              accent: '#A5B4FC',         // Indigo pastel untuk aksen lembut
              error: '#FC8181',          // Merah lembut di dark mode
              info: '#60A5FA',           // Biru cerah
              success: '#34D399',        // Hijau mint elegan
              warning: '#FBBF24',        // Amber cerah
              background: '#0F0E17',     // Deep dark — hampir hitam, ada hint ungu
              surface: '#1A1826',        // Card sedikit lebih terang dari bg
              'on-background': '#E8E6F0',// Teks terang di background
              'on-surface': '#E8E6F0',   // Teks terang di card
            }
          }
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

  // i18n: {
  //   defaultLocale: 'en',
  //   vueI18n: './i18n.config.ts',
  // },
})