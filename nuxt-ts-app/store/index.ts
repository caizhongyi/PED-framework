import axios from "~/plugins/axios"
const  resetName = ( menu , name? )=>{
  for(let item of menu ){
    item['sourceName'] = item.name ;
    name && (item.name = `${ name }/${item.sourceName}`);
    if( item.children ){
      resetName( item.children ,item.name);
    }
  }
  return this;
}

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
    let menu:any = await app.$axios.$get( "./menu.json?v2" );

    let demoMenu:any =  {
      name: "demo", icon: "md-albums", meta: { title: "示例" }, children: [
        { name: "charts", icon: "md-radio-button-off", meta: { title: "图表" } },
        { name: "design", icon: "md-radio-button-off", meta: { title: "设计器" } },
        { name: "marquee", icon: "md-radio-button-off", meta: { title: "文字滚动" } },
        { name: "drag", icon: "md-radio-button-off", meta: { title: "拖动" } },
        { name: "form", icon: "md-radio-button-off", meta: { title: "表单生成器" } },
        { name: "table", icon: "md-radio-button-off", meta: { title: "表格" } },
        { name: "random-code", icon: "md-radio-button-off", meta: { title: "验证码" } },
      ]
    };
    menu = [ ...menu, ...demoMenu ];
    resetName( menu );
    commit("setMenu", menu )
  }
}
