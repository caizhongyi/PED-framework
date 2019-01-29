<template>
    <div class="identify" @selectstart="">
        <canvas class="identify-background" :width="canvas.width" :height="canvas.height"></canvas>
        <canvas class="identify-block" :width="canvasBlock.width" :height="canvasBlock.height"
                :style="{ left: `${sliderBar.left}px`  }"></canvas>
        <div class="identify-refresh" @click="refresh"></div>
        <div class="identify-slider" :class=" [ status , isMouseDown ? 'active' : '']">
            <div class="identify-slider-mask" :style="{ width : `${sliderBar.left}px` }">
                <div class="identify-slider-bar" @mousedown="sliderBarMouseDown"
                     :style="{ left: `${sliderBar.left}px` }">
                    <Icon type="ios-menu" size="large"/>
                </div>
            </div>
            <span class="identify-slider-text">{{ text }}</span>
        </div>
    </div>
</template>

<script lang="ts">
  import { Component,  Vue } from "nuxt-property-decorator";
  //@Component  @Prop @Watch @Model 装饰器，对变量或方法进行装饰成Vue特定功能变量或方法
//  import { State, Getter, Action, Mutation, namespace } from "vuex-class";  // Vue store 全局定义，例如用户信息等全局都需要用的
  import $ from "jquery";

  //组件声名
  @Component({
    components: {}
  })
  export default class Identify extends Vue {    //  typescript 创建类继成 Vue

    x = 0;
    y = 0;

    l = 42;// 滑块边长
    r = 10;// 滑块半径
    PI = Math.PI;
    L = this.l + this.r * 2; // 滑块实际边长

    canvas: any = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      operation: "clip",
      context: {}
    };

    canvasBlock: any = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      operation: "clip",
      context: {}
    };

    canvasCtx: any;
    blockCtx: any;

    img: any;
    block: any;
    slider: any;

    status: any = "";
    isMouseDown: any = "";
    text = "向右滑动滑块填充拼图";
    originX = 0;
    originY = 0;
    trail: any;

    sliderBar: any = {
      left: 5
    };

    getRandomNumberByRange(start, end) {
      return Math.round(Math.random() * (end - start) + start);
    }

    createImg(onload) {
      var img: any = this.createElement("img");
      img.crossOrigin = "Anonymous";
      img.onload = onload;
      img.onerror = () => {
        img.src = this.getRandomImg();
      };
      img.src = this.getRandomImg();
      return img;
    }

    createElement(tagName) {
      return document.createElement(tagName);
    }

    addClass(tag, className) {
      tag.classList.add(className);
    }

    removeClass(tag, className) {
      tag.classList.remove(className);
    }

    getRandomImg() {
      return "https://picsum.photos/400/100/?image=" + this.getRandomNumberByRange(0, 100);
    }

    __draw(canvas, operation, x, y) {
      let ctx = canvas.context;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + this.l / 2, y);
      ctx.arc(x + this.l / 2, y - this.r + 2, this.r, 0, 2 * this.PI);
      ctx.lineTo(x + this.l / 2, y);
      ctx.lineTo(x + this.l, y);
      ctx.lineTo(x + this.l, y + this.l / 2);
      ctx.arc(x + this.l + this.r - 2, y + this.l / 2, this.r, 0, 2 * this.PI);
      ctx.lineTo(x + this.l, y + this.l / 2);
      ctx.lineTo(x + this.l, y + this.l);
      ctx.lineTo(x, y + this.l);
      ctx.lineTo(x, y);
      ctx.fillStyle = "rgba(0,0,0,.5)";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "black";
      ctx.fill();
      ctx[operation]();
      /*ctx.beginPath();
      ctx.arc(x, y + this.l / 2, this.r, 1.5 * this.PI, 0.5 * this.PI);
      ctx.globalCompositeOperation = "xor";
      ctx.fill();*/
    }


    sum(x, y) {
      return x + y;
    }

    square(x) {
      return x * x;
    }

    success() {
      this.$emit("success");
      return this;
    }

    fail() {
      this.$emit("fail");
      return this;
    }
    clean() {
      this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvasBlock.context.clearRect(0, 0, this.canvas.width, this.canvas.height );
      //this.sliderBar.left = this.w;
    }

    refresh() {
      this.reset();
    }

    selectstart() {
      return false;
    }

    sliderBarMouseDown(e) {
      this.originX = e.x, this.originY = e.y;
      this.isMouseDown = true;
    }

    bindEvents() {
      let trail: any = [];
      this.isMouseDown = false;
      $(document).off("mousemove.identify mouseup.identify").on("mousemove.identify", (e) => {
        if (!this.isMouseDown) return false;

        var moveX = e.pageX - this.originX;
        var moveY = e.pageY - this.originY;
        if (moveX < 0 || moveX + 38 >= this.canvas.width ) return false;
        this.sliderBar.left = moveX;
        //this.addClass(_this2.sliderContainer, 'active');
        trail.push(moveY);
      }).on("mouseup.identify", (e) => {
        if (!this.isMouseDown) return false;
        this.isMouseDown = false;
        if (e.pageX == this.originX) return false;
        this.trail = trail;

        var _verify = this.verify(),
          spliced = _verify.spliced,
          TuringTest = _verify.TuringTest;

        if (spliced) {
          if (TuringTest) {
            this.status = "success";
            this.success && this.success();
          } else {
            this.status = "fail";
            this.text = "再试一次";
            this.reset();
          }
        } else {
          this.status = "fail";
          this.fail && this.fail();
          setTimeout(() => {
            this.reset();
          }, 1000);
        }
      });
    }

    verify() {
      var arr = this.trail; // 拖动时y轴的移动距离
      var average = arr.reduce(this.sum) / arr.length; // 平均值
      var deviations = arr.map(function(x) {
        return x - average;
      }); // 偏差数组
      var stddev = Math.sqrt(deviations.map(this.square).reduce(this.sum) / arr.length); // 标准差
      var left = parseInt(this.sliderBar.left);
      return {
        spliced: Math.abs(left - this.x) < 10,
        TuringTest: average !== stddev // 只是简单的验证拖动轨迹，相等时一般为0，表示可能非人为操作
      };
    }

    reset() {
      this.create();
      this.sliderBar.left = 5;
      this.status = '';
      return this;
    }

    draw( context , operation , x , y ){
      context.fillStyle = 'rgba(255,255,255,.7)';
      context.shadowBlur = 10;
      context.shadowColor = "black";
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + this.l / 2, y);
      context.arc(x + this.l / 2, y - this.r + 2, this.r, 0, 2 * this.PI);
      context.lineTo(x + this.l / 2, y);
      context.lineTo(x + this.l, y);
      context.lineTo(x + this.l, y + this.l / 2);
      context.arc(x + this.l + this.r - 2, y + this.l / 2, this.r, 0, 2 * this.PI);
      context.lineTo(x + this.l, y + this.l / 2);
      context.lineTo(x + this.l, y + this.l);
      context.lineTo(x, y + this.l);
      context.lineTo(x, y);
      context[operation]();
      context.closePath();
