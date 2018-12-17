//  middleware/auth.js
import utils from "~/utils";
import axios from "~/plugins/axios";

export default async function({ store, route, req, res, redirect , app }) {
  let isClient = process['browser'];
  let isServer = process['server'];
  let redirectURL = "/login";
  var token, path;
  //在服务端
  if (isServer) {
    let cookies:any = utils.getcookiesInServer(req);
    path = req ? req['originalUrl'] : '';
    token = cookies['usertoken'] ? cookies['usertoken'] : ''
  }
  //在客户端判读是否需要登陆
  if (isClient) {
    token = utils.getcookiesInClient('usertoken');
    path = route.path;
  }
  store.commit("setUserToken", token);

  if ( path && path.indexOf('.map') == -1) {
    redirectURL = "/login?ref=" + encodeURIComponent(path);
  }

  //如果是登录页不作认证
  if( path.indexOf('/login') != -1 ) return ;

  //需要进行权限判断的页面开头
  if (!token ) {
    redirect(redirectURL);
  }
  else {
    if (isClient) {
       let res : any = await axios.post('/api/menu/list');
       if( res.data.code == 403 ){
         if(path != '/login'){
           redirect(redirectURL)
         }
       }
       else if( res.data.code == 200 ){
        if( !store.state.menu ){
          let demo:any = await app.$axios.$get("./demo.json" );
          utils.setMenu( [ ...res.data.data , ...demo] ,  store.commit  );
        }
       }
    }

  }
}

//middleware: 'auth',  //定义页面中间件                         