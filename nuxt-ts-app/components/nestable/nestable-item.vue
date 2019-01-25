<template>

    <ol class="dd-list ">
        <li class="dd-item" v-for="(item,key) in value"
            :data-id="item.id"
            :data-name="item.name"
            :data-title="item.title"
            :data-parentid="item.parentid"
            :data-settings="typeof item.settings == 'object' ? JSON.stringify(item.settings) : item.settings"
            :data-listorder="item.listorder"
            :data-url="item.url"
            :data-description="item.description"
            :data-params="item.params"
            :data-icon="item.icon"
            :data-isshow="item.isshow"
            :key="key">
            <div class="dd-handle">
                <i class="fa fa-arrows"></i>
            </div>
            <div class="dd-content clearfix">
                <div class="pull-left">
                    <Icon :type="item.settings" size="16"></Icon>
                    <Icon :type="item.isshow == true ? 'md-eye' : 'md-eye-off'" size="16"/>
                    {{ item.title }}
                    [ <router-link :to="item.url ? '/' + item.url : '/'"> {{  item.url  }}</router-link> ]
                    {{  item.desc  }}
                </div>
                <div class="pull-right">
                    <a href="javascript:;" @click="add(item , key )"><i class="fa fa-plus"></i></a>
                    <a href="javascript:;" @click="edit(item , key )"><i class="fa fa-edit"></i></a>
                    <a href="javascript:;"  @click="remove(item , key )"><i class="fa fa-trash" ></i></a>
                </div>
            </div>
            <nestable-item v-if="item.children && item.children.length" v-model="item.children" :root="root"></nestable-item>

        </li>
    </ol>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "nuxt-property-decorator";
  //import $ from "jquery"
  //import _ from "underscore"
  import AutoForm from "../auto-form/index.vue"

  @Component({
    components : { AutoForm }
  })
  export default class NestableItem extends Vue {
    @Prop() value :any ;
    @Prop() root :any ;

    edit( item , index ){
      this.root.editModal( item , index );
      return this;
    }

    add( item , index ){
      this.root.addModal( item , index );
      return this;
    }

    remove( item , index ){
      this.$Modal.confirm({
        title : '提示',
        content : '是否删除 ？',
        loading: true,
        onOk:()=>{
          this.root.remove( item , index );
        },
        onCancel:()=>{},
      })
      return this;
    }

    mounted() {
    }
  }
</script>
<style scoped lang="scss">
</style>