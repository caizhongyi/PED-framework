# 下载下来后先安装根目录下node-v8.11.3-x64.msi

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

注：安装node-sass失败尝试：npm config set user 0  和 npm config set unsafe-perm true；
再执行npm install sass-loader --save-dev --registry=https://registry.npm.taobao.org

# 服务器上保持后台运行 （本地可以忽略）
配置~/.bash_profile添加nohup目录（一般在/usr/bin）到PATH的最后 PATH= XXXX:/usr/bin
项目中新增一个日志文件并授权（touch my.log 、chmod u+w my.log、nohup npm run dev > my.log 2>my.log &）
查看运行情况并确认vue访问信息（tail  -f my.log）
服务器执行exit主动退出登录用户，再次验证外网访问情况

# 目录结构

- assets 为webpack编译的资源目录
- components Vue组件目录
- directive 指令目录，公有的从git上获取
- filter 过虑器，公有的从git上获取
- layouts 主框架模版目录 ， 通过 layout(){return  'empty';  } 来设定 。 通过 head() { return {  title : '' } } 来设定 html头部
- middleware 中间键
- node_modules npm管理的组件目录
- pages 页面目录
- plugins 全局Vue插件目录
- static 纯静态资源目录 ./js/xx
- store 全局变量或函数目录，例如用户信息等
- util 公用函数
mixin.ts 混入函数变量等

# nuxt.config.js
nuxt配置文件，域名，端口以及静态脚本引用等
{
   plugins：{ src: '~/plugins/directives', ssr: false }, //插件配置
   css：[], //css加载
   head:{}, //html头配置
}


# package.json
npm插件管理文件
install xxx --save
"config": {
    "nuxt": {
      "host": "localhost", //ip 外网则改为 0.0.0.0
      "port": "3000" //端口
    }
}


# vue cli
vue init nuxt-community/typescript-template nuxt-ts

#ui框架用 iview
#图形架框用 v-chart

#异步请求用 axios
import axios from 'axios';
let a = await axios.get("./random-data.json");
console.log(a)

#index.d.ts
// 第三插件变量声明
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter,
    $route: Route,
    $refs: any
  }
}

iview地址 https://www.iviewui.com/
vue地址 https://cn.vuejs.org/v2/guide/




