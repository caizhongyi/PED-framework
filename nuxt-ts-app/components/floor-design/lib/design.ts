import $ from "jquery";
import  Draggable  from "../../drag-block/lib/draggable";

declare var window;
declare var document;

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

  constructor() {
    let that = this;
    this.$design = $(".drag-design");

    let layers = JSON.parse(localStorage.getItem("designData") || "[]");

    this.create(layers);

    $(".drag-elements").on("click", ".drag-layer", (e) => {
      that.add({ x: 0, y: 0, name: $(e.target).text() });
    });

    this.$design.on("contextmenu", (e) => {
      window.event.returnValue = false;
      if (e.button == 2) {
        e.preventDefault();
        let $target = $(e.target);
        if ($(e.target).hasClass("drag-layer")) {
          let rotate = ($target.data("rotate") || 0) + 90;
          $target.data("rotate", rotate).find("span").css({ "transform": "rotate(" + (rotate) + "deg)" });
        }
      }
      return false;
    });

    this.selectArea();
    this.timeSave();
  }

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

  createL(row, col) {
    let layers = [{ "x": 154, "y": 50, "name": "房间 " }, { "x": 372, "y": 54, "name": "房间 " }, {
      "x": 262,
      "y": 52,
      "name": "房间 "
    }, { "x": 480, "y": 55, "name": "房间 " }];
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        layers.push({
          x: i * this.layerSize.width,
          y: j * this.layerSize.height,
          name: "房间"
        });
      }
    }
    this.create(layers);
    return this;
  }

  createR(row, col) {
    let layers: any = [];
    for (let i = 0; i < row; i++) {/**/
      for (let j = 0; j < col; j++) {
        let item = {
          x: 50 + i * this.layerSize.width,
          y: 50 + j * this.layerSize.height,
          name: "房间"
        };
        layers.push(item);
      }
    }
    this.create(layers);
    return this;
  }

  createU(row, col) {
    let layers = [{ "x": 154, "y": 50, "name": "房间 " }, { "x": 372, "y": 54, "name": "房间 " }, {
      "x": 262,
      "y": 52,
      "name": "房间 "
    }, { "x": 480, "y": 55, "name": "房间 " }];
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {

      }
    }
    this.create(layers);
    return this;
  }

  empty() {
    this.$design.empty();
    return this;
  }

  create(layers) {
    for (let o of layers) {
      this.add(o);
    }
    return this;
  }

  timeSave() {
    let that = this;
    setInterval(() => {
      that.save();
    }, 10 * 1000 * 60);
    return this;
  }

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
      }
    }).$;
    this.setLayer($el, prop);
    $el.appendTo(this.$design);
    return this;
  }

  clearAllActive() {
    this.$design.find(".drag-layer").removeData("activePosition").removeClass("active");
    return this;
  }

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
      name: $el.find("span").text(),
      direction: this.getDirection($el.data("rotate")),
      rotate: $el.data("rotate"),
      width: $el.width(),
      height: $el.height()
    };
  }

  setLayer($el, data) {
    $el.css({
      left: data.x,
      top: data.y,
      width: data.width,
      height: data.height
    }).find("span").html(data.name).css({
      transform: "rotate(" + data.rotate + "deg)"
    }).data("rotate", data.rotate);
    return this;
  }

  save() {
    let layers: any = [];
    this.$design.find(".drag-layer").each((i, n) => {
      let $el = $(n);
      layers.push(this.getLayer($el));
    });
    localStorage.setItem("designData", JSON.stringify(layers));
    return this;
  }
}

export class DesignElement {
  $ = $();

  constructor($design, dragOptions) {
    this.$ = $("<div class=\"drag-layer\" ><span></span><i class=\"fa fa-bitbucket\"></i><em class=\"drop-size\"></em></div>").appendTo($design);

    new Draggable(this.$,dragOptions);
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
  }
}

/*
$("#red").treeview({
    animated: "fast",
    collapsed: true,
    unique: true,
    persist: "cookie",
    toggle: function() {
        window.console && console.log("%o was toggled", this);
    }
});*/
