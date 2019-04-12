<template>
<div>
    <transition name="fade" mode="out-in">
        <router-view  v-if="!this.$route.meta.keepAlive"/>
    </transition>
    <transition name="fade" mode="out-in">
        <keep-alive>
        <router-view v-if="this.$route.meta.keepAlive" />
        </keep-alive>
    </transition>
</div>
</template>

<script>
export default {

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
