<template>
  <div class="m-menu">
    <dl class="nav" 
      @mouseleave="leave"
    >
      <dt>全部分类</dt>
      <dd v-for="(item, idx) in menu" :key="idx" @mouseenter="enter">
        <i :class="item.type" />{{item.name}}<span class="arrow"></span>
      </dd>
    </dl>
    <div 
      class="detail" 
      v-if="kind"
      @mouseenter="sover"
      @mouseleave="sout"
    >
      <template v-for="(item, idx) in curdetail.child">
        <h4 :key="idx">{{item.title}}</h4>
        <span v-for="v in item.child" :key="v">{{v}}</span>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        kind: '',
        menu: [{
          type: 'food',
          name: '美食',
          child: [{
            title: '外卖',
            child: ['美团外卖']
          }]
        }, {
          type: 'hotel',
          name: '酒店',
          child: [{
            title: '酒店星级',
            child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
          }]
        }, {
          type: 'food',
          name: '美食',
          child: [{
            title: '当地美食',
            child: ['烤鸭', '小龙虾', '卤煮', '豆汁']
          }]
        }]
      }
    },
    computed: {
      curdetail: function() {
        return this.menu.filter(item => item.type === this.kind)[0]
      }
    },
    methods: {
      leave() {
        let self = this
        self._timer = setTimeout(() => {
          self.kind = ''
        },150)
      },
      enter(e) {
        this.kind = e.target.querySelector('i').className
      },
      sover() {
        clearTimeout(this._timer)
      },
      sout() {
        this.kind = ''
      }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/css/index/index.scss';
</style>


