<template>
    <div>
        <dync-form ref="searchForm" v-if="searchModel.length" :model="searchModel" v-model="searchFormData" :label-width="searchLabelWidth" :inline="true" @success="searchSubmit" :submit-button="{ icon : 'ios-search' , text : '查询' }"></dync-form>
        <!-- data 值必须包含id -->
        <Table ref="table" :columns="columns" :data="data" :loading="loading">
            <!--<div slot="header"></div>-->
            <!--<div slot="footer"> </div>-->
        </Table>
        <br>
        <i-row>
            <i-col span="12">
                <i-button type="primary" icon="md-add" @click="add">新增</i-button>
                <Button type="primary"  @click="exportData" v-if="exp" icon="ios-download-outline">导出数据</Button>
                <slot></slot>
                <Button v-if="columns && columns[0] && columns[0].type == 'selection'" icon="md-beaker" @click="deleteAll">删除所有</Button>
            </i-col>
            <i-col span="12" class="text-right"><Page :total="total" :current="page" :page-size="pageSize" show-elevator show-total @on-change="change"/></i-col>
        </i-row>

        <Modal title="修改" :loading="true"  v-model="modal" @on-ok="ok" @on-cancel="cancel">
            <dync-form ref="form" :model="formModel" :label-width="formLabelWidth" v-model="formData" @success="formSubmit" @fail="formSubmitFail" :submit-button="false"></dync-form>
        </Modal>

        <Modal title="浏览" v-model="imageModalVisible" >
          <img :src="modalImage" v-if="modalImage"/>
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

    @Prop( { default : ()=>{ return [] ;} }) formModel: any ;
    @Prop( { default : 80 }) formLabelWidth: any ;
    @Prop({ default : ()=>{ return [] ;} } ) searchModel :any ;
    @Prop( { default : 80 }) searchLabelWidth: any ;
    @Prop({ default : ()=>{ return [] ;} }) columns: any ;
    @Prop({ default : false }) exp: any ;
    @Prop({ default : 'post' }) method: string ;
    @Prop() url: string ;
    @Prop( { default: ()=>{ return { page : 1 , total: 0 } } }) params : any ;

    table : any ;
    form : any ;

    spinShow = false;
    data: any = [];
    total : any = 0 ;
    page = 1 ;
    pageSize = 10 ;
    modal = false;
    formData: object = {};
    searchFormData: object = {};
    loading = false;
    searchForm: any ;

    imageModalVisible: any = false;
    modalImage: any = '';

    async getData( url , data ){

      if( !url ) return this;

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

    //修改表单
    edit( index :any  ){
      this.add();
      this.formData = this.table.data[index];
      return this;
    }

    createControl ( h , image: any ){
      return  h('img', {
        attrs : {
          src : image,
          style : 'height:50px; margin:5px;'
        },
        on: {
          click: () => {
            this.showImageModal( image );
          }
        }
      })
    }

    getImageControl ( h , params : any ){
      let image: string | Array<any> =  params.row.image ;
      let controls : Array<any> = [];

      if( typeof image == 'object' && image.length ){
        for( let item of image ){
          controls.push( this.createControl( h , item ) );
        }
      }
      else{
        controls.push( this.createControl( h , image ) );
      }
      return controls ;
    }

    showImageModal( image ){
        this.imageModalVisible = true;
        this.modalImage = image;
        return this;
    }
    //新增表单
    add(){
      this.modal = true ;
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

    searchSubmit(){
      this.$emit('search-submit', this.searchForm.value );
    }
    //导出表单
    exportData () {
      this.table.exportCsv({ filename: this.exp.filename || '导出文件'});
      return this;
    }

    change( page ){
      //this.$emit("input", params);
      //this.params = params;
      this.page = page;
      let params = { total : this.total, page ,...this.searchFormData };
      this.getData( this.url ,params);
      this.$emit('page', params );
      return this;
    }

    //edit-sumbit 提交回调
    ok(){
      this.$emit('edit-submit', this.form.value );
      return this;
    }
    //edit-cancel 提交回调
    cancel(){
      this.$emit('edit-cancel', this.form.value );
      return this;
    }

    mounted() {
      this.page = this.params.page;
      this.url && this.getData( this.url ,this.params );
      this.table = this.$refs.table;
      this.form = this.$refs.form;
      this.searchForm = this.$refs.searchForm;
    }
  }
</script>
<style scoped lang="scss">


</style>
