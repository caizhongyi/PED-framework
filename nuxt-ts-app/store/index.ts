import axios from "~/plugins/axios"


export const state = () => ({
  people: [],
  menu: [],
})

export const mutations = {
  setPeople( state:any, people:any) {
    state.people = people
    return this;
  },
  setMenu( state:any, menu:any) {
    state.menu = menu
    return this;
  },
  getMenu( state:any ) {
    return   state.menu ;
  },
}

export const getters = {
}

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    let menu:any = await app.$axios.$get( "./menu.json" );
    for(let item of menu ){
      if( item.children ){
        for(let subItem of item.children ){
          subItem.name = `${item.name}/${subItem.name}`;
        }
      }
    }
    commit("setMenu", menu )
  }
}
