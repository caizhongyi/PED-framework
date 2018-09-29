module.exports = {
  debug: true,
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-vue',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      //{ src: 'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js' },
      { src: './js/flexible-pc.js' }, // rem自适应
    ],
    // 不对<script>标签中内容做转义处理
    __dangerouslyDisableSanitizers: ['script']
  },
  css: [
    "~/assets/css/main.scss",
    "font-awesome/css/font-awesome.css",
    "iview/dist/styles/iview.css"
  ],
  plugins: [
    { src: "~/plugins/iview", ssr: true },
    { src: '~/plugins/directives', ssr: false },  //指令
    { src: '~/plugins/v-charts', ssr: false },
    { src: '~/plugins/filters', ssr: false },
    { src: '~/plugins/vue-seamless-scroll', ssr: false },
  ],
  icon: {
    // iconSrc: '/static/icon.png',
    sizes: [16, 120, 144, 152, 192, 384, 512]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    lang: process.env.lang || 'en'
  },
  /*
  ** Build configuration
  */
  build: {
    extend (config, { isDev }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        config.module.rules.push({
          test: /\.less$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'less-loader'
          ]
        })
        config.module.rules.push({
          test: /\.scss/,
          use: [
            'vue-style-loader',
            'css-loader',
            'scss-loader'
          ]
        })
        config.module.rules.push({
          loader: 'iview-loader',
          options: {
            prefix: true
          }
        })
      }
      /* if (isClient) {
        config.entry['polyfill'] = ['babel-polyfill']
      } */
      // 添加 alias 配置
      /*Object.assign(config.resolve.alias, {
        'utils': path.resolve(__dirname, 'utils')
      })
      const vueLoader = config.module.rules.find((rule) => rule.loader === 'vue-loader')
      vueLoader.options.transformAssetUrls['img'] = ['data-src', 'src']*/
      // inject `compilerModules` to vue-loader options
      /*  config.module.rules.forEach(rule => {
         if (rule.loader === 'vue-loader') {
           rule.options.compilerModules = [i18nExtensions.module(i18n)]
         }
       }) */
    },

    /*    optimization: {
          splitChunks: {
            chunks: 'all',//split both async chunks and initial chunks(entrypoints)
            cacheGroups: {
              default: false,//disable default 'commons' chunk behavior
              vendors: false, //disable vendor splitting(not sure if you want it)
              styles: {
                name: 'styles',
                test: /\.s?css$/,
                minChunks: 1
              }
            }
          },*/

    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000, // 10KO
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000, // 10 KO
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ],
    postcss: {
      plugins: {

        // Customize `postcss-cssnext` default options
        'postcss-cssnext': {
          features: {
            customProperties: false
          }
        },
        'postcss-simple-vars': {},
        // Add some plugins
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      }
    },
    /*postcss: [ */
      /* require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')(),
      require('autoprefixer')({
        browsers: ['iOS >= 7','Android >= 4.1']
      }),
      require('postcss-import')(),
      require('postcss-url')(),*/
      /* require('postcss-aspect-ratio-mini')(),
      require('postcss-write-svg')({
        utf8: false
      }),
      require('postcss-cssnext')(),
      require('postcss-viewport-units')(),
      require('cssnano')({
        preset: "advanced",
        autoprefixer: false,
        "postcss-zindex": false
      })*/
      /* require('postcss-px-to-viewport')({
        viewportWidth: 750, // (Number) The width of the viewport.
        viewportHeight: 1334, // (Number) The height of the viewport.
        unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
        viewportUnit: 'vw', // (String) Expected units.
        selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
        minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
        mediaQuery: false // (Boolean) Allow px to be converted in media queries.
      }), */
      //px转换rem自适应
      /*require('postcss-px2rem')({
        remUnit: 75
      })*/
    /*],*/

  },
  router: {
    middleware: 'auth'
  },
  modules: [
    "@nuxtjs/axios",
    'nuxt-ts',
  ],
}

