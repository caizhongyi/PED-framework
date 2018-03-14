<template>
    <div class="marquee">
        <ul class="marquee-list" :class="{ 'marquee-vertical' : options.direction == 'vertical'  }">
            <li v-for="o in data"><a href="javascript:void(0)">{{ data.name }}</a></li>
        </ul>
    </div>
</template>

<script lang="ts" >
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import $ from 'jquery'

  @Component({
    props: {
      data: Array,
      options: Object
    }
  })

  export default class Marquee extends Vue {
    settings = {interval: 100, direction: 'horizontal'}

    beforeRouteEnter () {
      // console.log('beforeRouteEnter')
    }

    beforeRouteLeave () {
      // console.log('beforeRouteLeave')
    }

    /* get random () {
      return Math.random()
    } */
    mounted () {
      this.settings = { ...this.options }
      return $(this).css('overflow', 'hidden').each(function () {
        let list = $(this).find('.marquee-list')
        let timer
        let isvertical = $(this).hasClass('marquee-vertical') || $(this).hasClass('vertical')
        let offset = isvertical ? list.children().outerHeight() : list.children().outerWidth()
        let self = this

        $(this).off('mouseenter.marquee mouseleave.marquee start stop')
          .on('mouseenter.marquee', function () {
            //   $(this).trigger('stop')
          })
          .on('mouseleave.marquee', function () {
            //     $(this).trigger('start')
          })
          .on('start', function () {
            timer = setInterval(function () {
              var items = list.children()
              if (isvertical) {
                if (items.length * offset <= $(self).height()) return
                $(list).stop(true).animate({'margin-top': -offset}, 1000, function () {
                  $(this).children().first().insertAfter($(this).children().last())
                  $(this).css('margin-top', 0)
                })
              } else {
                if (items.length * offset <= $(self).width()) return
                var $list = $(list).css({'margin-left': -(offset += 10)})
                if (offset >= list.children().outerWidth() * 2) {
                  $list.children().first().insertAfter($list.children().last())
                  $list.css('margin-left', 0)
                  offset = list.children().outerWidth()
                }
              }
            }, $(this).data('interval') || this.settings.interval)
          })
          .on('stop', () => clearInterval(timer))
          .trigger('start')
      })
    }
  }
</script>

<style lang="stylus" scoped>
    .marquee, .marquee-list {
        overflow: hidden;
    }

    .marquee {
        width: 400px;
        margin: 0 auto;
    }

    .marquee-list {
        width: 1000%;
        height: auto !important;
    }

    .marquee li {
        float: left;
        width: 100px;
    }

    .marquee-vertical, .marquee.vertical {
        overflow: hidden;
        height: 25px;
        width: auto;
    }

    .marquee-vertical li, .marquee.vertical li {
        float: none;
        width: auto;
    }

    .marquee-vertical .marquee-list, .marquee.vertical .marquee-list {
        width: auto;
    }
</style>