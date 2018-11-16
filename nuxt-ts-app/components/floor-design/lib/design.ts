import $ from "jquery";
import  Draggable  from "../../drag-block/lib/draggable";

declare var window;
declare var document;

/**
 * 楼层设计器
 *
 * 背景必须为正方形图
 */
export default class Design {
  $design = $();
  $activeLayers = $();
  layerSize = {
    width: 100,
    height: 100
  };
  activePos = {
    pageX: 0,
    pageY: 0,
    x: 0,
    y: 0
  };
  options : any = {
    template :{},
    rotate : true,
    name : '',
    disabled : false,
  }
  constructor( selector = ".drag-design" , options? ) {
    let that = this;
    this.options = {  ...this.options , ...options } ;

    this.$design = $(selector);

    let layers = JSON.parse(localStorage.getItem("designData") || "[]");

    this.create(layers);

/*    $(".drag-elements").on("click", ".drag-layer", (e) => {
      that.add({ x: 0, y: 0, name: $(e.target).text() , background : 'https://icarusion.gitee.io/iview/e1cf12c07bf6458992569e67927d767e.png'});
    });*/
    if( this.options.disabled == false ){
      this.$design.on("contextmenu", (e) => {
        window.event.returnValue = false;
        if (e.button == 2) {
          e.preventDefault();
          let $target = $(e.target);
          if ($(e.target).hasClass("drag-layer") && that.options.rotate) {
            let rotate = ($target.data("rotate") || 0) + 90;
            $target.data("rotate", rotate)
              .find(".layer-content").css({
              "transform": "rotate(" + (rotate) + "deg)"
            });
          }
        }
        return false;
      });
      this.selectArea();
    }
    this.timeSave();
  }

  //放缩
  resize ( contentElement  ) {
    var _this = this;
    function f( contentElement , element ) {
      var $content = $(contentElement);
      var $element = $(element).hide();
      // !$content.data('size') && $content.data('size' , size );
      $content.css({
        '-webkit-transform':'scale('+ 1 +')',
        'transform':'scale('+ 1 +')',
        //'margin-top' : -(size.height - defaultSize.height)/ 2 - (resize.height - defaultSize.height)/ 3,
        'margin-left' : 0
      })

      var size = {
        width : $content.width(),
        height : $content.height()
      }
      var defaultSize = {
        width : $element.width(),
        height : $element.height()
      }

      var p = size.width / defaultSize.width;

      p = p > 1 ? 1 : p ;

      var resize = {
        width : defaultSize.width * p,
        height :  defaultSize.height * p,
      }
      $content.css({
        '-webkit-transform':'scale('+ p +')',
        'transform':'scale('+ p +')',
        //'margin-top' : -(size.height - defaultSize.height)/ 2 - (resize.height - defaultSize.height)/ 3,
        'margin-left' : (resize.width - defaultSize.width)/ 3
      })

      $element.show();
    }
    $(window).resize(function () {
      f( contentElement , _this.$design );
    });
    f(contentElement , this.$design );
    return this;
  }
  /**
   * 拖动元素选择
   * */
  selectArea() {
    let that = this;

    function getInElement() {
      // let layers = [];
      that.$design.find(".drag-layer").each((i, n) => {
        let el = {
          left: parseFloat($(n).css("left")),
          top: parseFloat($(n).css("top")),
          height: parseFloat($(n).css("height")),
          width: parseFloat($(n).css("width"))
        };

        let areaBox = {
          left: parseFloat($areaBox.css("left")),
          top: parseFloat($areaBox.css("top")),
          height: parseFloat($areaBox.css("height")),
          width: parseFloat($areaBox.css("width"))
        };
        if (
          el.left + el.width > areaBox.left
          &&
          el.left < areaBox.left + areaBox.width
          &&
          el.top + el.height > areaBox.top
          &&
          el.top < areaBox.top + areaBox.height
        ) {
          $(n).addClass("active");
        }
        else {
          $(n).removeClass("active");
        }
      });
    }

    let $areaBox = $("<div class=\"area-box\"></div>");

    this.$design.on("mousedown", (e) => {
      let $target = $(e.target);
      this.clearAllActive();
      if (!$target.hasClass("drag-layer")) {
        let left = e.pageX - this.$design.offset().left;
        let top = e.pageY - this.$design.offset().top;
        $areaBox.data("mouseon", true).appendTo(this.$design).css({
          left,
          top
        }).data("position", {
          x: e.pageX,
          y: e.pageY,
          left,
          top
        });
      }
      else {

      }
    }).on("mouseup", (e) => {
      $areaBox.data("mouseon", false);
      $areaBox.remove();
    }).on("mousemove", (e) => {
      let that = this;
      if ($areaBox.data("mouseon") == true) {
        let pos = $areaBox.data("position");

        if (e.pageX < pos.x || e.pageY < pos.y) {
          if (e.pageX < pos.x) {
            $areaBox.css({
              left: pos.left + e.pageX - pos.x,
              width: Math.abs(e.pageX - pos.x)
            });
          }
          if (e.pageY < pos.y) {
            $areaBox.css({
              top: pos.top + e.pageY - pos.y,
              height: Math.abs(e.pageY - pos.y)
            });
          }

        }
        else {
          $areaBox.css({
            width: e.pageX - pos.x,
            height: e.pageY - pos.y
          });
        }


        getInElement();
      }

      if (this.$activeLayers.hasClass("active")) {
        let offset = {
          x: (e.pageX - that.activePos.pageX) || 0,
          y: (e.pageY - that.activePos.pageY) || 0
        };
        this.$activeLayers.each(function() {
          let pos = $(this).data("activePosition") || 0;
          $(this).css({
            left: pos.x + offset.x,
            top: pos.y + offset.y
          });
        });
      }
    });
    return this;
  }

