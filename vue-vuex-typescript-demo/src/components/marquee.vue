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

  interface Options {
    interval : number,
    direction : string,
  }

  @Component({})

  export default class Marquee extends Vue {
    options : any
    settings = { interval: 100, direction: 'horizontal' }

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
      let me: any = this
      return $(this).css('overflow', 'hidden').each(function (i,n) {
        let $this: any = $(n)
        let list = $this.find('.marquee-list')
        let timer: any
        let isvertical = $this.hasClass('marquee-vertical') || $this.hasClass('vertical')
        let offset = isvertical ? list.children().outerHeight() : list.children().outerWidth()
        let interval = $this.data('interval') || me.settings.interval

        $(this).off('mouseenter.marquee mouseleave.marquee start stop')
          .on('mouseenter.marquee', function () {
            //   $(this).trigger('stop')
          })
          .on('mouseleave.marquee', function () {
            //     $(this).trigger('start')
          })
          .on('start', function () {
            timer = setInterval(() => {
              var items = list.children()
              if (isvertical) {
                if (items.length * offset <= $this.height()) return
                let $list = $(list).stop(true).animate({'margin-top': -offset}, 1000, () => {
                  let $this: any = $list
                  $this.children().first().insertAfter($(this).children().last())
                  $this.css('margin-top', 0)
                })
              } else {
                if (items.length * offset <= $this.width()) return
                var $list = $(list).css({'margin-left': -(offset += 10)})
                if (offset >= list.children().outerWidth() * 2) {
                  $list.children().first().insertAfter($list.children().last())
                  $list.css('margin-left', 0)
                  offset = list.children().outerWidth()
                }
              }
            }, interval)
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
