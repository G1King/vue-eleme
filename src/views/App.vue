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
    <footer-bar :showTabBar="showTabBar"/>
</div>
</template>

<script>
import FooterBar from '@c/footer/Footer'
import _ from 'lodash'
export default {
    data() {
        return {
            showTabBar:''
        }
    },
components:{
    FooterBar
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
