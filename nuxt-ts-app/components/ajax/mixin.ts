import { Component,  Prop, Vue } from "nuxt-property-decorator";

@Component({})
export default class Mixin extends Vue {
  @Prop({ default: ''}) url:  string ;
  @Prop() params: any;
  @Prop({ default: true }) loading: boolean;
  visible = false;

  all( fns : any  = []  , callback  ){
    this.$axios.all( fns ).then(this.$axios.spread(function (acct, perms) {
      // Both requests are now complete
      callback && callback(acct, perms);
    }));
    return this;
  }

  async ajax(url, data, method = 'post') {
    this.loading && (this.visible = true);
    if(method == 'get'){
      data = {
        params : { ...data }
      }
    }
    const promise = this.$axios[method](url, data);
    promise.catch(() => {
      this.visible = false;
      this.$emit('error');
      this.$Message.error({
        title: '提示',
        content: '请求超时!',
        duration: 5,
        closable: true
      })
    })
    let res: any = await promise;
    this.visible = false;
    let dataInfo: any = res;
    if (dataInfo.code === 200) {
      return dataInfo;
    }
    else {
      this.$Message.error({
        title: '提示',
        content: dataInfo.message || '请求失败!',
        duration: 5,
        closable: true
      })
      return dataInfo;
    }
  }

  async post(url, data) {
    let res: any = await this.ajax(url, data, 'post');
    return res;
  }

  // 异步调用
  async get(url, data) {
    let res: any = await this.ajax(url, data, 'get');
    return res;
  }

  mounted() {
    /* switch (config.env.NODE_ENV) {
       case  'dev' : this.domain = 'http://www.dev.cn/';  break;
       case  'uat' : this.domain = 'http://www.uat.cn/';  break;
       case  'prod' :  this.domain = 'http://www.prod.cn/';break;
     }*/
  }
}