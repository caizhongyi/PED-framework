<template>

    <div class="floor-design">
        <div class="panel clearfix">
            <div class="pull-left">
                <ul class="clearfix drag-elements list-unstyled">
                    <li>
                        <div class="drag-layer">房间</div>
                    </li>
                    <li>
                        <div class="drag-layer">楼梯</div>
                    </li>
                    <li>
                        <div class="drag-layer">楼道</div>
                    </li>
                </ul>
            </div>
            <div class="pull-left">
                <ul class="clearfix drag-elements list-unstyled">
                    <li>
                        <input type="text" id="row" v-model="row" style="width: 50px;" maxlength="2" value="1"> x <input v-model="col" type="text" id="col"  style="width: 50px;" maxlength="2" value="1">
                    </li>
                </ul>
                <ul class="clearfix drag-elements list-unstyled">
                    <li><input type="radio" v-model="type" name="type" value="1" checked> 方形 </li>
                    <li><input type="radio" v-model="type" name="type" value="2" > U形 </li>
                    <li><input type="radio" v-model="type" name="type" value="3" > L形 </li>
                    <li><input type="radio" v-model="type" name="type" value="4" > L1形 </li>
                    <li><input type="radio" v-model="type" name="type" value="5" > L2形 </li>
                    <li><input type="radio" v-model="type" name="type" value="6" > L3形 </li>
                    <li><button type="button" class="btn btn-primary btn-batch" @click="batch()">批量创建</button></li>
                </ul>
            </div>
            <div class="pull-right">
                <button type="button" class="btn btn-primary btn-clear" @click="clear()">清除</button>
                <button type="button" class="btn btn-primary btn-save"  @click="save()">保存</button>
            </div>
        </div>

        <div class="panel drag-design">

        </div>
    </div>

