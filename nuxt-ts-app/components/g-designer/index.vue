<template>
    <div class="g-designer">
        <i-card class="clearfix">
            <i-row>
                <i-col span="8" class="g-designer-elements">
                    <span class="g-designer-element" @click="add()">
                        <div class="g-designer-element-name"></div>
                    </span>
                </i-col>
                <i-col span="11">
                    <i-form inline="">
                        <i-form-item prop="行">
                            <i-input type="text" id="row" v-model="row" value="1" placeholder="行"></i-input>
                        </i-form-item>
                        <i-form-item prop="列">
                            <i-input v-model="col" type="text" id="col" value="1" placeholder="列"></i-input>
                        </i-form-item>
                        <i-form-item>
                            <i-button type="primary" class="btn-batch" @click="batch()">批量创建</i-button>
                        </i-form-item>
                        <!--   <i-form-item prop="">
                               <i-input type="radio" v-model="type" name="type" value="1" checked> 方形 </i-input>
                           </i-form-item>-->
                    </i-form>
                </i-col>
                <i-col span="5" class="text-right">
                    <i-button type="default" class="btn-clear" @click="clear()">清除</i-button>
                    <i-button type="primary" class="btn-save" @click="save()">保存</i-button>
                </i-col>
            </i-row>
        </i-card>
        <br>
        <div style="position: relative"  @contextmenu.prevent=""  @mousedown="(e)=>{  selectElementMouseDown(e ) ;}" @mouseup="(e)=>{  selectElementMouseUp(e  ) ;}" @mousemove="(e)=>{  selectElementMouseMove(e ) ;}">
            <i-card class="g-designer-container" >
                <div class="g-designer-element"
                     @contextmenu="(e)=>{ elementContextmenu ( e , item ) ;}"
                     :class="{ on : item.id == currentElement.id , active : item.active }"
                     @mousedown="(e)=>{  elementMouseDown(e , item , 'move' ) ;}"
                     v-for="(item,key) in value"
                     :key="key"
                     :style="{ cursor: 'move',  left: `${item.x}px` , top: `${item.y}px` , width: `${item.width}px` , height: `${item.height}px`}">
                    <span
                        class="g-designer-element-content g-designer-element-rotate"
                        :style="{ 'background-image': `url(${item.background})` ,  transform: 'rotate('+ item.rotate +'deg)' , '-webkit-transform' : 'rotate('+ item.rotate +'deg)'}"></span><span
                        class="g-designer-element-name" >{{ item.name }}</span>
                    <span class="g-designer-element-remove" title="删除" @click="remove( item )"><i
                        class="ivu-icon ivu-icon-ios-trash" ></i></span>
                    <span class="g-designer-element-size" title="放缩" @mousedown="(e)=>{  elementMouseDown(e , item  , 'size'  ) ;}"></span>

                    <div class="g-designer-element-tip clearfix" v-if=" item.hasTip ">
                       <div class="pull-left">设备ID:'+ item.id +'</div>' +
                       <div class="pull-right">
                           <div v-if="item.status == 0" class="btn btn-primary" > 正常 </div>
                           <div v-else="item.status == 0" class="btn btn-danger" > 异常 </div>
                       </div>
                    </div>
                </div>
            </i-card>
            <div class="area-box" v-show="areaElement.active" :style="{ left: `${areaElement.x}px` , top: `${areaElement.y}px` , width: `${areaElement.width}px` , height: `${areaElement.height}px`}"></div>
        </div>
    </div>

