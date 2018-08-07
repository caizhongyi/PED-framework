import $ from "jquery";

export  default  class Draggable {
  direction = 'all';
  options = {
    dragStart(x?, y? , e? ){},
    dragEnd(x?, y? , e? ){},
    dragMove(x?, y? , e? ){},
  }
  constructor( $el , options? ) {
    let _this = this;
    this.options = { ...this.options , ...options};
    // 阻止冒泡
    $($el).find('*').not('img').mousedown(function (e) {
      e.stopPropagation();
    });

    $($el).css({ cursor: "move" }).mousedown(function(e) {
      let element = $(this).addClass("dragging on");
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
    $(document).off("mouseup.drag").on("mouseup.drag", function(e) {
      let element = $(".dragging");
      _this.options.dragEnd(parseInt(element.css('left')), parseInt(element.css('top')), e);
      element.removeClass("on dragging");
      element.data("isDown", false);
    });
    $(document).off("mousemove.drag").on("mousemove.drag", function(e) {
      let element = $(".dragging");
      let page = element.data("page") || {};
      let position = element.data("position") || {};
      let moveX = position.x + e.pageX - page.x;
      let moveY = position.y + e.pageY - page.y;
      let isDown = element.hasClass("dragging");
      let boxWidth = element.parent().width();
      let boxHeight = element.parent().height();
      let sonWidth = element.width();
      let sonHeight = element.height();


      function thisXMove() { //x轴移动
        if (isDown == true) {
          element.css({ left: moveX });
        } else {
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

      function thisYMove() { //y轴移动
        if (isDown == true) {
          element.css({ top: moveY });
        } else {
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

      function thisAllMove() { //全部移动
        if (isDown == true) {
          element.css({ left: moveX, top: moveY });
        } else {
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
        _this.options.dragMove(parseInt(element.css('left')), parseInt(element.css('top')),e);
        if (_this.direction.toLowerCase() == "x") {
          thisXMove();
        } else if (_this.direction.toLowerCase() == "y") {
          thisYMove();
        } else {
          thisAllMove();
        }
      } else {
      }
    });
  }
}