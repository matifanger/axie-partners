import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'AxiePartners',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // FIREBASE CONNECTION
    '@nuxtjs/firebase',

    '@nuxtjs/recaptcha',
  ],

  recaptcha: {
    /* reCAPTCHA options */
    // hideBadge: false, // Hide badge element (v3 & v2 via size=invisible)
    // language: String,   // Recaptcha language (v2)
    siteKey: '6LfzCRkcAAAAAARSvas9fsCASFnxvDyh0f8ef7I9',    // Site key for requests
     version: 2,     // Version
    // size: String        // Size: 'compact', 'normal', 'invisible' (v2)
  },

  publicRuntimeConfig: {
    recaptcha: {
      /* reCAPTCHA options */
      siteKey: '6LfzCRkcAAAAAARSvas9fsCASFnxvDyh0f8ef7I9' // for example
    }
  },

      // Firebase module configuration
firebase: {
  config: {
    apiKey: "AIzaSyBQ3PnX5ONp5E1DVMbtFvnBl1z4KGslPNM",
    authDomain: "axie-partners.firebaseapp.com",
    projectId: "axie-partners",
    storageBucket: "axie-partners.appspot.com",
    messagingSenderId: "931501975397",
    appId: "1:931501975397:web:03b782b94d170c91ee638c",
    measurementId: "G-FVP43JH8YC"
  },
  services: {
    firestore: true,
    auth: true,
    database: true,
  }
},

firestore: {
  memoryOnly: false, // default
  chunkName: process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
  enablePersistence: true,
  emulatorPort: 8080,
  emulatorHost: 'localhost',
  settings: {
    // Firestore Settings - currently only works in SPA mode
  }
},

auth: {
  persistence: 'local', // default
  initialize: {
    onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
    onAuthStateChangedAction: 'onAuthStateChangedAction',
    subscribeManually: false
  },
  ssr: false, // default
  emulatorPort: 9099,
  emulatorHost: 'http://localhost',
},


  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      options: {
        customProperties: true,
      },
      dark: false,
      themes: {
        light: {
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3,
        textdark: '#1e2329',
      },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          textdark: '#1e2329',
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
