import { Component, Vue } from "nuxt-property-decorator";
@Component({
})
export default class  extends Vue {
  showTitle (item) {
    //return this.$config.useI18n ? this.$t(item.name) : ((item.meta && item.meta.title) || item.name)
    return ((item.meta && item.meta.title) || item.name);
  }
  showChildren (item) {
    return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways))
  }
  getNameOrHref (item, children0, name ) {
    if( typeof name == 'undefined'){
      return `/${item.href ? `isTurnByHref_${item.href}` : (children0 ? item.children[0].name : item.name)}`
    }
    else{
      return `${name}/${item.href ? `isTurnByHref_${item.href}` : (children0 ? item.children[0].name : item.name)}`
    }
  }
}
