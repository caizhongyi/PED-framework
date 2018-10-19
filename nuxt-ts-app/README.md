# nuxt-ts-app

> Nuxt.js TypeScript project

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

# 目录结构

- assets 为webpack编译的资源目录
- components Vue组件目录
- directive 指令目录，公有的从git上获取
- filter 过虑器，公有的从git上获取
- layouts 主框架模版目录 ， 通过 layout(){return  'empty';  } 来设定 。 通过 head() { return {  title : '' } } 来设定 html头部
- middleware 中间键
- node_modules npm管理的组件目录
- pages 页面目录
- plugins 为全局Vue插件目录
- static 为纯静态目录 ./js/xx
- store 全局变量或函数目录，例如用户信息等
- util 公用函数目
mixin.ts 混入函数变量等

# nuxt.config.js
nuxt配置文件
域名，端口以及静态脚本引用等

script 用于加载static目录文件
plugins 用于加载plugins目录文件

# package.json
npm插件管理文件
install xxx --save

# vue cli
vue init nuxt-community/typescript-template nuxt-ts

#ui框架用 iview
#图形架框用 v-chart

#异步请求用 axios
import axios from 'axios';
let a = await axios.get("./random-data.json");
console.log(a)




