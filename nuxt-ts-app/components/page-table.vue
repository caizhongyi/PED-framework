<template>
    <div>
        <!-- data 值必须包含id -->
        <Table ref="table" :columns="columns" :data="data" :loading="loading">
            <!--<div slot="header"></div>-->
            <!--<div slot="footer"> </div>-->
        </Table>
        <div v-if="columns[0].type == 'selection'">
            <br>
            <Button @click="deleteAll">删除</Button>
        </div>
        <div>
            <br>
            <Page :total="total" :current="page" :page-size="pageSize" show-elevator show-total @on-change="change"/>
        </div>
        <Modal title="修改"   v-model="modalVisible" @on-ok="ok" @on-cancel="cancel">
            <dync-form ref="form" v-model="formModel" :label-width="80" @success="formSubmit" @fail="formSubmitFail" :submit-button="false"></dync-form>
        </Modal>
        <ajax ref="ajax" loading="false"></ajax>
    </div>
</template>
<script lang="ts">
  import { Component, Model, Prop, Vue, Watch } from "nuxt-property-decorator";
  import DyncForm from "~/components/dync-form";
  import _ from "underscore";
  import uuid from "uuid/v1";
  import Ajax from "./ajax";

  @Component({
    components : { Ajax ,DyncForm }
  })
  export default class PageTable extends Vue {

    table : any ;
    form : any ;

    spinShow = false;
    data: any = [];
    total : any = 0 ;
    page = 1 ;
    pageSize = 10 ;
    modalVisible = false;
    formData = {};
    loading = false;

    @Prop() formModel:any ;
    @Prop() columns: any ;
    @Prop({ default : 'post' }) method: string ;
    @Prop() url: string ;
    @Prop( { default: ()=>{ return { page : 1 , total: 0 } } }) params : any ;

    async getData( url , data ){
      let ajax:any = this.$refs.ajax;
      this.loading = true;
      let res:any = await ajax.get( url , data );
      this.loading = false;
      let paging:any = res.paging || {} ;
      this.data = paging.data || [] ;
      for( let item of this.data ){
        if( !item.id ){
          item.id = uuid();
        }
      }
      this.page = paging.page ?　paging.page : this.page;
      this.total = paging.total ?　paging.total : this.total;
      return this;
    }

    @Watch('formData')
    onChangeFormData( value ){
      this.form.data = value;
    }

    //修改表单
    edit( index :any  ){
      this.add();
      this.formData = this.table.data[index];
      return this;
    }

    //新增表单
    add(){
      this.modalVisible = true ;
      this.formData = {};
      return this;
    }

    //删除表单
    delete( index :any  ){
      this.table.data.splice(index, 1);
      return this;
    }

    deleteAll(){
      let selection = this.table.getSelection();
      if( selection && selection.length > 0){
        this.data = _(this.data).filter(( n ,i )=>{
          for(let item of selection ){
           　if( item.id == n.id ) return false;
          }
          return true
        })
        this.data.push();
      }
    }

    formSubmit( data ){
      this.formData = data;
      return this;
    }

    formSubmitFail( data ){
      return this;
    }

    //导出表单
    exportData () {
      this.table.exportCsv({
        filename: 'The original data'
      });
      return this;
    }

    change( params ){
      //this.$emit("input", params);
      //this.params = params;
      this.page = params.current;
      this.getData( this.url ,params );
      return this;
    }

    //edit-sumbit 提交回调
    ok(){
      this.$emit('edit-submit', this.form.data );
      return this;
    }
    //edit-cancel 提交回调
    cancel(){
      this.$emit('edit-cancel', this.form.data );
      return this;
    }

    mounted() {
      this.page = this.params.page;
      this.url && this.getData( this.url ,this.params );
      this.table = this.$refs.table;
      this.form = this.$refs.form;
    }
  }
</script>
<style scoped lang="scss">


</style>
