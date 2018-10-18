/*const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

// 判断时候load过这个plugin
let hasForkTsCheckerPlugin = false

module.exports = function () {
  // Add .ts extension for store, middleware and more
  this.nuxt.options.extensions.push("ts")
  // Extend build
  this.extendBuild(config => {
    const tsLoader = {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        appendTsSuffixTo: [/\.vue$/]
      }
    }
    // Add TypeScript loader
    config.module.rules.push(
      Object.assign({
          test: /((client|server)\.js)|(\.tsx?)$/
        },
        tsLoader
      )
    )
    // Add .ts extension in webpack resolve
    if (config.resolve.extensions.indexOf(".ts") === -1) {
      config.resolve.extensions.push(".ts");
    }

    if (!hasForkTsCheckerPlugin) {
      // 第一次load
      hasForkTsCheckerPlugin = true
      config.plugins.push(new ForkTsCheckerWebpackPlugin({
        vue: true,
        tslint: true,
        formatter: 'codeframe',
        // https://github.com/TypeStrong/ts-loader#happypackmode-boolean-defaultfalse
        checkSyntacticErrors: process.env.NODE_ENV === 'production'
      }))
    }
  })
}*/

module.exports = function() {
  // Add .ts extension for store, middleware and more
  this.nuxt.options.extensions.push("ts")
  // Extend build
  this.extendBuild(config => {
    const tsLoader = {
      loader: "ts-loader",
      options: {
        appendTsSuffixTo: [/\.vue$/]
      }
    }
    // Add TypeScript loader
    config.module.rules.push(
      Object.assign(
        {
          test: /((client|server)\.js)|(\.tsx?)$/
        },
        tsLoader
      )
    )
    // Add TypeScript loader for vue files
    for (let rule of config.module.rules) {
      if (rule.loader === "vue-loader") {
        rule.options.loaders.ts = tsLoader
      }
    }
    // Add .ts extension in webpack resolve
    if (
      config.resolve.extensions.indexOf(".ts") ===
      -1
    ) {
      config.resolve.extensions.push(".ts")
    }
  })
}