</template>
<script lang="ts">
  import { Component, Prop, Vue } from "nuxt-property-decorator";
  import $ from "jquery";
  import Design from "./lib/design";

  @Component({
    components: {
    }
  })
  export default class FloorDesign  extends Vue {
    @Prop({ default: 'all' })
    direction;
    design: any;
    row : number = 1;
    col : number = 1;
    type : number = 1;
    /*@Model()
    visible:boolean = false;

    @Watch('visible')
    onChangeVisible( val ) {
      this.$emit('input', val);
    }*/

    clear(){
      this.design.empty();
    }
    save(){
      this.design.save();
    }
    batch(){
      switch ( this.type ) {
        case 1:
          this.design.createR( this.row  , this.col  );
          break;
      }
    }
    mounted() {
      let that = this;
      this.design = new Design() ;

      function floor(number) {
          switch (number) {
              case 1 :
                that.design.empty().create([{"x": 154, "y": 50, "name": "房间 "}, {"x": 372, "y": 54, "name": "房间 "}, {
                      "x": 262,
                      "y": 52,
                      "name": "房间 "
                  }, {"x": 480, "y": 55, "name": "房间 "}])
                  break;
              case 2 :
                that.design.empty().create([{"x": 246, "y": 155, "name": "房间 ", "direction": "北", "rotate": 180}, {
                      "x": 583,
                      "y": 292,
                      "name": "房间 ",
                      "direction": "北",
                      "rotate": 180
                  }, {"x": 351, "y": 154, "name": "房间 ", "direction": "西", "rotate": 90}, {
                      "x": 685,
                      "y": 52,
                      "name": "房间 ",
                      "direction": "南",
                      "rotate": 360
                  }, {"x": 140, "y": 156, "name": "楼道 ", "direction": "东", "rotate": 270}, {
                      "x": 576,
                      "y": 55,
                      "name": "楼道 ",
                      "direction": "北",
                      "rotate": 180
                  }, {"x": 918, "y": 80, "name": "楼道 "}, {"x": 1030, "y": 82, "name": "楼梯 "}, {
                      "x": 691,
                      "y": 294,
                      "name": "房间 ",
                      "direction": "东",
                      "rotate": 270
                  }, {"x": 362, "y": 287, "name": "房间 ", "direction": "东", "rotate": 270}, {
                      "x": 798,
                      "y": 294,
                      "name": "房间 ",
                      "direction": "西",
                      "rotate": 90
                  }, {"x": 49, "y": 418, "name": "房间 ", "direction": "东", "rotate": 270}, {
                      "x": 262,
                      "y": 52,
                      "name": "楼梯 ",
                      "direction": "南",
                      "rotate": 360
                  }, {"x": 154, "y": 50, "name": "房间 "}, {"x": 372, "y": 54, "name": "房间 "}, {
                      "x": 480,
                      "y": 55,
                      "name": "房间 "
                  }, {"x": 246, "y": 155, "name": "房间 ", "direction": "北", "rotate": 180}, {
                      "x": 583,
                      "y": 292,
                      "name": "房间 ",
                      "direction": "北",
                      "rotate": 180
                  }, {"x": 351, "y": 154, "name": "房间 ", "direction": "西", "rotate": 90}, {
                      "x": 685,
                      "y": 52,
                      "name": "房间 ",
                      "direction": "南",
                      "rotate": 360
                  }, {"x": 140, "y": 156, "name": "楼道 ", "direction": "东", "rotate": 270}, {
                      "x": 576,
                      "y": 55,
                      "name": "楼道 ",
                      "direction": "北",
                      "rotate": 180
                  }, {"x": 918, "y": 80, "name": "楼道 "}, {"x": 1030, "y": 82, "name": "楼梯 "}, {
                      "x": 691,
                      "y": 294,
                      "name": "房间 ",
                      "direction": "东",
                      "rotate": 270
                  }, {"x": 362, "y": 287, "name": "房间 ", "direction": "东", "rotate": 270}, {
                      "x": 798,
                      "y": 294,
                      "name": "房间 ",
                      "direction": "西",
                      "rotate": 90
                  }, {"x": 49, "y": 418, "name": "房间 ", "direction": "东", "rotate": 270}, {
                      "x": 154,
                      "y": 50,
                      "name": "房间 "
                  }, {"x": 372, "y": 54, "name": "房间 "}, {"x": 480, "y": 55, "name": "房间 "}, {
                      "x": 246,
                      "y": 155,
                      "name": "房间 ",
                      "direction": "北",
                      "rotate": 180
                  }, {"x": 583, "y": 292, "name": "房间 ", "direction": "北", "rotate": 180}, {
                      "x": 351,
                      "y": 154,
                      "name": "房间 ",
                      "direction": "西",
                      "rotate": 90
                  }, {"x": 685, "y": 52, "name": "房间 ", "direction": "南", "rotate": 360}, {
                      "x": 140,
                      "y": 156,
                      "name": "楼道 ",
                      "direction": "东",
                      "rotate": 270
                  }, {"x": 576, "y": 55, "name": "楼道 ", "direction": "北", "rotate": 180}, {
                      "x": 918,
                      "y": 80,
                      "name": "楼道 "
                  }, {"x": 1030, "y": 82, "name": "楼梯 "}, {
                      "x": 691,
                      "y": 294,
                      "name": "房间 ",
                      "direction": "东",
                      "rotate": 270
                  }, {"x": 362, "y": 287, "name": "房间 ", "direction": "东", "rotate": 270}, {
                      "x": 798,
                      "y": 294,
                      "name": "房间 ",
                      "direction": "西",
                      "rotate": 90
                  }, {"x": 49, "y": 418, "name": "房间 ", "direction": "东", "rotate": 270}, {
                      "x": 154,
                      "y": 50,
                      "name": "房间 "
                  }, {"x": 372, "y": 54, "name": "房间 "}, {"x": 480, "y": 55, "name": "房间 "}, {
                      "x": 246,
                      "y": 155,
                      "name": "房间 ",
                      "direction": "北",
                      "rotate": 180
                  }, {"x": 583, "y": 292, "name": "房间 ", "direction": "北", "rotate": 180}, {
                      "x": 351,
                      "y": 154,
                      "name": "房间 ",
                      "direction": "西",
                      "rotate": 90
                  }, {"x": 685, "y": 52, "name": "房间 ", "direction": "南", "rotate": 360}, {
                      "x": 140,
                      "y": 156,
                      "name": "楼道 ",
                      "direction": "东",
                      "rotate": 270
                  }, {"x": 576, "y": 55, "name": "楼道 ", "direction": "北", "rotate": 180}, {
                      "x": 918,
                      "y": 80,
                      "name": "楼道 "
                  }, {"x": 1030, "y": 82, "name": "楼梯 "}, {
                      "x": 691,
                      "y": 294,
                      "name": "房间 ",
                      "direction": "东",
                      "rotate": 270
                  }, {"x": 362, "y": 287, "name": "房间 ", "direction": "东", "rotate": 270}, {
                      "x": 798,
                      "y": 294,
                      "name": "房间 ",
                      "direction": "西",
                      "rotate": 90
                  }, {"x": 49, "y": 418, "name": "房间 ", "direction": "东", "rotate": 270}, {
                      "x": 154,
                      "y": 50,
                      "name": "房间 "
                  }, {"x": 45, "y": 55, "name": "房间 "}, {"x": 480, "y": 55, "name": "房间 "}, {
                      "x": 246,
                      "y": 155,
                      "name": "房间 ",
                      "direction": "北",
                      "rotate": 180
                  }, {"x": 583, "y": 292, "name": "房间 ", "direction": "北", "rotate": 180}, {
                      "x": 351,
                      "y": 154,
                      "name": "房间 ",
                      "direction": "西",
                      "rotate": 90
                  }, {"x": 685, "y": 52, "name": "房间 ", "direction": "南", "rotate": 360}, {
                      "x": 140,
                      "y": 156,
                      "name": "楼道 ",
                      "direction": "东",
                      "rotate": 270
                  }, {"x": 576, "y": 55, "name": "楼道 ", "direction": "北", "rotate": 180}, {
                      "x": 918,
                      "y": 80,
                      "name": "楼道 "
                  }, {"x": 1030, "y": 82, "name": "楼梯 "}, {
                      "x": 691,
                      "y": 294,
                      "name": "房间 ",
                      "direction": "东",
                      "rotate": 270
                  }, {"x": 362, "y": 287, "name": "房间 ", "direction": "东", "rotate": 270}, {
                      "x": 798,
                      "y": 294,
                      "name": "房间 ",
                      "direction": "西",
                      "rotate": 90
                  }, {"x": 45, "y": 295, "name": "房间 ", "direction": "东", "rotate": 270}])
                  break;
          }
      }
    }
  }
