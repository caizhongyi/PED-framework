const vueLoaderConfig = require('./vue-loader.conf')
module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'nuxt-app',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Nuxt.js project'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
    ** Customize the progress bar color
    */
    loading: {color: '#3B8070'},
    /*
    ** Build configuration
    */
    build: {
        /*
        ** Run ESLint on save
        */
        extend(config, {isDev, isClient}) {
            if (isDev && isClient) {

                let rules = [
                    {
                        enforce: 'pre',
                        test: /\.(js|vue)$/,
                        loader: 'eslint-loader',
                        exclude: /(node_modules)/
                    },
                    {
                        enforce: 'pre',
                        test: /\.ts?$/,
                        loader: 'tslint-loader',
                        exclude: /(node_modules)/,
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                        }
                    },
                    {
                        test: /\.tsx?$/,
                        loader: 'ts-loader',
                        exclude: /node_modules/,
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                        }
                    }
                ]

                config.module.rules.push(...rules)
                config.resolve.extensions.push(...['.tsx', '.ts'])
                config.resolve.alias.vue$ = 'vue/dist/vue.esm.js';
                for( let o of config.module.rules ){
                    if( o.loader == 'vue-loader'){
                        o.options = vueLoaderConfig
                    }
                }
                console.log( config)

            }
        },
        vendor : ['axios'],
        babel: {
            plugins: ['transform-decorators-legacy', 'transform-class-properties']
        }
    }
}
