# 下载下来后先安装根目录下 node-v8.11.3-x64.msi

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
``` 
- assets 为webpack编译的资源目录
- components Vue组件目录
- directives 指令目录，公有的 ~/filters/filter/index 从git上获取
- filters 过虑器，公有的  ~/directives/directive/index  从git上获取
- layouts 主框架模版目录 ， 通过 layout(){return  'empty';  } 来设定 。 通过 head() { return {  title : '' } } 来设定 html头部
- middleware 中间键
- node_modules npm管理的组件目录
- pages 页面目录
- plugins 全局Vue插件目录
- static 纯静态资源目录 ./js/xx
- store 全局变量或函数目录，例如用户信息等
- util 公用函数
mixin.ts 混入函数变量等
``` 
# nuxt.config.js
nuxt配置文件，域名，端口以及静态脚本引用等
``` 
{
   plugins：{ src: '~/plugins/directives', ssr: false }, //插件配置
   css：[], //css加载
   head:{}, //html头配置
}
``` 

# package.json
npm插件管理文件
``` 
install xxx --save
"version" : "1.0.0" , //版本号管理 ，分三个段分别为 大版本，中版本，小版本
"config": {
    "nuxt": {
      "host": "localhost", //ip 外网则改为 0.0.0.0
      "port": "3000" //端口
    }
}
``` 

# vue cli
``` 
vue init nuxt-community/typescript-template nuxt-ts
``` 
# ui框架用 iview
# 图形架框用 v-chart

# 异步请求用 axios
``` 
import axios from 'axios';
let a = await axios.get("./random-data.json");
console.log(a)
``` 
# 第三插件变量声明 index.d.ts
``` 
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter,
    $route: Route,
    $refs: any
  }
}
``` 
#  iview地址 (https://www.iviewui.com)
#  vue地址 (https://cn.vuejs.org/v2/guide)

# process 配置
安装 cross-env
__ENV = development 开发环境
__ENV = release 测试环境
__ENV = production 线上环境

~/plugins/axios.ts 配置 Ajax 访问地址
nuxt.config.js  配置应用程序访问地址

Windows配置
``` 
#node中常用的到的环境变量是NODE_ENV，首先查看是否存在 
set NODE_ENV 
#如果不存在则添加环境变量 
set NODE_ENV= prod  
#环境变量追加值 set 变量名=%变量名%;变量内容 
set path=%path%;C:\web;C:\Tools 
#某些时候需要删除环境变量 
set NODE_ENV=
``` 
Linux配置
``` 
#node中常用的到的环境变量是NODE_ENV，首先查看是否存在
echo $NODE_ENV
#如果不存在则添加环境变量
export NODE_ENV=prod
#环境变量追加值
export path=$path:/home/download:/usr/local/
#某些时候需要删除环境变量
unset NODE_ENV
#某些时候需要显示所有的环境变量
env
``` 

# 第三方插件引入
1.安装 plugin
``` 
npm install plugin 
``` 
2.~/plugins 新建  plugin.ts

``` 
import Vue from 'vue'
import plugin from 'plugin'

Vue.use(plugin)
``` 
3. nuxt.config.js 中的 plugins 字段加一个项
``` 
plugins: [
    { src: "~/plugins/plugin", ssr: false },  // ssr:false 只在客户端运行，调用的时候需要加上 <no-ssr><plugin ref="plugin"></plugin><no-ssr>
]
``` 

4. ~/plugins/jquery.ts
``` 
const $ = require('jquery');
const jqueryPlugin = require('jqueryPlugin');  //可能需更改 jqueryPlugin.js 的文件 ,需要 export 里面的方法或对象
$.fn.jqueryPlugin = jqueryPlugin;
export default $;
``` 

# 常用组件 
1.dync-form.vue   // 动态生成 Form 表单 
``` 
示例
/demo/form
``` 
2.ajax.vue // 异步调用
``` 
示例
<ajax ref="ajax" loading="true"></ajax>

let ajax = this.$refs.ajax;
let res = await ajax.post()
``` 
3.page-table.vue // 分页控件 
``` 
示例
/demo/table.vue
``` 
# underscore
处理数据库，例如删除，过滤，查找等等

# 命名规规范
1.常量全大写.例如：const STATUS = 1
2.变量，对象，数组等为驼峰写法。 例如： let ajaxStatus
3.类名第一个字母大写。 例如： class AjaxClass
4.文件名和目录名建议两个单词间用 "-", 不要用大写字符。 例如： file-name.vue

# 全局注册组件
~/plugins/components.ts 中注册



# swagger的使用
swagger是一款自动获取接口说明生成在线文档的软件。
目前已经部署在EMP测试服务器192.168.21.47上，访问地址：

a，http://192.168.21.47:10004/swagger/swagger-php/portal.php （检测文档是否规范，显示具体出错点）

b，http://192.168.21.47:10004/swagger/swagger-ui/index.html （实际使用的在线文档地址）

【 接口文档使用说明 】

a，编写接口文档。在每个class和请求方法前添加phpdoc说明信息，具体格式去搜索swagger-php相关内容学习下。
    （参考：https://www.jianshu.com/p/6840514c4c8e） 
    
b，更新到测试环境。登录服务器192.168.21.47（参看附件）后，进入cd /home/emp/wwwroot/apms执行git pull更新即可（无需svn跳转机）

c，确认更新情况，访问b链接查看接口文档。如果问题则访问上述a链接，查看具体报错信息。

# 管理平台测试环境的使用
a，前端访问地址：http://180.106.148.81:18082/testapms

b，后端访问地址：http://180.106.148.81:18082/testapms/index.php?_url=api/{controller}/{action}&{params}
（注：后台接口全部放在app/api/controller下）   

【 测试环境更新说明 】(后端接口更新则忽略1、2)

1，前端build生成本地dist文件

2，拷贝dist到后端的根目录front中

3，提交git，并在网络出口001下的iot/spms目录操作：

    （保持svn跳板机登录下执行）git pull
    docker build -t hub.local:9080/iot/apms:test  .
    docker push hub.local:9080/iot/apms:test  
    
4，执行doker生效

    网页登录：http://180.106.148.81:8088/
    重启服务：schoolsaas-manager (镜像后缀为：test)
    
5，查询变更测试代码

    登录【容器1】180.106.148.81
    kubectl exec -it {这里是容器实例名，从云平台那边查询获取} -n user-2  /bin/bash

# 路径
必须用 ~ 符号作为根目录
static目录下的访问路径为 ~/img/a.png