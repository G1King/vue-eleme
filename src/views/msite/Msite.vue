<template>
    <div>
        <Header>
            <router-link :to="'/search/geohash'" class="link_search" slot="search">
               <icon-svg iconClass="sousuo"/>
    		</router-link>
        </Header>
    </div>
</template>
<script>
import Header from '@c/header/Header'
export default {
    components:{
        Header
    }
}
</script>

<style lang="scss" scoped>
.link_search{
		left: .8rem;
		@include wh(.9rem, .9rem);
		@include ct;
	}
</style>