</template>
<script lang="ts">
  import { Component, Prop, Vue } from "nuxt-property-decorator";
  import $ from "jquery";
  import _ from "underscore";
  import uuid from "uuid/v1";
  import Design from "./lib/design.ts";

  @Component({
    components: {}
  })
  export default class GDesigner extends Vue {
    @Prop({ default: "all" }) direction;
    @Prop({
      default: () => {
        return [];
      }
    }) value;

    $design : any ;
    $areabox : any ;
    currentElement : any = { };
    currentElements : any = [];
    areaElement : any = {
      x : 0,
      y : 0,
      width : 0,
      height : 0 ,
    };

    design: any;
    row: number = 1;
    col: number = 1;
    type: number = 1;

    /*
        {
              x,
              y,
              name,
              direction,
              rotate,
              type ,
              hasTip ,
              target ,
              width,
              height ,
              background
        }
     */
    add( data : any = {  x : 0 , y : 0 , name : '' , rotate  : 0  , type : 0 , hasTip : false , target : null , width: 100 , height: 100 , background: null }) {
      data.id = data.id || uuid();
      data.x = data.x || 0;
      data.y = data.y || 0;
      this.value.push( data );
      return this;
    }

    remove( data : any = {} ){
      let val = _( this.value ).filter(( n )=>{
        return data.id != n.id
      })
      this.$emit("input" , val );
      return this;
    }

    elementContextmenu( e , item ){
      item.rotate = item.rotate + 90;
      this.value.push();
    }

    clear() {
      this.value = [];
      this.value.push();
      //this.design.empty();
      return this;
    }

    save() {
      this.design.save();
      return this;
    }

    create( row =  1 , col = 1 , data = {  x : 0 , y : 0 , name : '' , rotate  : 0  ,  width: 100 , height: 100  }  ){
      let width = data.width ;
      let height = data.height;
      for( let i = 0 ; i < row ; i ++ ){
        for( let j = 0 ; j < col ; j ++ ){
          let d = {...data};
          d.x = (j * (width + 1 )) ;
          d.y = (i * ( height + 1)) ;
          this.add( d );
        }
      }
      return this;
    }

    batch() {
      switch (this.type) {
        case 1:
          this.create(this.row, this.col);
          break;
      }
      return this;
    }

    isActive( elements : Array<any> = [] , id  ){
        for( let item of elements ){
           if( item['id'] == id ) return true ;
        }
        return false;
    }

    selectElementMouseDown( e  ){
        if( !$(e.target).hasClass('g-designer-element')  ){
            this.currentElements = [];
            this.areaElement.active = true ;
            this.areaElement.x = e.pageX  - this.$design.offset().left ;
            this.areaElement.y = e.pageY  - this.$design.offset().top ;
            this.areaElement.tempX = this.areaElement.x;
            this.areaElement.tempY = this.areaElement.y;
            this.areaElement.pageX = e.pageX;
            this.areaElement.pageY = e.pageY;
            this.areaElement.$areabox = this.$areabox;
            this.areaElement.tempWidth = this.areaElement.width;
            this.areaElement.tempHeight = this.areaElement.height;
        }
        return this;
    }
    selectElementMouseUp( e  ){

      return this;
    }
    selectElementMouseMove( e  ){

      return this;
    }
    getInElement( area ) {
      let result =  _(this.value).filter(( n )=>{
        if (
          n.x + n.width > area.x
          &&
          n.x < area.x + area.width
          &&
          n.y + n.height > area.y
          &&
          n.y < area.y + area.height
        ) {
          n.active = true ;
          return true;
        }
        else {
          n.active = false ;
          return false;
        }
      })
      return result;
    }

  /*  selectElement( e , item  ){
      this.currentElements = this.currentElements || [];
      let temp = item ;
      temp = item ;
      temp.pageX = e.pageX;
      temp.pageY = e.pageY;
      temp.tempWidth = item.width;
      temp.tempHeight = item.height;
      temp.tempX = item.x;
      temp.tempY = item.y;
      this.currentElements.push( temp );
      return this;
    }*/

    elementMouseDown(e , item , command ){
      e.stopPropagation();
      if( this.isActive( this.currentElements, item.id )){
        for( let item of this.currentElements ){
           item = this.getCurrentElement( item  , e );
         }
      }
      else{
        this.currentElements = [] ;
      }

      this.currentElement = this.getCurrentElement( item  , e  );
      this.currentElement.command = command;
      return this;
    }

    getCurrentElement( currentElement , e ){
      currentElement.on = true;
      currentElement.pageX = e.pageX;
      currentElement.pageY = e.pageY;
      currentElement.tempWidth = currentElement.width;
      currentElement.tempHeight = currentElement.height;
      currentElement.tempX = currentElement.x;
      currentElement.tempY = currentElement.y;
      return currentElement;
    }

    selectArea( e ){
      if( this.areaElement.active ){
        let offset = { left : this.areaElement.pageX , top : this.areaElement.pageY };

        if (e.pageX < offset.left ) {
          this.areaElement.x = this.areaElement.tempX + e.pageX - this.areaElement.pageX;
          this.areaElement.width = this.areaElement.tempWidth + Math.abs(e.pageX - this.areaElement.pageX);
        }

        if (e.pageY < offset.top ) {
          this.areaElement.y = this.areaElement.tempY + e.pageY - this.areaElement.pageY;
          this.areaElement.height = this.areaElement.tempHeight + Math.abs(e.pageY - this.areaElement.pageY);
        }

        if( e.pageY >= offset.top  || e.pageX > offset.left){
          this.areaElement.width = this.areaElement.tempWidth + Math.abs(e.pageX - this.areaElement.pageX);
          this.areaElement.height = this.areaElement.tempHeight + Math.abs(e.pageY - this.areaElement.pageY);
        }

        this.currentElements = this.getInElement( this.areaElement );
        // this.areaElement.width = e.pageX  - this.$design.offset().x ;
        // this.areaElement.height = e.pageY  - this.$design.offset().y ;
      }
    }

    mounted() {
      //this.design = new Design(".g-designer");

      this.$design = $('.g-designer-container');
      this.$areabox = $('.area-box', this.$el );

      for(let item of this.value ){
         item.id = item.id ? item.id : uuid();
      }

      $(document).off(`mouseup.gResizing mousemove.gResizing`)
        .on("mouseup.gResizing", (e)=> {
        this.currentElement = {};
        this.areaElement.active = false;
        this.areaElement.width = 0;
        this.areaElement.height = 0;
      }).on("mousemove.gResizing", (e)=> {
        this.selectArea(e);
        if( this.currentElements && this.currentElements.length){
          if( this.currentElement.id  ){
            for( let item of this.currentElements ){
               let x = e.pageX - item.pageX + item.tempX ;
               let y = e.pageY - item.pageY  + item.tempY ;
               item.x =  ( (x + item.width) > this.$design.width() || x < 0) ? item.x : x ;
               item.y = ( (y + item.height) > this.$design.height() || y < 0) ? item.y : y ;
            }
          }
        }
        else if( this.currentElement.id ){
          if( this.currentElement.command == 'move'){
            let x = e.pageX - this.currentElement.pageX + this.currentElement.tempX ;
            let y = e.pageY - this.currentElement.pageY  + this.currentElement.tempY ;
            this.currentElement.x =  ( (x + this.currentElement.width) > this.$design.width() || x < 0) ? this.currentElement.x : x ;
            this.currentElement.y = ( (y + this.currentElement.height) > this.$design.height() || y < 0) ? this.currentElement.y : y ;
          }
          else  if( this.currentElement.command == 'size'){
            let width = e.pageX - this.currentElement.pageX + this.currentElement.tempWidth ;
            let height = e.pageY - this.currentElement.pageY  + this.currentElement.tempHeight ;
            this.currentElement.width =  ( (width + this.currentElement.x ) > this.$design.width() || width < 50 ) ? this.currentElement.width : width ;
            this.currentElement.height = ( (height + this.currentElement.y ) > this.$design.height() || height < 50 ) ? this.currentElement.height : height ;
          }
        }
      });

    }
  }
</script>
<style lang="scss">
    @import "index.scss";
</style>
