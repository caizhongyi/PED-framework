const parseArgs = require("minimist");
const webpack = require("webpack");
const { resolve } = require('path');
let Vue = require('vue');


const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: "hostname",
    p: "port"
  },
  string: ["H"],
  unknown: parameter => false
});
let publicPath = '/' ;
let hostname = "localhost" ,  hostPort = 3000 ;
let mode = 'history';
let proxy = {
  target :`${hostname}:${hostPort}`,
  pathRewrite : { "^/api/": "?_url=api/" }
};


switch (process.env.__ENV) {
  //本地
  case  "development" :
    break;
  //测试
  case  "release" :
    proxy = 'http://180.106.148.81:18082/testapms/index.php';
    hostname = "0.0.0.0";
    //process.env.BASE_URL =  'http://180.106.148.81:18082/testapms/';
    publicPath = 'http://180.106.148.81:18082/testapms/';
    mode = 'hash';
    break;
  //正式
  case  "production" :
    proxy = 'http://180.106.148.81:18082/testapms/index.php';
    hostname = "0.0.0.0";
    publicPath = 'http://180.106.148.81:18082/testapms/';
    break;
}

const port =
  argv.port ||
  process.env.PORT || hostPort ||
  process.env.npm_package_config_nuxt_port ||
  "3000"; // 端口
const host =
  argv.hostname || hostname ||
  process.env.HOST ||
  process.env.npm_package_config_nuxt_host ||
  "localhost";  //域名


let baseUrl =  process.env.BASE_URL || `http://${host}:${port}/`;
//baseUrl = baseUrl + '/testapms/';
console.log('env:' + process.env.__ENV)
console.log('baseUrl:' + baseUrl)

module.exports = {
  env: {
    __ENV: process.env.__ENV,
    baseUrl: baseUrl
  },
  head: {
    title: "admin",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Nuxt.js project"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
        //{ rel: 'stylesheet', types: 'text/css', href: '/bootstrap.min.css' }
    ],
    script: [
      //{ src: baseUrl + 'node_modules/jquery/dist/jquery.js' , type: 'text/javascript', charset: 'utf-8' },
      //{ src: baseUrl + 'node_modules/nestable/jquery.nestable.js' , type: 'text/javascript', charset: 'utf-8'},
      //{ innerHTML: require('./flexible.js') + ';console.log(11)' , type: 'text/javascript', charset: 'utf-8'},
      //{ src:'https://res.wx.qq.com/open/js/jweixin-1.2.0.js' },  //微信开发
      // { src: '/js/flexible-pc.js' }, // rem自适应
    ],
    // 不对<script>标签中内容做转义处理
    __dangerouslyDisableSanitizers: ["script"]
  },
  router: {
   // base : '/testapms/',
    mode: mode,  // "hash" | "history" | "abstract" //"hash" (浏览器环境) | "abstract" (Node.js 环境
    extendRoutes (routes, resolve) {
     /* for(let item of routes){
        item.path = '/testapms' + item.path ;
      }*/
      /*routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })*/
    },
    middleware: "auth"
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#4d5080" },
  /*
  ** Build configuration
  */
  css: [
    "font-awesome/css/font-awesome.css",
    "iview/dist/styles/iview.css",
    "~/assets/css/main.scss"
  ],
  plugins: [
    { src: "~/plugins/iview", ssr: true },
    { src: "~/plugins/directives", ssr: false },  //指令
    { src: "~/plugins/v-charts", ssr: false },
    { src: "~/plugins/filters", ssr: false },
    { src: "~/plugins/vue-seamless-scroll", ssr: false },
    { src: "~/plugins/jquery", ssr: false },
    { src: "~/plugins/components", ssr: true },
    { src: "~/plugins/vue-drag-tree", ssr: true },
  ],
 // buildDir: 'testapms',
 // srcDir: __dirname,
  //rootDir: 'testapms/',
  build: {
    publicPath: publicPath,
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        'window.jQuery': 'jquery',
      }),
    ],
    vendor: [
      "axios",
      "iview",
      "v-charts",
      "qs"
    ],
    postcss: [
      //px转换rem自适应
      // require('postcss-px2rem')({remUnit: 12.8 }),   // 12.8  flexible-pc.js pc端1280的设计图// 75    flexible.js  移动端750的设计图
      require("postcss-nested")()
      // require('postcss-responsive-type')(),
      // require('postcss-hexrgba')(),
    ],
    extend(config, ctx) {
      for (let o of config.module.rules) {
        if (o.loader == "vue-loader") {
          delete o.loader;
          o.use = [
            {
              loader: "vue-loader",
              options: o.options
            }
            ,
            {
              loader: "iview-loader",
              options: {
                prefix: true
              }
            }
          ];
          delete  o.options;
          /* o.options.loaders.iview = [{
               loader: 'iview-loader',
               options: {
                   prefix: true
               }
           }]*/
        }
      }
      if (ctx.isClient) {
        /* config.entry['polyfill'] = ['babel-polyfill']
         Object.assign(config.resolve.alias, {
           'utils': path.resolve(__dirname, 'utils')
         })*/
      }
    }
  },
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "~/modules/typescript.js"
  ],
  /* axios: {
      retry: { retries: 3 },
      //开发模式下开启debug
      debug: process.env.__ENV == "production" ? false : true,
      //设置不同环境的请求地址
      baseURL: "http://www.apms.com/index.php?",
      withCredentials: true,
  },
   */
  proxy: {
  //开启代理
    "/api/": proxy
  }
}

//if(process.browser){
// require('xxx');
//}
