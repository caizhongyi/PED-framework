const parseArgs = require("minimist");
const webpack = require("webpack");
const path = require("path");

const HappyPack = require("happypack");
let os = require("os");
let happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
//const mainfest = require("./static/dll/vendor-mainfest.json");
//const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
//const bundleConfig = require("./bundle-config.json");


const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: "hostname",
    p: "port"
  },
  string: ["H"],
  unknown: parameter => false
});
let publicPath = "/";
let mode = "history";
let base = "";
let proxy = {
  target: "http://apms.com/",
  pathRewrite: {
    "^/api/": "/api/"
  }
};

switch (process.env.__ENV) {
  //本地
  case  "development" :
    proxy.target = "http://apms.com/";//本地配置
    //proxy.target = 'http://192.168.24.92/apms/public/';
    //proxy.target = "http://180.106.148.81:18082/testapms/";// 线上 ajax 访问地址
    //proxy.target = "http://www.saasmanager.com:28081/";// 线上 ajax 访问地址
    //process.env.BASE_URL =  'http://180.106.148.81:18082/testapms/';
    break;
  //测试
  case  "release" :
    // proxy.target = "http://180.106.148.81:28083/";// 线上 ajax 访问地址
    proxy.target = "http://180.106.148.81:28083/";// 线上 ajax 访问地址
    //publicPath = "http://180.106.148.81:18082/testapms/";// 线上 ajax 访问地址
    //publicPath = "http://www.saasmanager.com:28083/";// 线上 ajax 访问地址
    break;
  //正式
  case  "production" :
    proxy.target = "http://180.106.148.81:28083/";// 线上 ajax 访问地址
    break;
}

const port =
  argv.port ||
  process.env.PORT ||
  process.env.npm_package_config_nuxt_port ||
  "3000"; // 端口
const host =
  argv.hostname ||
  process.env.HOST ||
  process.env.npm_package_config_nuxt_host ||
  "localhost";  //域名


let baseUrl = process.env.BASE_URL || `http://${host}:${port}/`;
//baseUrl = baseUrl + '/testapms/';
console.log("env:" + process.env.__ENV);
console.log("baseUrl:" + baseUrl);

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
      }
      //{ rel: 'stylesheet', types: 'text/css', href: '/bootstrap.min.css' }
    ],
    script: [
      //{ src: baseUrl + 'node_modules/jquery/dist/jquery.js' , type: 'text/javascript', charset: 'utf-8' },
      {
        src: "https://api.map.baidu.com/api?v=2.0&ak=9Mmf1Qqx0h9HPWbzPjxHDPw8GfKW6kxG",
        type: "text/javascript",
        charset: "utf-8"
      }
      //{ src: "/js/vendor.dll.js" }
      //{ innerHTML: require('./flexible.js') + ';console.log(11)' , type: 'text/javascript', charset: 'utf-8'},
      //{ src:'https://res.wx.qq.com/open/js/jweixin-1.2.0.js' },  //微信开发
      // { src: '/js/flexible-pc.js' }, // rem自适应
    ],
    // 不对<script>标签中内容做转义处理
    __dangerouslyDisableSanitizers: ["script"]
  },
  router: {
    // base : base,
    scrollBehavior: function(to, from, savedPosition) {
      return { x: 0, y: 0 };
    },
    mode: mode,  // "hash" | "history" | "abstract" //"hash" (浏览器环境) | "abstract" (Node.js 环境
    extendRoutes(routes, resolve) {
      /*  for(let item of routes){
          item.path = '/testapms' + item.path ;
          item.name = 'testapms-' + item.name ;
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
    { src: "~assets/css/main.scss", lang: "scss" }
  ],
  plugins: [
    { src: "~/plugins/iview", ssr: true },
    // { src: "~/plugins/components", ssr: true },
    { src: "~/plugins/directives", ssr: false },  //指令
    { src: "~/plugins/v-charts", ssr: false },
    { src: "~/plugins/filters", ssr: false },
    { src: "~/plugins/jquery", ssr: false },
    { src: "~/plugins/$axios", ssr: false },
    { src: "~/plugins/vue-seamless-scroll", ssr: false }
  ],
  // buildDir: 'testapms',
  // srcDir: __dirname,
  //rootDir: 'testapms/',
  build: {
    /*optimization : {
      runtimeChunk : true ,
      minimize : true,
    } ,*/
    // 单独提取 css
    publicPath: publicPath,
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      }),
      (process.env.__ENV == "development" ? new HardSourceWebpackPlugin() : () => {
      }),
      /* new webpack.DllReferencePlugin({
         context: path.resolve(__dirname, ".."),
         manifest: require("./vendor-manifest.json")
       }),*/
      new HappyPack({
        id: "js",
        threadPool: happyThreadPool,
        loaders: ["babel-loader", "ts-loader"]
      }),
      new HappyPack({
        id: "vue",
        threadPool: happyThreadPool,
        loaders: [
          {
            loader: "vue-loader"
          },
          {
            loader: "iview-loader",
            options: { prefix: true }
          }
        ]
      }),
      new HappyPack({
        id: "css",
        threads: 4,
        loaders: [
          //'style-loader',
          "sass-loader",
          "css-loader",
          "postcss-loader"
        ]
      })
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
              //loader: "HappyPack/loader?id=vue",
              loader: "vue-loader",
              options: o.options
            },
            {
              //loader: "HappyPack/loader?id=vue",
              loader: "iview-loader",
              options: {
                prefix: true
              }
            }
          ];
          delete  o.options;
          //o.loader = "HappyPack/loader?id=vue";
        }
        else if (o.loader == "sass-loader") {
          o.loader = "HappyPack/loader?id=css";
        }
        else if (o.loader == "babel-loader") {
          o.loader = "HappyPack/loader?id=js";
        }
        else if (o.loader == "ts-loader") {
          o.loader = "HappyPack/loader?id=js";
        }
        /* if (o.loader == "sass-loader") {
           o.use = [
             "css-loader",
             {
               loader: "fast-sass-loader",
               options: {
                 transformers: [
                   {
                     extensions: [".json"],
                     transform: function(rawFile) {
                       return jsonToSass(rawFile);
                     }
                   }
                 ]
               }
             }
           ];
         }*/
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
  axios: {
    retry: { retries: 3 },
    //开发模式下开启debug
    debug: process.env.__ENV == "production" ? false : false,
    //设置不同环境的请求地址
    baseURL: proxy.target,
    withCredentials: true
  },
  proxy: {
    //开启代理
    "/api/": proxy
  }
};

