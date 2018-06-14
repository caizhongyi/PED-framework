const parseArgs = require("minimist")
const argv = parseArgs(process.argv.slice(2), {
    alias: {
        H: "hostname",
        p: "port"
    },
    string: ["H"],
    unknown: parameter => false
})

const port =
    argv.port ||
    process.env.PORT ||
    process.env.npm_package_config_nuxt_port ||
    "3000"
const host =
    argv.hostname ||
    process.env.HOST ||
    process.env.npm_package_config_nuxt_host ||
    "localhost"
module.exports = {
    env: {
        baseUrl:
        process.env.BASE_URL ||
        `http://${host}:${port}`
    },
    head: {
        title: "tt1",
        meta: [
            {charset: "utf-8"},
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
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: "#3B8070"},
    /*
    ** Build configuration
    */
    css: [
        "~/assets/css/main.css",
        "iview/dist/styles/iview.css"
    ],
    plugins: [
        { src: '~plugins/iview', ssr: true },
    ],
    build: {
        vendor: [
            'axios',
            'iview',
            '~/assets/js/viewport.js'
        ],
        extend(config) {
            for (let o of config.module.rules) {
                if (o.loader == 'vue-loader') {
                    delete o.loader;
                    o.use = [
                        {
                            loader: 'vue-loader',
                            options: o.options
                        }
                        ,
                        {
                            loader: 'iview-loader',
                            options: {
                                prefix: true
                            }
                        }
                    ]
                    delete  o.options;
                    /* o.options.loaders.iview = [{
                         loader: 'iview-loader',
                         options: {
                             prefix: true
                         }
                     }]*/
                    // console.log(o)
                }
            }
            // console.log( config.module.rules )
        },
    },
   /* babel:{
        "plugins": [["component", [
            {
                "libraryName": "iview"
            }
        ]]],
        comments: true
    },*/
    modules: [
        "@nuxtjs/axios",
        "~/modules/typescript.js"
    ],
    axios: {}
}

if (process.BROWSER_BUILD) {
    // 引入第三方插件
   // require('~/assets/js/viewport.js' )
    // 或者修改window对象下某一属性
    //  window.mbk = {}
}