/*      context.beginPath();
      context.arc(x, y + this.l / 2, this.r, 1.5 * this.PI, 0.5 * this.PI);
      context.globalCompositeOperation = "xor";
      context.fill();*/
    }

    getCanvas( selector ){
      let canvas:any = {} ;
      let $canvas = $(selector , this.$el);
      canvas.$element = $canvas;
      let c: any = $canvas[0];
      canvas.context = c.getContext("2d");
      canvas.width = $canvas.width();
      canvas.height = $canvas.height();
      $canvas.attr('width' , canvas.width  )
      $canvas.attr('height' , canvas.height  )

      return canvas;
    }

    create(){
      // 随机创建滑块的位置
      this.x = this.getRandomNumberByRange(this.canvasBlock.width + 10, this.canvas.width - (this.canvasBlock.width + 10));
      this.y = this.getRandomNumberByRange(10 + this.r * 2, this.canvas.height - (this.canvasBlock.width + 10));

      var img: any = new Image();
      img.src = this.getRandomImg();
      //img.crossOrigin = "Anonymous";

      img.onload = () => {
        this.canvas.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        this.draw( this.canvas.context , 'fill' , this.x , this.y );
        this.draw( this.canvasBlock.context , 'clip' ,   0 , this.y );
        this.canvasBlock.context.drawImage(img,  -this.x , 0 , this.canvas.width, this.canvas.height);

      };
      return this;
    }

    mounted() {  // Vue 的 mounted 初始化回调
      //randomCode( this.$el , this.success , this.fail );
      this.bindEvents();
      this.canvas = this.getCanvas('.identify-background');
      this.canvasBlock = this.getCanvas('.identify-block');

      this.create();


    }
  }
</script>

<style lang="scss">
    @import "index";
</style>
