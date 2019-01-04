<template>
    <div>
        <menu id="nestable-menu" v-if="optionButton">
            <i-button type="default" icon="md-add" data-action="expand-all" @click="expandAll">展开</i-button>
            <i-button type="default" icon="md-remove" data-action="collapse-all" @click="collapseAll">缩起</i-button>
            <i-button type="primary" icon="md-add" @click="add">新增</i-button>
            <i-button type="primary" icon="ios-open-outline" @click="saveOrder" :loading="saveOrderLoading">保存排序
            </i-button>
            <slot></slot>
        </menu>
            <div class="dd dd-small-handle">
                <nestable-item v-model="value" :root="this"></nestable-item>
            </div>
        <Modal
                v-model="modal"
                title="提示"
                :loading="true"
                @on-ok="ok"
                @on-cancel="cancel">
            <auto-form ref="form" v-model="formData" :model="formModel" @success="submit"
                       :submit-button="false"></auto-form>
        </Modal>
    </div>
</template>

<script lang="ts">
  import { Component, Model, Prop, Vue, Watch } from "nuxt-property-decorator";
  import NestableItem from "./nestable-item";
  import $ from "jquery";
  import _ from "underscore";

  @Component({
    components: { NestableItem }
  })
  export default class Nestable extends Vue {
    $nestable: any;
    @Prop() value: any;
    @Prop({ default: true }) optionButton: any;
    @Prop({
      default: () => {
        return {
          url: "",
          settings: "md-list-box",
          listorder: "0",
          isshow: "1"
        };
      }
    }) defaultFormData: any;
    @Prop({
      default: () => {
        return [{
          field: "title",
          label: "名称",
          type: "input",
          required: true,
          rule: [{ required: true, message: "请输入名称" }]
        },
          /*  {
           field: "name",
           label: "名称",
           type: "input",
           required: true,
           rule: [{ required: true, message: "请输入名称", trigger: "blur" }],
           },*/
          {
            field: "url",
            label: "链接地址",
            type: "input"
          },
          {
            field: "settings",
            label: "图标",
            type: "input"
          },
          {
            field: "isshow",
            label: "是否显示",
            type: "radio",
            data: [{ text: "显示", value: "1" }, { text: "不显示", value: "0" }]
          },
          {
            field: "description",
            label: "描述",
            type: "input"
          },
          {
            field: "listorder",
            label: "排序",
            type: "input"
          }];
      }
    }) formModel: any;

    saveOrderLoading = false;
    modal: any = false;
    form: any;
    formData: any = {};

    /* 目前支持字段
    *  :data-id="item.id"
            :data-name="item.name"
            :data-url="item.url"
            :data-desc="item.desc"
            :data-params="item.params"
            :data-icon="item.icon"
            :data-shown="item.shown"
            :data-order="item.order"
    * */

    @Watch("value", { immediate: true })
    onChangeValue() {

    }

    saveOrder() {
      this.saveOrderLoading = true;
      this.$emit("save-order", this.$nestable.nestable("serialize"), () => {
        this.saveOrderLoading = false;
      });
      return this;
    }

    ok() {
      this.form.submit();
      return this;
    }

    cancel() {
      return this;
    }

    add() {
      this.formData = Object.assign({},this.defaultFormData);
      this.modal = true;
      return this;
    }

    submit() {
      let next = (id) => {
        if (id != null) {
          this.form.value.id = id;
          this.value.push(this.form.value);
        }
        else {
          let data = this.editNode(this.value, this.form.value);
          this.$emit("input", data);
          this.value.push();
        }
        this.modal = false;
      };

      let restore = () => {
        this.modal = false;
      };

      this.$emit("submit", this.form.value, next, restore);
      return this;
    }

    fail() {
    }

    addModal( item ) {
      this.modal = true;
      this.formData = Object.assign({ parentid : item.id },this.defaultFormData);
      return this;
    }

    editModal(item) {
      this.modal = true;
      this.formData = Object.assign({}, item);
      return this;
    }

    editNode(node, item) {
      for (let i = 0; i < node.length; i++) {
        if (node[i].id == item.id) {
          node[i] = item;
        }
        else {
          if (node[i].children) this.removeNode(node[i].children, item);
        }
      }
      return node;
    }

    removeNode(node, item) {
      for (let i = 0; i < node.length; i++) {
        if (node[i].id == item.id) {
          node.splice(i, 1);
        }
        else {
          if (node[i].children) this.removeNode(node[i].children, item);
        }
      }
      return node;
    }

    remove(item, index) {
      //Object.assign({}, this.value )
      let next = () => {
        this.$Modal.remove();
        let data = this.removeNode(this.value, item);
        this.$emit("input", data);
        this.value.push();
      };

      let restore = () => {
        this.$Modal.remove();
      };
      this.$emit("remove", item, next, restore);
      return this;
    }

    expandAll() {
      this.$nestable.nestable("expandAll");
      return this;
    }

    collapseAll() {
      this.$nestable.nestable("collapseAll");
      return this;
    }


    mounted() {
      this.form = this.$refs.form;

      setTimeout(() => {
        this.$nestable = $(".dd", this.$el).nestable("destory").nestable({
          group: 1,
          dragClass: "dd-dragel dd-small-handle"
        })
          .on("change", (e, n) => {
            // console.log( this.$nestable.nestable('serialize'));
            //this.$emit('input', this.$nestable.nestable('serialize') );
            this.$emit("change", this.$nestable.nestable("serialize"));
          });
      }, 500);
    }
  }
</script>
<style scoped lang="scss">
</style>