const {VueLoaderPlugin} = require('vue-loader')
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
               // config.mode = process.env.NODE_ENV === 'production' ? 'production' :  'development';
                config.plugins[1] = new VueLoaderPlugin();
                config.resolve.extensions.push(...[ '.tsx', '.ts'])
                console.log( config.module.rules)
                var rules = [
                    {
                        enforce: 'pre',
                        test: /\.(js|vue)$/,
                        loader: 'eslint-loader',
                        exclude: /(node_modules)/
                    },
                     {
                         test: /\.tsx?$/,
                         loader: 'ts-loader',
                         exclude: /(node_modules)/,
                         options: {
                             appendTsSuffixTo: [/\.vue$/],
                         }
                     }
                    /*{
                        test: /\.(tsx)$/,
                        loader: 'tslint-loader',
                        enforce: 'pre',
                        exclude: /node_modules/
                    }*/

                ]
                config.module.rules.push(...rules);
             /*   config.optimization.splitChunks = {
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name: 'vendor',
                            chunks: 'all'
                        },
                        manifest: {
                            name: 'manifest',
                            minChunks: Infinity
                        },
                    }
                }*/

            }
        }
    }
}
