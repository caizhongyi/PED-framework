import Cookie from "js-cookie";
import _ from "underscore";
import uuid from "uuid/v1";
import axios from "~/plugins/axios";

export default {
  demoMenu:  {
    name: "demo", icon: "md-albums", title: "示例"  , children: [
      { name: "charts", icon: "md-radio-button-off", title: "图表"  },
      { name: "design", icon: "md-radio-button-off", title: "设计器" },
      { name: "marquee", icon: "md-radio-button-off", title: "文字滚动" },
      { name: "drag", icon: "md-radio-button-off",title: "拖动" },
      { name: "form", icon: "md-radio-button-off", title: "表单生成器" },
      { name: "table", icon: "md-radio-button-off", title: "表格" },
      { name: "ajax", icon: "md-radio-button-off", title: "异步" },
      { name: "tree", icon: "md-radio-button-off", title: "树" },
      { name: "random-code", icon: "md-radio-button-off", title: "验证码"  },
      { name: "nestable", icon: "md-radio-button-off",title: "树形拖动排序" },
    ]
  },
  async setMenu( menu : Array<any>, commit: any ){
    menu = [ ...menu, ...this.demoMenu ];
    menu = this.resetMenuName( menu );
    commit("setMenu", menu );
    return this;
  },
  //获取服务端cookie
  getcookiesInServer(req) {
    let service_cookie = {};
    req && req.headers.cookie && req.headers.cookie.split(";").forEach(function(val) {
      let parts = val.split("=");
      service_cookie[parts[0].trim()] = (parts[1] || "").trim();
    });
    return service_cookie;
  },
  //获取客户端cookie
  getcookiesInClient(key) {
    return Cookie.get(key) ? Cookie.get(key) : "";
  },
  parseQuery(url) {
    var queryObj = {};
    var reg = /[?&]([^=&#]+)=([^&#]*)/g;
    var querys = url.match(reg);
    if (querys) {
      for (var i in querys) {
        var query = querys[i].split("=");
        var key = query[0].substr(1),
          value = query[1];
        queryObj[key] ? queryObj[key] = [].concat(queryObj[key], value) : queryObj[key] = value;
      }
    }
    return queryObj;
  },
  setTreeChecked(data: Array<any> = [], checkedData: Array<any> = []) {

    for (let item of data) {
      _(checkedData).map((n) => {
        if(n.id == item.id){
          item.checked = true;
          return ;
        }
      });
      if (item.children) {
        this.setTreeChecked(item.children, checkedData);
      }
    }
    return data;

  },
  getTreeChecked( data : Array<any> = [] , checkedData: Array<any> = [] , prop : Array<any> = []) {
    for (let item of data) {
      let clone: any = {} ;
      if( prop && prop.length ){
        for(let o of prop ){
          clone[o] = item[o];
        }
      }
      else{
        clone = { ...item };
      }
      checkedData.push(clone);
      if (clone.children) {
        this.getTreeChecked(item.children , checkedData );
        delete clone.children;
      }
    }
    return checkedData;
  },
  resetMenuName( menu , name? ){
    for(let item of menu ){
      if( !item.name ){
        item.name = item.url;
      }

      item['sourceName'] = item.name ;
      name && (item.name = item.name == 'index' ?  `${name}` :  `${ name }/${item.sourceName}`);

      if( item.children ){
        this.resetMenuName( item.children ,item.name);
      }
    }
    return menu;
  }
};


