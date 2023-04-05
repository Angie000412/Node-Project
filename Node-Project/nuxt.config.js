import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // titleTemplate: '%s - proyecto-biogas',
    titleTemplate: 'BiogasProject',
    title: 'BiogasProject',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name:"viewport", content:"initial-scale=1.0, width=device-width"},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { src: "https://js.api.here.com/v3/3.1/mapsjs-core.js", type: "text/javascript", charset: "utf-8" },
      // { src: "https://js.api.here.com/v3/3.1/mapsjs-service.js", type: "text/javascript", charset: "utf-8" },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    /* require('tailwindcss-dark-mode')() */
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/tailwindcss',
  ],
 

  // Modules: https://go.nuxtjs.dev/config-modules
  /*   modules: ['@nuxtjs/strapi'],
  strapi: {
    entities: ['restaurants', 'categories'],
    url: 'http://localhost:1337'
  }, */
  modules: [
    '@nuxtjs/axios',
    'nuxt-leaflet',
    ['nuxt-leaflet', { /* module options */ }],
    
  ],
  axios: {
    baseURL: process.env.API_ENDPOINT || "http://localhost:1337/api"
  },
  


  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: colors.blue.darken4,
          accent: colors.amber.lighten5,
          secondary: colors.amber.lighten3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3

        }
       /*  dark: {
          primary: colors.blue.darken4,
          accent: colors.blue.darken3,
          secondary: colors.blue.darken3,
          info: colors.teal.darken1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        } */
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }




}
