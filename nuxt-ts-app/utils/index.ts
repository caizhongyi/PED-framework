import Cookie from 'js-cookie';
import _ from 'underscore';

export default {
  //获取服务端cookie
  getcookiesInServer(req) {
    let service_cookie = {};
    req && req.headers.cookie && req.headers.cookie.split(';').forEach(function(val) {
      let parts = val.split('=');
      service_cookie[parts[0].trim()] = (parts[1] || '').trim();
    });
    return service_cookie;
  },
  //获取客户端cookie
  getcookiesInClient(key) {
    return Cookie.get(key) ? Cookie.get(key) : ''
  },
  parseQuery(url){
     var queryObj = {};
     var reg = /[?&]([^=&#]+)=([^&#]*)/g;
     var querys = url.match(reg);
     if (querys) {
       for (var i in querys) {
         var query = querys[i].split('=');
         var key = query[0].substr(1),
           value = query[1];
         queryObj[key] ? queryObj[key] = [].concat(queryObj[key], value) : queryObj[key] = value;
       }
     }
     return queryObj;
   },
  setTreeChecked( data:Array<any> = [] , checkedData:Array<any> = []  ){
    for( let item of data){
      _(checkedData).map(( n )=>{
        item.checked = (n.id == item.id) ;

      })
      if( item.children ){
        this.setTreeChecked(  item.children , checkedData );
      }
    }
    return data;

  },
  getTreeChecked( data:Array<any> = [] , checkedData:Array<any> = [] ){
    data = [];
    for( let item of checkedData){
      let clone : any = { ...item };
      data.push(clone);
      if( clone.children ){
        this.getTreeChecked( data , item.children );
        delete clone.children;
      }
    }
    return data;
  },
}


