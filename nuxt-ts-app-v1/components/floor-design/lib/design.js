import $ from "jquery";
import Draggable from "../../drag-block/lib/draggable";
var Design = (function () {
    function Design() {
        this.$design = $();
        this.$activeLayers = $();
        this.layerSize = {
            width: 100,
            height: 100
        };
        this.activePos = {
            pageX: 0,
            pageY: 0,
            x: 0,
            y: 0
        };
        var that = this;
        this.$design = $(".drag-design");
        var layers = JSON.parse(localStorage.getItem("designData") || "[]");
        this.create(layers);
        $(".drag-elements").on("click", ".drag-layer", function (e) {
            that.add({ x: 0, y: 0, name: $(e.target).text() });
        });
        this.$design.on("contextmenu", function (e) {
            window.event.returnValue = false;
            if (e.button == 2) {
                e.preventDefault();
                var $target = $(e.target);
                if ($(e.target).hasClass("drag-layer")) {
                    var rotate = ($target.data("rotate") || 0) + 90;
                    $target.data("rotate", rotate).find("span").css({ "transform": "rotate(" + (rotate) + "deg)" });
                }
            }
            return false;
        });
        this.selectArea();
        this.timeSave();
    }
    Design.prototype.selectArea = function () {
        var _this = this;
        var that = this;
        function getInElement() {
            that.$design.find(".drag-layer").each(function (i, n) {
                var el = {
                    left: parseFloat($(n).css("left")),
                    top: parseFloat($(n).css("top")),
                    height: parseFloat($(n).css("height")),
                    width: parseFloat($(n).css("width"))
                };
                var areaBox = {
                    left: parseFloat($areaBox.css("left")),
                    top: parseFloat($areaBox.css("top")),
                    height: parseFloat($areaBox.css("height")),
                    width: parseFloat($areaBox.css("width"))
                };
                if (el.left + el.width > areaBox.left
                    &&
                        el.left < areaBox.left + areaBox.width
                    &&
                        el.top + el.height > areaBox.top
                    &&
                        el.top < areaBox.top + areaBox.height) {
                    $(n).addClass("active");
                }
                else {
                    $(n).removeClass("active");
                }
            });
        }
        var $areaBox = $("<div class=\"area-box\"></div>");
        this.$design.on("mousedown", function (e) {
            var $target = $(e.target);
            _this.clearAllActive();
            if (!$target.hasClass("drag-layer")) {
                var left = e.pageX - _this.$design.offset().left;
                var top_1 = e.pageY - _this.$design.offset().top;
                $areaBox.data("mouseon", true).appendTo(_this.$design).css({
                    left: left,
                    top: top_1
                }).data("position", {
                    x: e.pageX,
                    y: e.pageY,
                    left: left,
                    top: top_1
                });
            }
            else {
            }
        }).on("mouseup", function (e) {
            $areaBox.data("mouseon", false);
            $areaBox.remove();
        }).on("mousemove", function (e) {
            var that = _this;
            if ($areaBox.data("mouseon") == true) {
                var pos = $areaBox.data("position");
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
            if (_this.$activeLayers.hasClass("active")) {
                var offset_1 = {
                    x: (e.pageX - that.activePos.pageX) || 0,
                    y: (e.pageY - that.activePos.pageY) || 0
                };
                _this.$activeLayers.each(function () {
                    var pos = $(this).data("activePosition") || 0;
                    $(this).css({
                        left: pos.x + offset_1.x,
                        top: pos.y + offset_1.y
                    });
                });
            }
        });
        return this;
    };
    Design.prototype.createL = function (row, col) {
        var layers = [{ "x": 154, "y": 50, "name": "房间 " }, { "x": 372, "y": 54, "name": "房间 " }, {
                "x": 262,
                "y": 52,
                "name": "房间 "
            }, { "x": 480, "y": 55, "name": "房间 " }];
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                layers.push({
                    x: i * this.layerSize.width,
                    y: j * this.layerSize.height,
                    name: "房间"
                });
            }
        }
        this.create(layers);
        return this;
    };
    Design.prototype.createR = function (row, col) {
        var layers = [];
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                var item = {
                    x: 50 + j * this.layerSize.width,
                    y: 50 + i * this.layerSize.height,
                    name: "房间"
                };
                layers.push(item);
            }
        }
        this.create(layers);
        return this;
    };
    Design.prototype.createU = function (row, col) {
        var layers = [{ "x": 154, "y": 50, "name": "房间 " }, { "x": 372, "y": 54, "name": "房间 " }, {
                "x": 262,
                "y": 52,
                "name": "房间 "
            }, { "x": 480, "y": 55, "name": "房间 " }];
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
            }
        }
        this.create(layers);
        return this;
    };
    Design.prototype.empty = function () {
        this.$design.empty();
        return this;
    };
    Design.prototype.create = function (layers) {
        for (var _i = 0, layers_1 = layers; _i < layers_1.length; _i++) {
            var o = layers_1[_i];
            this.add(o);
        }
        return this;
    };
    Design.prototype.timeSave = function () {
        var that = this;
        setInterval(function () {
            that.save();
        }, 10 * 1000 * 60);
        return this;
    };
    Design.prototype.add = function (prop) {
        var _this = this;
        var that = this;
        var $el = new DesignElement(this.$design, {
            dragStart: function (x, y, e) {
                _this.activePos = {
                    pageX: e.pageX,
                    pageY: e.pageY,
                    x: x,
                    y: y
                };
                var $target = $(e.target);
                if ($target.hasClass("active")) {
                    _this.$activeLayers = _this.$design.find(".active").not($target).each(function () {
                        $(this).data("activePosition", {
                            x: parseFloat($(this).css("left")),
                            y: parseFloat($(this).css("top"))
                        });
                    });
                }
            },
            dragEnd: function (x, y, e) {
                if ($(e.target).hasClass("active")) {
                    that.clearAllActive();
                }
            }
        }).$;
        this.setLayer($el, prop);
        $el.appendTo(this.$design);
        return this;
    };
    Design.prototype.clearAllActive = function () {
        this.$design.find(".drag-layer").removeData("activePosition").removeClass("active");
        return this;
    };
    Design.prototype.remove = function (elem) {
        elem.remove();
        return this;
    };
    Design.prototype.getDirection = function (rotate) {
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
    };
    Design.prototype.getLayer = function ($el) {
        return {
            x: parseFloat($el.css("left")),
            y: parseFloat($el.css("top")),
            name: $el.find("span").text(),
            direction: this.getDirection($el.data("rotate")),
            rotate: $el.data("rotate"),
            width: $el.width(),
            height: $el.height()
        };
    };
    Design.prototype.setLayer = function ($el, data) {
        $el.css({
            left: data.x,
            top: data.y,
            width: data.width,
            height: data.height
        }).find("span").html(data.name).css({
            transform: "rotate(" + data.rotate + "deg)"
        }).data("rotate", data.rotate);
        return this;
    };
    Design.prototype.getData = function () {
        var _this = this;
        var layers = [];
        this.$design.find(".drag-layer").each(function (i, n) {
            var $el = $(n);
            layers.push(_this.getLayer($el));
        });
        return layers;
    };
    Design.prototype.save = function () {
        localStorage.setItem("designData", JSON.stringify(this.getData()));
        return this;
    };
    return Design;
}());
export default Design;
var DesignElement = (function () {
    function DesignElement($design, dragOptions) {
        var _this = this;
        this.$ = $();
        this.$ = $("<div class=\"drag-layer\" ><span></span><i class=\"ivu-icon ivu-icon-ios-trash\"></i><em class=\"drop-size\"></em></div>").appendTo($design);
        new Draggable(this.$, dragOptions);
        this.$.find(".drop-size").on("mousedown", function (e) {
            var $dragLayer = $(this).closest(".drag-layer");
            $dragLayer.addClass("resizing").data("resizePosition", {
                x: e.pageX,
                y: e.pageY,
                width: parseFloat($dragLayer.width()),
                height: parseFloat($dragLayer.height())
            });
        });
        $(document).off("mouseup.resizing").on("mouseup.resizing", function (e) {
            $(".resizing").removeClass("resizing");
        })
            .off("mousemove.resizing").on("mousemove", function (e) {
            if ($(".resizing").length) {
                var $layer = $(".resizing");
                var pos = $layer.data("resizePosition");
                if ($layer.hasClass("resizing")) {
                    $layer.css({
                        width: pos.width + e.pageX - pos.x,
                        height: pos.height + e.pageY - pos.y
                    });
                }
            }
        });
        this.$.find("i").click(function () {
            _this.$.remove();
        });
        this.forbidInideDrag();
    }
    DesignElement.prototype.forbidInideDrag = function () {
        this.$.find('*').not('img').mousedown(function (e) {
            e.stopPropagation();
        });
    };
    return DesignElement;
}());
export { DesignElement };
