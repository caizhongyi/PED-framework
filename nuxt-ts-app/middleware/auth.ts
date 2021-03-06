//  middleware/auth.js
/**
 * 鉴权
 * */
import utils from "~/utils/index";

export default async function( args ) {

  let { store, route, req, res, redirect , app } = args ;
  let to = ( name )=>{
    redirect(name)
  }

  let isClient = process['browser'];
  let isServer = process['server'];
  let loginPath =  app.context.env.baseUrl + 'login';
  let redirectURL = loginPath;
  let params = {};
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
  //保存Cookie
  store.commit("setUserToken", token);

  if ( path && path.indexOf('.map') == -1) {
    //redirectURL = "#login"//?ref=" + encodeURIComponent(path);
  }

  //如果是登录页不作认证
  if( path.indexOf(loginPath) != -1 ) return ;

  //需要进行权限判断的页面开头


  if (!token ) {
    //to( loginPath )
  }
  else {
    if (isClient) {
       let res : any = await app.$axios.post('/api/menu/list');
       if( res.code == 403 ){
         // 没有登录的用户跳转到登录页
         //to( loginPath )
       }
       else if( res.code == 200 ){
         //路由切换时加载读取菜单
        /* if( !store.state.menu ){
           let demo:any = await axios.get("./demo.json" );
           utils.setMenu( [ ...res.data.data , ...demo] ,  store.commit  );
         }*/
       }
    }

  }
}

//middleware: 'auth',  //定义页面中间件                         