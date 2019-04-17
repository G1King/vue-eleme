<template>
<div>
    <transition name="fade" mode="out-in">
        <router-view  v-if="!this.$route.meta.keepAlive"/>
    </transition>
    <transition name="fade" mode="out-in">
        <keep-alive>
        <router-view v-if="this.$route.meta.keepAlive" />
        </keep-alive>
    </transition >
    <Footer :showTabBar="showTabBar"/>
</div>
</template>

<script>
import Footer from '@c/footer/Footer'
export default {
    data() {
        return {
            showTabBar:''
        }
    },
components:{
    Footer
},
watch: {
    "$route":function(n){
        
        if(n.meta.showTabBar){
             this.showTabBar = 'show';
        }else {
 this.showTabBar = '';
        }
    }
},
}
</script>

<style lang="scss">
.fade-enter-active .fade-leave-active{
transition: opacity .3s;
}

	.fade-enter, .fade-leave-active {
	  	opacity: 0;
	}
</style>
