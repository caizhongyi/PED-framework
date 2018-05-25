const {VueLoaderPlugin} = require('vue-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

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
            }

          /* for( let i = 0 ;  i < config.plugins.length ; i ++  ){
               if( config.plugins[i].constructor && config.plugins[i].constructor.name  == 'VueLoaderPlugin'){
                    config.plugins[i] = new VueLoaderPlugin();
                }
                else{
                  // config.plugins.push( new VueLoaderPlugin());
               }
            }*/
           // config.mode = process.env.NODE_ENV === 'production' ? 'production' :  'development';
            config.resolve.extensions.push(...[ '.tsx', '.ts'])

            var rules = [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                },{
                    test: /\.html?$/,
                    loader: 'html-loader',
                    exclude: /(node_modules)/
                },
                { test: /\.ts?$/, loader: 'tslint-loader', options: { appendTsSuffixTo: [/TS\.vue$/] } }
              //  { test: /\.tsx?$/, loader: 'babel-loader!ts-loader', options: { appendTsxSuffixTo: [/TSX\.vue$/] }}
                /*{
                    test: /\.(tsx)$/,
                    loader: 'tslint-loader',
                    enforce: 'pre',
                    exclude: /node_modules/
                }*/

            ]
            config.module.rules.push(...rules);

         /*   for( let i = 1 ; i < config.module.rules.length ; i ++ ){
                delete config.module.rules[i].oneOf;
               // if(config.module.rules[i].)
            }*/
           // delete config.module.rules[0].options;

         //   config.module.rules[1].use = [ 'raw-loader', 'pug-plain-loader' ] ;
          /*  config.module.rules[3].use = ['css-loader'];
            config.module.rules[4].use = ['less-loader']
            config.module.rules[5].use = ['scss-loader']
            config.module.rules[6].use = ['sass-loader']
            config.module.rules[7].use = ['stylus-loader']*/
            //config.module.rules[7].test = /\.styl(us)?$/;

            //delete config.plugins.CommonsChunkPlugin;

          /*  config.plugins.splitChunks = {
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
            //console.log( config.plugins )
            //console.log(  config )
            console.log(  config.module.rules )

        }
    }
}
