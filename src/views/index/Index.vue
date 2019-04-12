<template>
  <div class="home">
   <Header signinUp='home'>
     <span slot="logo" @click="reloadPage" class="head_logo">ele.me</span>
   </Header>
    <nav class="currentCity-wrap">
   <div>
        <span class="cc-descp"></span>
      <span class="cc-sub-descp"></span>
   </div>
    <router-link to='/path'>
     <span>北京</span>
      <svg class="arrow_right">
         <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
    </router-link>
    </nav>
     

  </div>
</template>

<script>
import Header from '@c/header/Header'
export default {
  name: 'home',
  data() {
    return {
     
    }
  },
  components:{
    Header
  },
  methods: {
    reloadPage(){
      window.location.reload();
    }
  },
};
</script>
<style lang="scss" scoped>
.home{
  .head_logo{
    margin-left: .3rem;
    color:#fff;
    font-size: .6rem;
  }
  .currentCity-wrap{
    padding-top: 2.3rem;
  }
  .arrow_right{
    @include wh(.6rem,.6rem);
    fill: #999;
  }
}
</style>
