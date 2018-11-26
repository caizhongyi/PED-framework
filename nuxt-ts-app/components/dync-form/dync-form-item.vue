<template>
    <span>
        <template v-for="(item,key) in model" >
            <FormItem v-if=" item.type || ( item.type && item.type != 'custom')" :prop="item.field" :label="item.label" :required="item.required">
                <DatePicker  v-if="item.type == 'date'" type="date" placeholder="请选择日期" :format="item.format" :disabled="item.disabled" v-model="value[item.field]"></DatePicker>
                <DatePicker  v-else-if="item.type == 'datetime'" type="datetime" placeholder="请选择日期时间" :format="item.format" :disabled="item.disabled" v-model="value[item.field]"></DatePicker>
                <DatePicker v-else-if="item.type == 'datetimeRange'" type="datetimerange" placeholder="请选择日期时间区间" :format="item.format" :disabled="item.disabled"
                            :start-date="item.startDate"
                            :end-date="item.endDate" v-model="value[item.field]"></DatePicker>
                <DatePicker v-else-if="item.type == 'dateRange'" type="daterange" placeholder="请选择日期区间" :format="item.format" :start-date="item.startDate" :disabled="item.disabled"
                            :end-date="item.endDate" v-model="value[item.field]"></DatePicker>
                 <RadioGroup  v-else-if="item.type == 'radio'" v-model="value[item.field]" :disabled="item.disabled">
                    <Radio :label="subItem.value" v-for="(subItem,key) in item.data" :key="key" :disabled="subItem.disabled"> {{ subItem.text}}
                    </Radio>
                </RadioGroup>
                <CheckboxGroup v-else-if="item.type == 'checkbox'" v-model="value[item.field]" :disabled="item.disabled">
                    <Checkbox :label="subItem.value" v-for="(subItem,key) in item.data" :key="key" :disabled="subItem.disabled">  {{ subItem.text }}
                    </Checkbox>
                </CheckboxGroup>
                <i-switch v-else-if="item.type == 'switch'" v-model="value[item.field]" size="large" :disabled="item.disabled">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                </i-switch>
                <Slider v-else-if="item.type == 'slider'" v-model="value[item.field]" :range="item.range || false " :disabled="item.disabled"></Slider>
                 <Input v-else-if="item.type == 'textarea'" v-model="value[item.field]" type="textarea"
                        :autosize="item.autosize || {minRows: 5,maxRows: 5}"
                        :placeholder="item.placeholder || '请输入信息'" :disabled="item.disabled"></Input>
                <Select v-else-if="item.type == 'select'" :multiple="item.multiple"  v-model="value[item.field]" :placeholder="item.placeholder" :disabled="item.disabled">
                    <Option :value="subItem.value" v-for="(subItem,key) in item.data" :key="key">{{ subItem.text}}</Option>
                </Select>
                <Tree ref="tree" v-else-if="item.type == 'tree'"
                      :data="item.data"
                      :load-data="item.loadData"
                      @on-check-change="( val )=>{ item.checkChange && item.checkChange( val ) } "
                      multiple
                      empty-text="暂无数据"
                      show-checkbox
                      v-model="value[item.field]"
                ></Tree>
                <div v-else-if="item.type == 'upload'">
                    <no-ssr><div class="upload-list" v-for="subItem in value[item.field]">
                        <template v-if="subItem.status === 'finished'">
                            <img :src="subItem.url" alt="subItem.name"/>
                            <div class="upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="view(subItem.name)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="item.remove(subItem , item )"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="subItem.showProgress" :percent="subItem.percentage" hide-info></Progress>
                        </template>
                     </div></no-ssr>
                     <Upload
                             ref="upload"
                             :show-upload-list="false"
                             :default-file-list="value[item.field]"
                             :on-success="item.successCallback"
                             :format="['jpg','jpeg','png']"
                             :max-size="2048"
                             :on-format-error="item.formatError"
                             :on-exceeded-size="item.maxSize "
                             :before-upload="item.beforeUpload"
                             multiple
                             type="drag"
                             :action="item.action || ''"
                             v-if="!item.disabled"
                             style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                    </div>
                </Upload>
                </div>
                <Input v-else-if="item.type == 'input'" type="text" v-model="value[item.field]"  :disabled="item.disabled" :placeholder="item.placeholder || '请输入信息'"></Input>
                <Input v-else-if="item.type == 'password'" type="password" v-model="value[item.field]"  :disabled="item.disabled" :placeholder="item.placeholder || '请输入密码'"></Input>
                <InputNumber v-else-if="item.type == 'inputNumber'" :max="item.max" :min="item.min || 0" :step="item.step || 1" :formatter="item.formatter" :parser="item.parser" v-model="value[item.field]"></InputNumber>
                <InputNumber v-else-if="item.type == 'cascader'" :data="item.data" v-model="value[item.field]"></InputNumber>
            </FormItem>
            <i-card v-if="item.children" :style="{ 'margin-left': `${labelWidth}px`}">
                <dync-form-item :model="item.children" v-model="value" :ruleValidate="ruleValidate"></dync-form-item>
            </i-card>
        </template>
    </span>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch, Model } from "nuxt-property-decorator";
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
  import { State, Getter, Action, Mutation, namespace } from "vuex-class";  // Vue store 全局定义，例如用户信息等全局都需要用的
  import _  from "underscore"
  //组件声名
  @Component({
    components: {  }
  })
  export default class DyncFormItem  extends Vue {    //  typescript 创建类继成 Vue

    @Prop({ default : ()=>{ return  [] }}) model;
    @Prop({ default : ()=>{ return  {} }}) value;
    @Prop() ruleValidate;
    @Prop() labelWidth;

    uploads:any = [];
    trees:any = [];

    setTreeChecked( data:Array<any> = [] , checkedData:Array<any> = []  ){
        for( let item of data ){
          _(checkedData).map(( n )=>{
            item.checked = n.id == item.id ;
          })

          if( item.children ){
            this.setTreeChecked(  item.children , checkedData );
          }
        }
        return data;
    }

    getTreeChecked( data:Array<any> = [] , checkedData:Array<any> = [] ){
      data = [];
      for( let item of checkedData){
        let clone : any = { ...item };
        data.push(clone);
        if( clone.children ){
          this.getTreeChecked( data , item.children );
          delete clone.children;
        }
      }
      return data;
    }

    mounted() {  // Vue 的 mounted 初始化回调
      this.uploads = this.$refs.upload;
      this.trees = this.$refs.tree;

      for (let item of this.model) {
        if (item.rule) {
          this.ruleValidate[item.field] = item.rule;
        }
        let uploadSettings = {
          uploader : {},
          uploadList: [],
          /* defaultList: [
             {
               "name": "a42bdcc1178e62b4694c830f028db5c0",
               "url": "https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar"
             },
             {
               "name": "bc7521e033abdd1e92222d733590f104",
               "url": "https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar"
             }
           ],*/
          formatError: (file) => {
            this.$Modal.error({
              title: '提示',
              content: '请上传jpg,png格式的图片',
            });
          },
          maxSize(file) {
            this.$Modal.error({
              title: '提示',
              content: '上传的文件大小不能超过2M',
            });
          },
          beforeUpload() {
            const check = this.uploadList.length < 5;
            if (!check) {
              this.$Modal.error({
                title: '提示',
                content: '上传的文件个数不能超过5张',
              });
            }
            return check;
          }
        };
        if( item.type == 'upload'){
          this.value[item.field] = this.value[item.field] || [];
          item['removeFile'] =  (file) => {
            let fileList = this.value[item.field] ; //uploader.fileList;
            fileList.splice(fileList.indexOf(file), 1);
            fileList.push();
          }

          if( !item['remove'] ){
            item['remove'] =  (file) => {
              item['removeFile'] && item['removeFile']( file , item );
            }
          }

          item['successCallback'] = (res, file) => {
            /*file.url = "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
            file.name = "7eb99afb9d5f317c912f08b5212fd69a";*/
            item.success && item.success(res, file);
            this.value[item.field].push();
          },
          item = {  ...uploadSettings, ...item }
        }
        else if( item.type == 'tree'){
            item['checkChange'] = ( val )=>{
              this.value[item.field] =  this.getTreeChecked( [] , val);
            }
        }
        // let { field , value  } = item;
        //this.data[field] = value;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