</script>
<style  lang="scss">
    .floor-design{
        .panel{
            padding-bottom :20px;
            border: 1px solid #ddd;
            border-radius :10px;
            overflow :hidden;
        }
    }

    .drag-elements{
        li{
            margin : 0;
            padding: 10px;
            float: left;
            list-style: none;
        }
        overflow: hidden;
    }

    .drag-layer{
        background :#eeeeee;
        text-align :center;
        width :100px;
        height: 100px;
        border-radius :2px;
        line-height :100px;
        color :#666;
        box-sizing: border-box;
        position :relative;
        &.active{
            border :1px solid #dddddd;
            background: #cbcbcb;
        }
        span,div{
            pointer-events: none;
            display: block;
        }
        i{
            position: absolute;
            top : 5px;
            right: 5px;
            display :block;
            cursor: default;
        }
        &.on{
            opacity :.5;
        }
        .drop-size{
            width :5px;
            height:5px;
            border :1px solid #dddddd;
            cursor :nwse-resize;
            position :absolute;
            right :0;
            bottom :0;
        }
    }

    .area-box{
        border: 1px solid #ddd;
        position:absolute;
        left :0;
        top :0;
    }

    .drag-elements{
        li{
            float :left;
            padding :10px;
        }
    }

    .drag-design{
        position: relative;
        width :100%;
        height :600px;
        overflow :hidden;
        user-select: none;
        -webkit-user-select: none;
        .drag-layer{
            position: absolute;
            left: 10px;
            top: 10px;
        }
    }

</style>
