const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    vendor: [
      "vue",
      "vue-router",
      "babel-polyfill",
      "axios",
      "echarts",
      "iview",
      "jquery",
      "js-cookie",
      "moment",
      "nestable",
      "nuxt-property-decorator",
      "qs",
      "underscore",
      "uuid",
      "v-charts",
      "vue-meta",
      "vue-seamless-scroll",
      "vuex-class"
      // "vue-echarts-v3"
    ]
  },
  output: {
    path: path.join(__dirname, "./static/js"),
    filename: "[name].dll.js",
    library: "[name]_library"       // vendor.dll.js中暴露出的全局变量名
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, ".", "[name]-manifest.json"),
      name: "[name]_library"
    })
  ]
};
