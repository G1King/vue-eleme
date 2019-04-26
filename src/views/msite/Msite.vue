<template>
  <div class="msite-box">
    <header-top>
      <router-link slot="search" :to="'/search'" class="link_search">
        <Icon-svg icon-class="sousuo" />
      </router-link>

      <router-link slot="msite-title" to="/index" class="msite_title">
        <span class="title_text">{{ currentMsiteName }}</span>
      </router-link>
    </header-top>
    <nav>
      <div>
        <swiper v-if="swiperList.length" :options="swiperOptions">
          <swiper-slide v-for="(item,index) in swiperList" :key="index" class="food_types_container">
            <router-link v-for="message in item" :key="message.id" class="link_to_food" :to="{path:'/food',query:{geohash,title: message.title, restaurant_category_id: getCategoryId(message.link)}}">
              <figure>
                <img :src="message.image_url | imageFilter" alt="">
                <figcaption>{{ message.title }}</figcaption>
              </figure>
            </router-link>
          </swiper-slide>
        </swiper>
        <div class="page-box">
          <div class="swiper-pagination"> </div>
        </div>
        <div class="shop_list_container">
          <header>
            <Icon-svg icon-class="shop" class="icon-svg" />
            <span class="shop_header_title">附近商家</span>
          </header>
          <shop-list v-if="hasGetData" :geohash="geohash"> </shop-list>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Header from '@c/header/Header'
import ShopList from '@c/shoplist/ShopList.vue'
import {
  Get_cityGuess,
  Get_msiteAddress,
  Get_msiteFoodTypes
} from '@/serve/api'
import {
  mapMutations
} from 'vuex'
import 'swiper/dist/css/swiper.css'
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper'

export default {
  data() {
    return {
      currentMsiteName: '请输入页面地址....',
      geohash: '',
      hasGetData: false,
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 1500,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        speed: 800,
        direction: 'horizontal',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets'
        }
      },
      swiperList: []
    }
  },
  async beforeMount() {
    if (!this.$route.query.hash) {
      const _address = await Get_cityGuess()
      this.geohash = _address.latitude + ',' + _address.longitude
    } else {
      this.geohash = this.$route.query.hash
    }
    this.SAVE_GEOHASH(this.geohash)
    const res = await Get_msiteAddress(this.geohash)
    this.currentMsiteName = res.name
    this.RECORD_ADDRESS(res)
    this.hasGetData = true
  },
  mounted() {
    this.msiteFoodTypes()
  },
  methods: {
    ...mapMutations(['RECORD_ADDRESS', 'SAVE_GEOHASH']),
    // 获取头部推荐列表
    msiteFoodTypes() {
      Get_msiteFoodTypes(this.geohash).then((value) => {
        // eslint-disable-next-line prefer-const
        let _array = value
        // eslint-disable-next-line prefer-const
        let _tempArray = []
        const _resArray = [..._array]
        if (_array.length) {
          for (let i = 0, j = 0; i < _array.length; i += 8, j++) {
            _tempArray[j] = _resArray.splice(0, 8)
          }
          this.swiperList = _tempArray
          console.log(this.swiperList)
        }
      })
    },
    getCategoryId(linkUrl) {
      const url = decodeURIComponent(linkUrl.split('=')[1].replace('&target_name', ''))
      if (/restaurant_category_id/gi.test(url)) {
        return JSON.parse(url).restaurant_category_id
      } else {
        return ''
      }
    }
  },
  // eslint-disable-next-line vue/order-in-components
  components: {
    'header-top': Header,
    swiper,
    swiperSlide,
    ShopList
  }
}
</script>

<style lang="scss" scoped>
.swiper-container {
    background-color: #fff;
}

.link_search {
    left: .8rem;
    @include wh(.9rem, .9rem);
    @include ct;
}

.msite_title {
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    margin-left: -0.5rem;

   .title_text {
        @include sc(0.8rem, #fff);
        text-align: center;
        display: block;
    }
}

.page-box {
    position: relative;
    background-color: #fff;
    height: 1rem;

    .swiper-pagination {

        left: 50%;
        transform: translateX(-50%);
    }
}

.food_types_container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;

    .link_to_food {
        width: 25%;
        padding: 0.3rem 0rem;
        @include fj(center);

        figure {
            img {
                margin-bottom: 0.3rem;
                @include wh(1.8rem, 1.8rem);
            }

            figcaption {
                text-align: center;
                @include sc(0.55rem, #666);
            }
        }
    }
}
.shop_list_container{
  padding-left: .3rem;
  margin-top: .5rem;
  background-color: #fff;
  .icon-svg{
    vertical-align: middle;
  }
  .shop_header_title{
       margin-left: .1rem;
				color: #999;
				@include font(0.55rem, 1.6rem);
        line-height: 1.6rem;
			}
}
</style>
