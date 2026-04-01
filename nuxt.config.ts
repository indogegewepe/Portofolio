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
    plugins: [
      {
        name: 'fix-windows-malformed-fs-path',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url
            if (url?.includes('/_nuxt/@fsD:/')) {
              res.statusCode = 302
              res.setHeader('Location', url.replace('/_nuxt/@fsD:/', '/_nuxt/@fs/D:/'))
              res.end()
              return
            }
            next()
          })
        },
      },
    ],
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
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    'assets/styles/layers.css',
    'assets/styles/tailwind.css',
  ],

  vuetify: {
    moduleOptions: {
      disableVuetifyStyles: true,
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
              primary: '#0E7490',        // Teal-blue modern
              secondary: '#14B8A6',      // Mint-teal segar
              accent: '#F97316',         // Orange untuk CTA yang pop
              error: '#DC2626',          // Red kuat tapi tetap bersih
              info: '#0284C7',           // Sky blue
              success: '#16A34A',        // Green natural
              warning: '#D97706',        // Amber warm
              background: '#F2F8FA',     // Cool off-white
              surface: '#FFFFFF',        // Surface clean
              'on-background': '#0B1F2A',// Teks utama
              'on-surface': '#0B1F2A',   // Teks di card
            }
          },
          dark: {
            dark: true,
            colors: {
              primary: '#22D3EE',        // Cyan terang untuk fokus
              secondary: '#2DD4BF',      // Teal glow
              accent: '#FB923C',         // Orange warm kontras
              error: '#F87171',          // Red soft terang
              info: '#38BDF8',           // Sky blue bright
              success: '#4ADE80',        // Green bright
              warning: '#FCD34D',        // Amber bright
              background: '#07131B',     // Navy gelap modern
              surface: '#0D1E28',        // Surface dark clean
              'on-background': '#E6F3F7',// Teks terang
              'on-surface': '#E6F3F7',   // Teks di card
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