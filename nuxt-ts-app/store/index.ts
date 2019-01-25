import cookie from "js-cookie";
import utils from "~/utils/index";

export const state = () => ({
  people: [],
  menu: [],
  userToken: ""
});

export const mutations = {
  setPeople(state: any, people: any) {
    state.people = people;
    return this;
  },
  setMenu(state: any, menu: any) {
    state.menu = menu;
    return this;
  },
  setUserToken(state: any, token: any) {
    state.userToken = token;
    if (token) cookie.set("usertoken", token);
    else cookie.remove("usertoken");
    return this;
  }
};

export const getters = {};

export const actions = {
  async nuxtServerInit( storeParams , appParams ) {
    let { commit } = storeParams ;
    let { app, redirect } = appParams ;

    let menu: any = await app.$axios.post("/api/menu/list");
    if (menu.data.code == 403) {
      // 没有登录的用户跳转到登录页
      redirect( "/login");
    }
    else if (menu.data.code == 200) {
      app.$axios.defaults.baseURL = '/';
      //console.log(app.$axios.defaults)
      /*let demo: any = await app.$axios.get("/demo.json");
      console.log(demo)*/
      let m = [...menu.data.data];

      utils.setMenu(m, commit);
    }
    // let menu:any = await app.$axios.$get("./menu.json" );
    // utils.setMenu( menu , commit );
  }
};
