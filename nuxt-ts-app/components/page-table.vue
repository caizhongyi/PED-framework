<template>
    <div>
        <dync-form ref="searchForm" v-if="searchModel.length" :model="searchModel" v-model="searchFormData" :label-width="searchLabelWidth" :inline="true" @success="searchSubmit" :submit-button="{ icon : 'ios-search' , text : '查询' }"></dync-form>
        <!-- data 值必须包含id -->
        <Table ref="table" :columns="columns" :data="value" :loading="loading">
            <!--<div slot="header"></div>-->
            <!--<div slot="footer"> </div>-->
        </Table>
        <br>
        <i-row>
            <i-col span="12">
                <i-button type="primary" icon="md-add" v-if="addButton" @click="add">新增</i-button>
                <Button type="primary"  @click="exportData" v-if="expButton" icon="ios-download-outline">导出数据</Button>
                <slot></slot>
                <Button v-if="columns && columns[0] && columns[0].type == 'selection'" icon="md-trash" @click="removeAll">删除所有</Button>
                &nbsp;
            </i-col>
            <i-col span="12" class="text-right"><Page :total="total" :current="page" :page-size="pageSize" show-elevator show-total @on-change="change"/></i-col>
        </i-row>

        <Modal :title="modalTitle" :loading="true"  v-model="modal" @on-ok="modalSubmit" @on-cancel="modalCancel">
            <dync-form ref="form" :model="formModel" :label-width="formLabelWidth" v-model="formData"  :submit-button="false"></dync-form>
            <div slot="footer" v-if="modalFooter">
                <i-button type="text" @click="modalCancel">取消</i-button>
                <slot name="modal-footer"></slot>
                <i-button type="primary" @click="modalSubmit" :loading="okLoading">确定</i-button>
            </div>
        </Modal>

        <Modal title="浏览" :loading="false"  v-model="viewModalVisible" >
            <i-form  :label-width="formLabelWidth">
                <i-form-item  :label="item.label"  v-for="(item,key) in formViewModel" :key="key" :v-if="item.visible || true ">
                    <span v-if="item.type == 'upload'" >
                        <no-ssr><div class="upload-list" v-for="subItem in formData[item.field]">
                        <template >
                            <img :src="subItem.url" alt="subItem.name"/>
                            <div class="upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="viewImage(subItem)"></Icon>
                            </div>
                        </template>
                     </div></no-ssr>
                    </span>
                    <span v-else >{{ formData[item.field] }}</span>
                </i-form-item>
            </i-form>
        </Modal>

        <Modal title="浏览" v-model="imageModalVisible" >
          <img :src="modalImage" v-if="modalImage"/>
        </Modal>

        <ajax ref="ajax" :loading="false"></ajax>
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
    @Prop( { default : ()=>{ return [] ;} }) formViewModel: any ;
    @Prop( { default : 80 }) formLabelWidth: any ;
    @Prop({ default : ()=>{ return [] ;} } ) searchModel :any ;
    @Prop( { default : 0 }) searchLabelWidth: any ;
    @Prop({ default : ()=>{ return [] ;} }) columns: any ;
    @Prop({ default : false }) expButton: any ;
    @Prop({ default : true }) addButton: any ;
    @Prop({ default : 'post' }) method: string ;
    @Prop() url: string ;
    @Prop( { default: ()=>{ return { page : 1 , total: 0 } } }) params : any ;
    @Prop( { default: ()=>{ return {} }}) modalFooter : any ;
    @Prop( { default : ()=>{ return [] ;} }) value: any ;

    table : any ;
    form : any ;
    modalTitle = '修改';
    spinShow = false;
    total : any = 0 ;
    page = 1 ;
    pageSize = 10 ;
    modal = false;
    formData: object = {};
    searchFormData: object = {};
    loading = false;
    searchForm: any ;

    imageModalVisible: any = false;
    viewModalVisible: any = false;
    modalImage: any = '';
    okLoading = false ;

    @Watch('modal')
    onChangeModal( val ){
      this.okLoading = val == false ? false : this.okLoading ;
    }

    async getData( url , data ){

      if( !url ) return this;

      let ajax:any = this.$refs.ajax;
      this.loading = true;
      let res:any = await ajax.get( url , data );
      this.loading = false;
      let paging: any = res.paging || {} ;
      let d =  paging.data || [] ;
      for( let item of d ){
        if( !item.id ){
          item.id = uuid();
        }
      }

      this.$emit('input', d );
      this.value.push();

      this.page = paging.page ?　paging.page : this.page;
      this.total = paging.total ?　paging.total : this.total;
      return this;
    }

    viewImage( item ){
        this.imageModalVisible = true;
        this.modalImage = item.url;
        return this;
    }

    //修改表单
    edit( index :any  ){
      this.add();
      this.formData = Object.assign({},this.table.data[index] );
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

    getEditControl( h , params ){
      return h('Button', {
        props: {
          type: 'primary',
          icon : 'md-eye',
          size: 'small',
        },
        on: {
          click: ( e ) => {
            this.edit( params.index );
            this.$emit('edit-click' , e  );

            //this.show(params.index)
          }
        }
      }, '修改');
    }
    getViewControl( h , params ){
      return h('Button', {
        props: {
          type: 'primary',
          size: 'small',
          icon : 'md-open',
        },
        on: {
          click: ( e ) => {
             this.$emit('view-click' , e  );
             this.formData = this.table.data[ params.index ];
             this.viewModalVisible = true;
          }
        }
      }, '查看');
    }
    getRemoveControl( h , params ){
      return h('Button', {
        props: {
          type: 'error',
          size: 'small',
          icon: 'md-trash',
        },
        on: {
          click: ( e ) => {
            this.$emit('remove-click' , e  );
            this.remove( params.index );
            // this.remove(params.index)
          }
        }
      }, '删除')
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
    remove( index :any  ){
      let removeItem =  this.table.data[index];

      this.$Modal.confirm({
        title : '提示',
        content : '是否删除？',
        loading: true,
        onOk:()=>{
          let next = ()=>{
            this.$Modal.remove();
            this.table.data.splice(index, 1);
          }
          let restore = ()=>{
            this.$Modal.remove();
          }
          this.$emit('remove', removeItem  , next  , restore );
        }
      })
      return this;
    }

    removeAll(){
      let selection = this.table.getSelection();

      this.$Modal.confirm({
        title : '提示',
        content : '是否删除？',
        loading: true ,
        onOk:()=>{
          let next = ()=>{
            this.$Modal.remove();
            if( selection && selection.length > 0){
              let data = (this.value).filter(( n ,i )=>{
                for(let item of selection ){
                  if( item.id == n.id ) return false;
                }
                return true
              })
              this.$emit('input', data );
              this.value.push();
            }
          }
          let restore = ()=>{
            this.$Modal.remove();
          }
          this.$emit('remove-all' , selection  , next ,restore )
        }
      })
      return this;
    }

    searchSubmit(){
      this.$emit('search-submit', this.searchForm.value );
    }
    //导出表单
    exportData () {
      this.table.exportCsv({ filename: this.expButton.filename || '导出文件'});
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
    modalSubmit(){
      this.okLoading = true ;
      this.modalTitle = this.form.id ? this.modalTitle : '新增';

      let next = ( id )=>{
        if( id == null ){
          this.value.push( this.formData );
          this.$emit('input', this.value );
        }
        else{
          let data = _( this.value ).map(( n )=>{
            if( n.id == id ){
              n = this.formData;
            }
            return n ;
          })
          this.$emit('input', data );
          this.value.push();
        }
        this.modal = false;
      }

      let restore = ()=>{
        this.modal = false;
      }
      this.$emit('edit-submit', this.formData  , next , restore );
      return this;
    }
    //edit-cancel 提交回调
    modalCancel(){
      this.modal = false;
      this.$emit('edit-cancel', this.formData  );
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
