<template>
  <div v-show="showTabBar" class="tabbar-box">
    <cube-tab-bar
      v-model="selectedLabelDefault"
      :data="tabs"
      @change="clickHandler"
    >
    </cube-tab-bar>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    showTabBar: {
      type: String
    }
  },
  data() {
    return {
      selectedLabelDefault: '外卖',
      tabs: [{
        label: '外卖',
        icon: 'cubeic-home'
      }, {
        label: '搜索',
        icon: 'cubeic-like'
      }, {
        label: '订单',
        icon: 'cubeic-vip'
      }, {
        label: '我的',
        icon: 'cubeic-person'
      }]
    }
  },
  computed: {
    ...mapState(['geohash']),
    path() {
      if (this.selectedLabelDefault === '外卖') {
        return { path: '/msite', query: { hash: this.geohash }}
      } else if (this.selectedLabelDefault === '搜索') {
        return { path: '/search' }
      } else if (this.selectedLabelDefault === '订单') {
        return { path: '/order' }
      } else {
        return { path: '/profile' }
      }
    }
  },
  mounted() {
    console.log('子组件挂载')
  },

  methods: {
    clickHandler(label) {
      console.log(label)
      this.selectedLabelDefault = label
      this.$router.push(this.path)
    }
  }
}
</script>
<style>
.cube-tab div{
    font-size: .6rem;
}
.cube-tab_active{
    color: #3190e8;
}
</style>

<style lang="scss" scoped>
.tabbar-box{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 1.95rem;
    background-color: #fff;
    z-index: 1111;

}
</style>
