<template>

    <div class="floor-design">
        <i-card class="clearfix">
            <i-row>
                <i-col span="8" class="drag-elements">
                    <span class="drag-layer" @click="add()">房间</span>
                    <span class="drag-layer" @click="add()">楼梯</span>
                </i-col>
                <i-col span="11" >
                    <i-form inline="">
                        <i-form-item prop="行">
                            <i-input type="text" id="row" v-model="row"   value="1" placeholder="行"></i-input>
                        </i-form-item>
                        <i-form-item prop="列">
                            <i-input v-model="col" type="text" id="col"   value="1"  placeholder="列"></i-input>
                        </i-form-item>
                        <i-form-item >
                            <i-button type="primary" class="btn-batch" @click="batch()">批量创建</i-button>
                        </i-form-item>
                     <!--   <i-form-item prop="">
                            <i-input type="radio" v-model="type" name="type" value="1" checked> 方形 </i-input>
                        </i-form-item>-->
                    </i-form>
                </i-col>
                <i-col span="5" class="text-right">
                    <i-button type="default" class="btn-clear" @click="clear()">清除</i-button>
                    <i-button type="primary" class="btn-save"  @click="save()">保存</i-button>
                </i-col>
            </i-row>
        </i-card>
        <br>
        <i-card class="drag-design">

        </i-card>
    </div>

</template>
<script lang="ts">
  import { Component, Prop, Vue } from "nuxt-property-decorator";
  import $ from "jquery";
  import Design from "./lib/design.ts";

  @Component({
    components: { }
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

    add(){
      let data = { x: 0, y: 0, name: '房间' , background : 'https://icarusion.gitee.io/iview/e1cf12c07bf6458992569e67927d767e.png'}
      this.design.add(data);
      return this;
    }

    clear(){
      this.design.empty();
      return this;
    }
    save(){
      this.design.save();
      return this;
    }
    batch(){
      switch ( this.type ) {
        case 1:
          this.design.createR( this.row  , this.col  );
          break;
      }
      return this;
    }
    floor(number) {
      switch (number) {
        case 1 :
          this.design.empty().create([{"x": 154, "y": 50, "name": "房间 " }, {"x": 372, "y": 54, "name": "房间 "}, {
            "x": 262,
            "y": 52,
            "name": "房间 "
          }, {"x": 480, "y": 55, "name": "房间 "}])
          break;
        case 2 :
          this.design.empty().create([{"x": 246, "y": 155, "name": "房间 ", "direction": "北", "rotate": 180}, {
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
      return this;
    }
    mounted() {
      this.design = new Design('.drag-design') ;
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
        background-color :#eeeeee;
        text-align :center;
        width :100px;
        display: inline-block;
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
        .layer-content,.layer-info{
            background-size: 100% 100%;
            background-repeat: no-repeat;
            width: 100%;
            height: 100%;
        }
        .layer-info{
            position: absolute;
            left: 0 ;
            top: 0;
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
            background: #999;
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
