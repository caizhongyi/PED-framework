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


# static 为纯静态目录 ./js/xx
# assets 为webpack编译的资源目录
# plugins 为全局Vue插件目录
# pages 页面目录
# layouts 主框架模版目录 ， 通过 layout(){return  'empty';  } 来设定 。 通过 head() { return {  title : '' } } 来设定 html头部
# directive 指令目录
# components Vue组件目录
# node_modules npm管理的组件目录

# nuxt.config.js nuxt配置文件

script 用于加载static目录文件
plugins 用于加载plugins目录文件

# package.json npm插件管理文件 install xxx --save
# node-v8.11.3-x64.msi