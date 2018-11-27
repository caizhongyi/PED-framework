import { Component, Vue } from "nuxt-property-decorator";
@Component({
})
export default class Mixin extends Vue {
  showTitle (item) {
    //return this.$config.useI18n ? this.$t(item.name) : ((item.meta && item.meta.title) || item.name)
    return ((item.meta && item.meta.title) || item.name);
  }
  showChildren (item) {
    return item.children && (item.children.length >= 1 || (item.meta && item.meta.showAlways))
  }
  getNameOrHref (item, children0, name ) {
    return `/${item.href ? `isTurnByHref_${item.href}` : (item.name)}`
  }

}