  template( options ){
    return  $.extend({} , {
      image:  '',
      name : '' ,
      direction: "down",
      rotate: 0,
      width: 75,
      height: 100,
      type : 1,
      status: 0,
      id : 0
    } , options );
  }

  createTemplateList( row , col , options ){
    let layer = this.template( options );
    let layers = [];
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        layer.x += layer.width;
        layer.y += layer.height;
        layers.push(layer);
      }
    }
    return this.create( layers );
  }
  /**
   * 清空
   * */
  empty() {
    this.$design.empty();
    return this;
  }
  /**
   * 创建元素
   * @layer array []
   *
   * */
  create(layers) {
    for (let o of layers) {
      this.add(o);
    }
    return this;
  }
  /**
   * 定时保存
   * */
  timeSave() {
    let that = this;
    setInterval(() => {
      that.save();
    }, 10 * 1000 * 60);
    return this;
  }
  /**
   * 增加元素
   * @prop { name , x , y , direction , width , height , rotate  }
   * */
  add(prop) {
    let that = this;
    let $el = new DesignElement(this.$design, {
      dragStart: (x, y, e) => {
        this.activePos = {
          pageX: e.pageX,
          pageY: e.pageY,
          x: x,
          y: y
        };
        let $target = $(e.target);
        if ($target.hasClass("active")) {
          this.$activeLayers = this.$design.find(".active").not($target).each(function() {
            $(this).data("activePosition", {
              x: parseFloat($(this).css("left")),
              y: parseFloat($(this).css("top"))
            });
          });
        }
      },
      dragEnd(x, y, e) {
        if ($(e.target).hasClass("active")) {
          that.clearAllActive();
        }
      },
      ...this.options,
    }).$;
    this.setLayer($el, prop);
    $el.appendTo(this.$design);
    return this;
  }

  /**
   * 清除选择
   */
  clearAllActive() {
    this.$design.find(".drag-layer").removeData("activePosition").removeClass("active");
    return this;
  }

  /**
   * 删除元素
   * @param elem
   */
  remove(elem) {
    elem.remove();
    return this;
  }


  getDirection(rotate) {
    if (rotate % 360 == 0) {
      return "南";
    }
    else if (rotate % 270 == 0) {
      return "东";
    }
    else if (rotate % 180 == 0) {
      return "北";
    }
    else if (rotate % 90 == 0) {
      return "西";
    }
  }

  getLayer($el) {
    return {
      x: parseFloat($el.css("left")),
      y: parseFloat($el.css("top")),
      name: $el.find(".layer-info").text(),
      direction: this.getDirection($el.data("rotate")),
      rotate: $el.data("rotate"),
      width: $el.width(),
      height: $el.height(),
      background : $el.find('.layer-content').css('background-image').replace('url(','').replace(')','')
    };
  }

  setLayer($el, data) {
    $el.css({
      left: data.x,
      top: data.y,
      width: data.width,
      height: data.height
    }).data("rotate", data.rotate)
    .find(".layer-content").css('background-image' , 'url('+ data.background +')').css({transform: "rotate(" + data.rotate + "deg)" })
      .end().find(".layer-info").html(data.name)
    return this;
  }

  /**
   * 获取当前数据
   */
  getData(){
    let layers: any = [];
    this.$design.find(".drag-layer").each((i, n) => {
      let $el = $(n);
      layers.push(this.getLayer($el));
    });
    return layers;
  }

  /**
   * 保存
   */
  save() {
    localStorage.setItem("designData", JSON.stringify(this.getData()));
    return this;
  }
}
/**
 * 拖动元素
 * */
class DesignElement {
  $ = $();
  constructor($design:any, dragOptions:any) {

    this.$ = $("<div class=\"drag-layer\" >" +
      "<span class='layer-content'></span>" +
      "<span class='layer-info'></span>" +
      ( dragOptions.disabled == true ? '': '<i class=\"ivu-icon ivu-icon-ios-trash\"></i>') +
      ( dragOptions.disabled == true ? '': '<em class=\"drop-size\"></em>') +
      "</div>").appendTo($design);

    if(dragOptions.disabled == false){
      new Draggable(this.$,dragOptions);
    }

    this.$.find(".drop-size").on("mousedown", function(e) {
      let $dragLayer = $(this).closest(".drag-layer");
      $dragLayer.addClass("resizing").data("resizePosition", {
        x: e.pageX,
        y: e.pageY,
        width: parseFloat($dragLayer.width()),
        height: parseFloat($dragLayer.height())
      });
    });

    $(document).off("mouseup.resizing").on("mouseup.resizing", function(e) {
      $(".resizing").removeClass("resizing");
    })
      .off("mousemove.resizing").on("mousemove", function(e) {
      if ($(".resizing").length) {
        let $layer = $(".resizing");
        let pos = $layer.data("resizePosition");
        if ($layer.hasClass("resizing")) {
          $layer.css({
            width: pos.width + e.pageX - pos.x,
            height: pos.height + e.pageY - pos.y
          });
        }
      }
    });
    this.$.find("i").click(() => {
      this.$.remove();
    });

    this.forbidInideDrag();
  }

  /**
   * 禁止内部元素拖动
   */
  forbidInideDrag(){
    this.$.find('*').not('img').mousedown(function (e) {
      e.stopPropagation();
    });
  }
}


