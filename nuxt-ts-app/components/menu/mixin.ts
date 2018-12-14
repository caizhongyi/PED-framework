import { Component, Vue } from "nuxt-property-decorator";
@Component({
})
export default class Mixin extends Vue {
  showTitle (item) {
    //return this.$config.useI18n ? this.$t(item.name) : ((item.meta && item.meta.title) || item.name)
    return (item.title || item.name);
  }
  showChildren (item) {
    return item.children && (item.children.length >= 1 || item.showAlways)
  }

  /*
  * href: 外链接  http:www.xxx.com
  * url:路由完整链接 /settings/user
  * name: 名称链接  user , { name: settings , children： { name : user } }
  * */
  getNameOrHref (item, children0, name ) {

    return `/${item.href ? `isTurnByHref_${item.href}` : (item.url || item.name)}`
  }

}
