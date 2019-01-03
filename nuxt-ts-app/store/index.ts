import axios from "~/plugins/axios"
import cookie from "js-cookie"
import utils from "~/utils"

export const state = () => ({
  people: [],
  menu: [],
  userToken: '',
})

export const mutations = {
  setPeople( state:any, people:any) {
    state.people = people;
    return this;
  },
  setMenu( state:any, menu:any) {
    state.menu = menu;
    return this;
  },
  setUserToken( state:any, token:any) {
    state.userToken = token;
    if(token) cookie.set('usertoken' , token );
    else cookie.remove('usertoken' );
    return this;
  },
}

export const getters = {
}

export const actions = {
  async nuxtServerInit( { commit , state  },{ app , route ,req , res , redirect} ) {

      let menu:any = await app.$axios.$post("/api/menu/list" );
      if( menu.code == 403 ){
        // 没有登录的用户跳转到登录页
        redirect('/login');
      }
      else if( menu.code == 200 ){
        let demo:any = await app.$axios.$get("/demo.json" );
        let m = [ ...menu.data , ...demo];
        utils.setMenu( m , commit );
      }
     // let menu:any = await app.$axios.$get("./menu.json" );
     // utils.setMenu( menu , commit );
  }
}
