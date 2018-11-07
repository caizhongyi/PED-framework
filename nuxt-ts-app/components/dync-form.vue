<template>
    <div>
        <Form ref="form" label-position="right" :model="data" :inline="inline" :label-width="labelWidth"
              :rules="ruleValidate">
            <slot name="header" :data="data"></slot>
            <template v-for="item in model">
                <FormItem :prop="item.field" :label="item.label" :required="item.required" v-if="item.type == 'date'">
                    <DatePicker type="date" placeholder="选择日期" :format="item.format" :disabled="item.disabled"
                                v-model="data[item.field]"></DatePicker>
                </FormItem>
                <FormItem :prop="item.field" :label="item.label" :required="item.required"
                          v-else-if="item.type == 'datetime'">
                    <DatePicker type="datetime" placeholder="选择日期时间" :format="item.format" :disabled="item.disabled"
                                v-model="data[item.field]"></DatePicker>
                </FormItem>
                <FormItem :prop="item.field" :label="item.label" :required="item.required"
                          v-else-if="item.type == 'datetimerange'">
                    <DatePicker type="datetimerange" placeholder="选择日期区间" :format="item.format" :disabled="item.disabled"
                                :start-date="item.startDate"
                                :end-date="item.endDate" v-model="data[item.field]"></DatePicker>
                </FormItem>
                <FormItem :prop="item.field" :label="item.label" :required="item.required"
                          v-else-if="item.type == 'daterange'">
                    <DatePicker type="daterange" placeholder="选择日期区间" :format="item.format" :start-date="item.startDate" :disabled="item.disabled"
                                :end-date="item.endDate" v-model="data[item.field]"></DatePicker>
                </FormItem>
                <FormItem :prop="item.field" :label="item.label" :required="item.required"
                          v-else-if="item.type == 'radio'">
                    <RadioGroup v-model="data[item.field]" :disabled="item.disabled">
                        <Radio :label="subItem.value" v-for="(subItem,key) in item.data" :key="key" :disabled="subItem.disabled"> {{ subItem.text}}
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem :prop="item.field" :label="item.label" :required="item.required"
                          v-else-if="item.type == 'checkbox'">
                    <CheckboxGroup v-model="data[item.field]" :disabled="item.disabled">
                        <Checkbox :label="subItem.value" v-for="(subItem,key) in item.data" :key="key" :disabled="subItem.disabled">  {{ subItem.text }}
                        </Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem :prop="item.field" :label="item.label" :required="item.required"
                          v-else-if="item.type == 'switch'">
                    <i-switch v-model="data[item.field]" size="large" :disabled="item.disabled">
                        <span slot="open">On</span>
                        <span slot="close">Off</span>
                    </i-switch>
                </FormItem>
                <FormItem :prop="item.field" :label="item.label" :required="item.required"
                          v-else-if="item.type == 'slider'">
                    <Slider v-model="data[item.field]" :range="item.range || false " :disabled="item.disabled"></Slider>
                </FormItem>
                <FormItem :prop="item.field" :label="item.label" :required="item.required"
                          v-else-if="item.type == 'text'">
                    <Input v-model="data[item.field]" type="textarea"
                           :autosize="item.autosize || {minRows: 2,maxRows: 5}"
                           :placeholder="item.placeholder || '请输入信息'" :disabled="item.disabled"></Input>
                </FormItem>
                <FormItem :prop="item.field" :label="item.label" :required="item.required"
                          v-else-if="item.type == 'select'">
                    <Select v-model="data[item.field]" :placeholder="item.placeholder" :disabled="item.disabled">
                        <Option :value="subItem.value" v-for="(subItem,key) in item.data" :key="key">{{ subItem.text}}</Option>
                    </Select>
                </FormItem>
                <FormItem :prop="item.field" :label="item.label" :required="item.required"
                          v-else-if="item.type == 'upload'">
                    <div class="upload-list" v-for="subItem in item.uploadList">
                        <template v-if="subItem.status === 'finished'">
                            <img :src="subItem.url">
                            <div class="upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="view(subItem.name)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="item.remove(subItem , item )"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="subItem.showProgress" :percent="subItem.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload
                            ref="upload"
                            :show-upload-list="false"
                            :default-file-list="item.value"
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

                </FormItem>
                <FormItem :prop="item.field" :label="item.label" :required="item.required" v-else-if="item.type == 'input'">
                    <Input type="text" v-model="data[item.field]"  :disabled="item.disabled" :placeholder="item.placeholder || '请输入信息'"></Input>
                </FormItem>
            </template>
            <slot :data="data"></slot>
            <FormItem  v-if="submitButton">
                <Button type="primary" @click="submit('form')" :icon="submitButton.icon">{{ submitButton.text }}</Button>
                <Button @click="reset('form')" v-if="!submitButton.icon">重置</Button>
            </FormItem>
            <slot name="footer" :data="data"></slot>
        </Form>

        <Modal title="图片浏览" v-model="modalVisible" >
            <img :src="'https://o5wwk8baw.qnssl.com/' + modalImageName + '/large'" style="width: 100%" v-if="modalImageName">
        </Modal>
    </div>
</template>
<script lang="ts">
  import { Component, Model, Prop, Vue, Watch } from "nuxt-property-decorator";
  import Ajax from "./ajax";

  interface SubmitButton{
    text :any ;
    icon :any ;
  }

  @Component({
    components: { Ajax }
  })
  export default class  extends Vue {

    form : any ;
    data: any = {};
    @Prop() inline: any;
    @Model() model: any;
    @Prop() rules: any;
    @Prop() labelWidth: any;
    @Prop() type: any;
    @Prop({ default :()=>{ return { text : '提交' , icon : ''}}}) submitButton: SubmitButton;

   // @Prop() rules : any ;

    ruleValidate: any = {};
    modalVisible = false;
    modalImageName : any = '';
    /*ruleValidate = {
      name: [
        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
      ],
      mail: [
        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
      ],
      city: [
        { required: true, message: 'Please select the city', trigger: 'change' }
      ],
      gender: [
        { required: true, message: 'Please select gender', trigger: 'change' }
      ],
      interest: [
        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
      ],
      date: [
        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
      ],
      time: [
        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
      ],
      desc: [
        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
      ]
    }*/


    @Watch("model")
    onChangeModel(val) {
      this.$emit("input", val);
    }


    submit(name) {
      let myform: any = this.$refs[name];
      myform.validate && myform.validate((valid) => {
        if (valid) {
          this.$emit("success" , this.data );
        } else {
          this.$emit("fail"  , this.data );
        }
      });
      return this;
    }

    reset(name) {
      let form: any = this.$refs[name];
      form.resetFields();
      return this;
    }

    view(name) {
      this.modalImageName = name;
      this.modalVisible = true;
      return this;
    }

    mounted() {
      this.form = this.$refs.form;
      let upload: any = this.$refs.upload;
      let index = 0 ;
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
          let uploader = upload[index];
          item.uploader = uploader;
          item.uploadList = uploader.fileList || [];
          item['removeFile'] =  (file) => {
            const fileList = uploader.fileList;
            fileList.splice(fileList.indexOf(file), 1);
            this.model.push();
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
            this.model.push();
          },
            item = {  ...uploadSettings, ...item }
          index ++ ;
        }
        this.data[item.field] = item.value;
      }
      this.model.push();

    }
  }
</script>
<style scoped lang="scss">
    .upload-list {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .upload-list img {
        width: 100%;
        height: 100%;
    }

    .upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .upload-list:hover .upload-list-cover {
        display: block;
    }

    .upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
