<template>
  <div class="VueToNuxtLogo">
    <div class="Triangle Triangle--two"/>
    <div class="Triangle Triangle--one"/>
    <div class="Triangle Triangle--three"/>
    <div class="Triangle Triangle--four"/>
  </div>
</template>
<script type="ts">
  import AppLogo from '~/components/AppLogo.vue'

  export default {
    components: {
    },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        num: this.value
      }
    },
    watch: {
      value: function (val) {
        this.visible = val;
      },
      num: function (val) {
        this.$emit('input', val);
      }
    },
    mounted: function () {
      //数字自增到某一值动画参数（目标元素,自定义配置）
      this.numAutoPlusAnimation(this.num, {
        time: 1500,
        num: 12000,
        regulator: 50
      })
    },
    methods: {
      numAutoPlusAnimation(value, options) /**/ {
        /*可以自己改造下传入的参数，按照自己的需求和喜好封装该函数*/
        //不传配置就把它绑定在相应html元素的data-xxxx属性上吧
        options = options || {};

        var time = options.time, //总时间--毫秒为单位
          finalNum = options.num, //要显示的真实数值
          regulator = options.regulator || 100, //调速器，改变regulator的数值可以调节数字改变的速度

          step = finalNum / (time / regulator), /*每30ms增加的数值--*/
          count = 0, //计数器
          initial = 0;

        var timer = setInterval(function () {

          count = count + step;

          if (count >= finalNum) {
            clearInterval(timer);
            count = finalNum;
          }
          //t未发生改变的话就直接返回
          //避免调用text函数，提高DOM性能
          var t = Math.floor(count);
          if (t == initial) return;

          initial = t;

          value = initial;
        }, 30);
      }
    }
  }
</script>
<style scoped>

</style>
