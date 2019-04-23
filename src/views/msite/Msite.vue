<template>
    <div>
        <header-top>
            <router-link :to="'/search'" class="link_search" slot="search">
               <Icon-svg iconClass="sousuo"/>
    		</router-link>

            <router-link to="/index"  slot="msite-title" class="msite_title">
                <span class="title_text">{{currentMsiteName}}</span>
            </router-link>
        </header-top>
       <nav>
      <div class="swiper-container">
          
      </div>
       </nav>
    </div>
</template>
<script>
import Header from '@c/header/Header'
import {Get_cityGuess,Get_msiteAddress} from '@/serve/api'
import {mapMutations} from 'vuex'
import {
  SAVE_GEOHASH,
  RECORD_ADDRESS
} from '@/store/mutations.type.js';
import '@/assets/swiper/swiper.min.js'
import '@/assets/swiper/swiper.min.css'
export default {
    data() {
        return {
            currentMsiteName:'请输入页面地址....',
            geohash:''
        }
    },
    async beforeMount() {
        if (!this.$route.query.hash) {
            const _address = await Get_cityGuess();
            this.geohash =  _address.latitude + ',' + _address.longitude;
        }else{
            this.geohash = this.$route.query.hash
        }
        this.SAVE_GEOHASH(this.geohash);
        let res = await Get_msiteAddress(this.geohash)
        this.currentMsiteName = res.name;
        this.RECORD_ADDRESS(res)
    },
    methods: {
        ...mapMutations(['RECORD_ADDRESS','SAVE_GEOHASH'])
    },
    components:{
        'header-top':Header
    }
}
</script>

<style lang="scss" scoped>
.link_search{
		left: .8rem;
		@include wh(.9rem, .9rem);
		@include ct;
	}
    .msite_title{
		@include center;
        width: 50%;
        color: #fff;
        text-align: center;
        margin-left: -0.5rem;
        .title_text{
            @include sc(0.8rem, #fff);
            text-align: center;
            display: block;
        }
	}
</style>
