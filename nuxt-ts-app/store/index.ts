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
  async nuxtServerInit({ commit , state }, { app , req , res }) {

    if( !state.menu || state.menu.length == 0 ){
      let menu:any = await app.$axios.$post("/api/menu/list" );
      utils.setMenu( menu.data , commit );
      //let menu:any = await app.$axios.$get("./menu.json" );
      //utils.setMenu( menu , commit );
    }

  }
}
