var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import $ from "jquery";
var Draggable = (function () {
    function Draggable($el, options) {
        this.direction = 'all';
        this.options = {
            dragStart: function (x, y, e) { },
            dragEnd: function (x, y, e) { },
            dragMove: function (x, y, e) { },
        };
        var _this = this;
        this.options = __assign({}, this.options, options);
        var $element = $($el);
        $element.css({ cursor: "move" }).mousedown(function (e) {
            var element = $(this).addClass("dragging on");
            element.data("page", {
                x: e.pageX,
                y: e.pageY
            });
            element.data("position", {
                x: element.position().left,
                y: element.position().top
            });
            _this.options.dragStart(parseInt(element.css('left')), parseInt(element.css('top')), e);
            return false;
        });
        $(document).off("mouseup.drag").on("mouseup.drag", function (e) {
            var element = $(".dragging");
            _this.options.dragEnd(parseInt(element.css('left')), parseInt(element.css('top')), e);
            element.removeClass("on dragging");
            element.data("isDown", false);
        });
        $(document).off("mousemove.drag").on("mousemove.drag", function (e) {
            var element = $(".dragging");
            var page = element.data("page") || {};
            var position = element.data("position") || {};
            var moveX = position.x + e.pageX - page.x;
            var moveY = position.y + e.pageY - page.y;
            var isDown = element.hasClass("dragging");
            var boxWidth = element.parent().width();
            var boxHeight = element.parent().height();
            var sonWidth = element.width();
            var sonHeight = element.height();
            function thisXMove() {
                if (isDown == true) {
                    element.css({ left: moveX });
                }
                else {
                    return;
                }
                if (moveX < 0) {
                    element.css({ left: 0 });
                }
                if (moveX > (boxWidth - sonWidth)) {
                    element.css({ left: boxWidth - sonWidth });
                }
                return moveX;
            }
            function thisYMove() {
                if (isDown == true) {
                    element.css({ top: moveY });
                }
                else {
                    return;
                }
                if (moveY < 0) {
                    element.css({ top: 0 });
                }
                if (moveY > (boxHeight - sonHeight)) {
                    element.css({ top: boxHeight - sonHeight });
                }
                return moveY;
            }
            function thisAllMove() {
                if (isDown == true) {
                    element.css({ left: moveX, top: moveY });
                }
                else {
                    return;
                }
                if (moveX < 0) {
                    element.css({ left: 0 });
                }
                if (moveX > (boxWidth - sonWidth)) {
                    element.css({ left: boxWidth - sonWidth });
                }
                if (moveY < 0) {
                    element.css({ top: 0 });
                }
                if (moveY > (boxHeight - sonHeight)) {
                    element.css({ top: boxHeight - sonHeight });
                }
            }
            if (isDown) {
                _this.options.dragMove(parseInt(element.css('left')), parseInt(element.css('top')), e);
                if (_this.direction.toLowerCase() == "x") {
                    thisXMove();
                }
                else if (_this.direction.toLowerCase() == "y") {
                    thisYMove();
                }
                else {
                    thisAllMove();
                }
            }
            else {
            }
        });
    }
    return Draggable;
}());
export default Draggable;
