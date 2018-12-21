<template>
    <div>
        <dync-form ref="searchForm" v-if="searchModel.length" :model="searchModel" v-model="searchFormData"
                   :label-width="searchLabelWidth" :inline="true" @success="searchSubmit"
                   :submit-button="{ icon : 'ios-search' , text : '查询' }"></dync-form>
        <!-- data 值必须包含id -->
        <Table ref="table" :columns="columns" :data="value" :loading="loading">
            <!--<div slot="header"></div>-->
            <!--<div slot="footer"> </div>-->
        </Table>
        <br>
        <i-row>
            <i-col span="12">
                <i-button type="primary" icon="md-add" v-if="addButton" @click="add">新增</i-button>
                <Button type="primary" @click="exportData" v-if="expButton" icon="ios-download-outline">导出数据</Button>
                <Button v-if="columns && columns[0] && columns[0].type == 'selection'" icon="md-trash"
                        @click="removeAll">删除所有
                </Button>
                <slot></slot>
                &nbsp;
            </i-col>
            <i-col span="12" class="text-right">
                <Page :total="total" :current="page" :page-size="pageSize" show-elevator show-total
                      @on-change="change"/>
            </i-col>
        </i-row>

        <Modal :title="modal.title" :loading="true" v-model="modal.visible" @on-ok="modalSubmit"
               @on-cancel="modalCancel">
            <dync-form ref="form" :model="formModel" :label-width="formLabelWidth" :inline="false" v-model="formData"
                       :submit-button="false"></dync-form>
            <div slot="footer" v-if="modalFooter">
                <i-button type="text" @click="modalCancel">取消</i-button>
                <slot name="modal-footer"></slot>
                <i-button type="primary" @click="modalSubmit" :loading="modal.loading">确定</i-button>
            </div>
        </Modal>

        <Modal title="浏览" :loading="false" v-model="viewModalVisible">
            <i-form :label-width="formLabelWidth">
                <table class="table table-bordered">
                    <tr v-for="(item,key) in formViewModel" :key="key" :v-if="item.visible || true ">
                        <th>{{item.label}}</th>
                        <td>
                             <span v-if="item.type == 'upload'">
                        <no-ssr><div class="upload-list" v-for="subItem in formData[item.field]">
                                <template>
                                    <img :src="subItem.url" alt="subItem.name"/>
                                    <div class="upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="viewImage(subItem.url)"></Icon>
                                    </div>
                                </template>
                             </div></no-ssr>
                            </span>
                            <span v-else>{{ formData[item.field] }}</span>
                        </td>
                    </tr>
                </table>
            </i-form>
        </Modal>

        <Modal title="浏览" v-model="imageModalVisible">
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
    components: { Ajax, DyncForm }
  })
  export default class PageTable extends Vue {

    @Prop({
      default: () => {
        return [];
      }
    }) formModel: any;   // 表单模型
    @Prop({
      default: () => {
        return [];
      }
    }) formViewModel: any; // 表单查看模型
    @Prop({ default: null }) formLabelWidth: any; // 文字宽度
    @Prop({
      default: () => {
        return [];
      }
    }) searchModel: any; // 查询表单模型
    @Prop({ default: 0 }) searchLabelWidth: any;  // 查询表单文字宽度
    @Prop({
      default: () => {
        return [];
      }
    }) columns: any; // 单文列头
    @Prop({ default: false }) expButton: any; // 导出按钮
    @Prop({ default: true }) addButton: any; // 增加按钮
    @Prop({ default: "post" }) method: string; // Ajax 提交方式
    @Prop() url: string; // Ajax 提交地址
    @Prop({
      default: () => {
        return { page: 1, total: 0 };
      }
    }) params: any; // Ajax 提交参数
    @Prop({
      default: () => {
        return {};
      }
    }) modalFooter: any; //弹出窗口底部
    @Prop({
      default: () => {
        return [];
      }
    }) value: any; // 列表数据（v-model值）
    @Prop({
      default: () => {
        return {};
      }
    }) defaultFormData: any; // 提交表单默认值

    // refs
    table: any;
    // refs
    form: any;
    // refs
    searchForm: any;

    //分页总页
    total: number = 0;
    //当前页
    page: number = 1;
    //页面大小
    pageSize: number = 10;

    //弹出窗口配置
    modal: any = {
      visible: false,
      loading: false,
      title : "修改"   //弹出窗口标题
    };

    //表单数据
    formData: any = {};
    //查询表单数据
    searchFormData: any = {};
    //列表loading
    loading: boolean = false;

    //图片弹出显示
    imageModalVisible: boolean = false;
    //数据查看弹出显示
    viewModalVisible: boolean = false;
    //弹出窗口的图片
    modalImage: string = "";

    @Watch("modal")
    onChangeModal(val) {
      this.modal.loading = val == false ? false : this.modal.loading;
    }

    /**
     * 获取数据
     * */
    async getData(url, data) {

      if (!url) return this;

      let ajax: any = this.$refs.ajax;
      this.loading = true;
      let res: any = await ajax.get(url, data);
      this.loading = false;
      let paging: any = res.paging || {};
      let d = paging.data || [];
      for (let item of d) {
        if (!item.id) {
          item.id = uuid();
        }
      }

      this.$emit("input", d);
      this.value.push();

      this.page = paging.page ? paging.page : this.page;
      this.total = paging.total ? paging.total : this.total;
      return this;
    }

    /**
     * 预览图片
     * @image: 图片地址
     * */
    showImageModal( image: string ) {
      this.imageModalVisible = true;
      this.modalImage = image;
      return this;
    }
    /**
     * 显示修改表单
     * */
    edit( index: number ) {
      this.add();
      this.formData = Object.assign({}, this.table.data[index]);
      return this;
    }

    /**
     * 创建表单控件
     * */
    createControl(h, image: any) {
      return h("img", {
        attrs: {
          src: image,
          style: "height:50px; margin:5px;"
        },
        on: {
          click: () => {
            this.showImageModal(image);
          }
        }
      });
    }

    /**
     * 创建表单编辑按钮
     * */
    getEditControl(h, params) {
      return h("Button", {
        props: {
          type: "primary",
          icon: "md-eye",
          size: "small"
        },
        on: {
          click: (e) => {
            this.edit(params.index);
            this.$emit("edit-click", e);

            //this.show(params.index)
          }
        }
      }, "修改");
    }

    /**
     * 创建表单浏览按钮
     * */
    getViewControl(h, params) {
      return h("Button", {
        props: {
          type: "primary",
          size: "small",
          icon: "md-open"
        },
        on: {
          click: (e) => {
            this.$emit("view-click", e);
            this.formData = this.table.data[params.index];
            this.viewModalVisible = true;
          }
        }
      }, "查看");
    }

    /**
     * 创建表单删除按钮
     * */
    getRemoveControl(h, params) {
      return h("Button", {
        props: {
          type: "error",
          size: "small",
          icon: "md-trash"
        },
        on: {
          click: (e) => {
            this.$emit("remove-click", e);
            this.remove(params.index);
            // this.remove(params.index)
          }
        }
      }, "删除");
    }

    /**
     * 创建浏览图片
     * */
    getImageControl(h, params: any) {
      let image: string | Array<any> = params.row.image;
      let controls: Array<any> = [];

      if (typeof image == "object" && image.length) {
        for (let item of image) {
          controls.push(this.createControl(h, item));
        }
      }
      else {
        controls.push(this.createControl(h, image));
      }
      return controls;
    }


    //新增表单
    add() {
      this.modal.visible = true;
      this.formData = this.defaultFormData;
      return this;
    }

    //删除表单
    remove( index: number ) {
      let removeItem = this.table.data[index];

      this.$Modal.confirm({
        title: "提示",
        content: "是否删除？",
        loading: true,
        onOk: () => {
          let next = () => {
            this.$Modal.remove();
            //this.table.data.splice(index, 1);
            this.change( this.page );
          };
          let restore = () => {
            this.$Modal.remove();
            this.modal.loading = false;
          };
          this.$emit("remove", removeItem, next, restore);
        }
      });
      return this;
    }

    //删除表单
    removeAll() {
      let selection = this.table.getSelection();

      this.$Modal.confirm({
        title: "提示",
        content: "是否删除？",
        loading: true,
        onOk: () => {
          let next = () => {
            this.$Modal.remove();
            /*if (selection && selection.length > 0) {
              let data = (this.value).filter((n, i) => {
                for (let item of selection) {
                  if (item.id == n.id) return false;
                }
                return true;
              });
              this.$emit("input", data);
              this.value.push();
            }*/
            this.change( this.page );
          };
          let restore = () => {
            this.$Modal.remove();
            this.modal.loading = false;
          };
          this.$emit("remove-all", selection, next, restore);
        }
      });
      return this;
    }

    /**
     * 查询提交
     * */
    searchSubmit() {
      this.$emit("search-submit", this.searchForm.value);
    }

    //导出表单
    exportData() {
      this.table.exportCsv({ filename: this.expButton.filename || "导出文件" });
      return this;
    }

    /**
     * 分页切换
     * */
    change( page:number ) {
      //this.$emit("input", params);
      //this.params = params;
      this.page = page;
      let params = { ...this.$route.query, total: this.total, page, ...this.searchFormData };
      this.getData(this.url, params);
      this.$emit("page", params);
      return this;
    }

    /**
     * 重新加载
     * */
    reload() {
      return this.change(0);
    }

    //edit-sumbit 提交回调
    modalSubmit() {
      this.modal.loading = true;
      this.modal.title = this.form.id ? this.modal.title : "添加";

      // 数据库更新完下一
      let next = (id) => {
        if (id == null) {
          //this.value.push( this.formData );
          this.reload();
          this.$emit("input", this.value);
        }
        else {
          let data = _(this.value).map((n) => {
            if (n.id == id) {
              n = this.formData;
            }
            return n;
          });
          this.$emit("input", data);
          this.value.push();
        }
        this.modal.visible = false;
        this.modal.loading = false;
      };

      let restore = () => {
        this.modal.visible = false;
        this.modal.loading = false;
      };
      this.$emit("edit-submit", this.formData, next, restore);
      return this;
    }

    //edit-cancel 提交回调
    modalCancel() {
      this.modal.visible = false;
      this.$emit("edit-cancel", this.formData);
      return this;
    }

    mounted() {
      this.page = this.params.page;
      let params = { ...this.$route.query, ...this.params };
      this.url && this.getData(this.url, params);
      this.table = this.$refs.table;
      this.form = this.$refs.form;
      this.searchForm = this.$refs.searchForm;
    }
  }
</script>
<style scoped lang="scss">


</style>
