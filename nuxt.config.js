module.exports = {
  server: {
    port: 80, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: '王宇辉的个人博客 | 前端进阶之路',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: '记录学习与生活'
      },
      {
        name: 'keywords',
        content: '王宇辉，前端'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'element-ui/lib/theme-chalk/reset.css',
    '@assets/css/main.css',
    "element-ui/lib/theme-chalk/display.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    {
      src: '@/plugins/vue-mavon-editor',
      srr: false
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
  },

  proxy: {
    '/api/': 'http://www.wtech.me'
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
