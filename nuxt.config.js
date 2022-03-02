export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  generate: {
    fallback: true
  },
  // router: {
  //   base: '/frontend/'
  // },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Nosana Platform',
    title: 'Nosana Testnet',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Nosana Incentivized Testnet'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'The Testnet program is designed to put Nosana\'s CI features and tools to the test'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://testnet.nosana.io/img/screenshot.png'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  env: {
    backendUrl: process.env.BACKEND_URL || 'https://app.nosana.ci'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
    '@/assets/scss/global.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/sol.js', mode: 'client' },
    { src: '@/plugins/axios.js', mode: 'client' },
    '@/plugins/modal.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      '@solana/wallet-adapter-base',
      '@solana/wallet-adapter-sollet',
      '@solana/wallet-adapter-bitkeep',
      '@solana/wallet-adapter-bitpie',
      '@solana/wallet-adapter-blocto',
      '@solana/wallet-adapter-clover',
      '@solana/wallet-adapter-coinhub',
      '@solana/wallet-adapter-ledger',
      '@solana/wallet-adapter-mathwallet',
      '@solana/wallet-adapter-phantom',
      '@solana/wallet-adapter-safepal',
      '@solana/wallet-adapter-solflare',
      '@solana/wallet-adapter-solong',
      '@solana/wallet-adapter-tokenpocket',
      '@solana/wallet-adapter-torus',
      '@solana/wallet-adapter-coin98',
      '@solana/wallet-adapter-slope'
    ],
    loaders: {
      scss: {
        additionalData: "@import '~assets/scss/variables.scss';"
      }
    }
  }
}
