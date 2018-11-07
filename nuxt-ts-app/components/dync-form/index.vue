<template>
    <div>
        <Form ref="form" label-position="right" :model="data" :inline="inline" :label-width="labelWidth"
              :rules="ruleValidate">
            <slot name="header" :data="data"></slot>
            <dync-form-item :model="model" :data="data" :rule-validate="ruleValidate" :label-width="labelWidth"></dync-form-item>
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
  import Ajax from "../ajax";
  import DyncFormItem from "./dync-form-item";

  interface SubmitButton{
    text :any ;
    icon :any ;
  }

  @Component({
    components: { Ajax , DyncFormItem }
  })
  export default class DyncForm extends Vue {

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

    }
  }
</script>
<style scoped lang="scss">

</style>
