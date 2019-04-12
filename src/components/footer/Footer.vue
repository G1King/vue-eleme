<template>
   <div class="tabbar-box">
       <cube-tab-bar
    v-model="selectedLabelDefault"
    :data="tabs"
    @click="clickHandler">
  </cube-tab-bar>
   </div>
</template>
<script>
export default {
    data() {
        return {
             selectedLabelDefault: 'Vip',
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
    methods: {
        clickHandler (label) {
      console.log(label)
    }
    },
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
