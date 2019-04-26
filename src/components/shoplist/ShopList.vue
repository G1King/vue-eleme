<template>
  <div class="shop-list-wrap">
    <ul>
      <router-link v-for="item in shopListArr" :key="item.id" :to="{path: '/shop', query:{geohash, id: item.id}}" tag="li">
        <section class="shop-left">
          <img :src="item.image_path | newImageFilter" alt="">
        </section>
        <hgroup class="shop-right">
          <header class="shop-right-top">
            <h4 class="shop-title">{{ item.name }}</h4>
            <ul class="header-right-icon">
              <li v-for="subItem in item.supports" :key="subItem._id">{{ subItem.icon_name }}</li>
            </ul>
          </header>
          <h5>
            <section class="shop-right-center">
              <cube-rate v-model="item.rating" class="shop-rate" :disabled="rateModel.disabled" :max="rateModel.max" :justify="rateModel.justify"></cube-rate>
              <span class="shop-rating-count">{{ item.rating }}</span>
              <span class="shop-order-count">月售{{ item.recent_order_num }}单</span>
              <div class="shop-rigth-center-right">
                <span v-if="item.delivery_mode" class="delivery_style delivery_left">{{ item.delivery_mode.text }}</span>
                <span class="delivery_style delivery_right">准时达</span>
              </div>
            </section>
            <section class="shop-right-bottom">
              <p class="fee commonFont">
                ¥{{ item.float_minimum_order_amount }}起送
                <span class="segmentation">/</span>
                {{ item.piecewise_agent_fee.tips }}
              </p>
              <p class="distance_time commonFont">
                <span class="commonFont distance">{{ item.distance }}</span>
                <span class="segmentation">/</span>
                <span class="order_time">{{ item.order_lead_time }}</span>
              </p>
            </section>
          </h5>
        </hgroup>
      </router-link>
    </ul>
  </div>
</template>

<script>
import {
  Get_shopList
} from '@/serve/api.js'
import {
  mapState
} from 'vuex'
export default {
  props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
  data() {
    return {
      offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
      shopListArr: [], // 店铺列表数据
      preventRepeatReuqest: false, // 到达底部加载数据，防止重复加载
      showBackStatus: false, // 显示返回顶部按钮
      showLoading: true, // 显示加载动画
      touchend: false, // 没有更多数据
      rateModel: {
        disabled: true,
        max: 5,
        justify: false
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      Get_shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId).then(r => {
        console.log(r)
        this.shopListArr = [...r]
      })
    }
  },
  computed: {
    ...mapState(['latitude', 'longitude'])
  }
}
</script>

<style lang="scss" scoped>
.shop-list-wrap>ul li {
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;

    .shop-left img {
        margin-left: .3rem;
        margin-right: .4rem;
        width: 2.7rem;
        height: 2.7rem;
    }

    .shop-right {
        flex: 1;

        .shop-right-top {
            position: relative;

            .shop-title {
                color: #333;
                @include font(0.65rem, 0.65rem, 'PingFangSC-Regular');

                &::before {
                    content: '品牌';
                    display: inline-block;
                    font-size: 0.5rem;
                    line-height: .6rem;
                    color: #333;
                    background-color: #ffd930;
                    padding: 0 0.1rem;
                    border-radius: 0.1rem;
                    margin-right: 0.2rem;
                }
            }

            .header-right-icon {
                position: absolute;
                display: flex;
                flex-direction: row;
                right: .3rem;
                top: .1rem;

                li {
                    @include sc(0.5rem, #999);
                    border: 0.025rem solid #f1f1f1;
                    padding: 0 0.04rem;
                    border-radius: 0.08rem;
                    margin-left: 0.05rem;
                }
            }
        }

        .shop-right-center {
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: .5rem;
            margin-bottom: .5rem;

            .shop-rate {
                width: 3rem;
            }

            .shop-rating-count {
                font-size: .4rem;
                color: #ff6000;
                margin: 0 .2rem;
            }

            .shop-order-count {
                font-size: .4rem;
                color: #666;

            }

            .shop-rigth-center-right {
                position: absolute;
                right: 0.3rem;
                display: flex;
                flex-direction: row;
                // justify-content: center;
                align-items: center;

            }

            .delivery_style {
                font-size: 0.4rem;
                padding: 0.04rem 0.08rem 0;
                border-radius: 0.08rem;
                margin-left: 0.08rem;
                border: 1px;
            }

            .delivery_left {
                color: #fff;
                background-color: $blue;
                border: 0.025rem solid $blue;
            }

            .delivery_right {
                color: $blue;
                border: 0.025rem solid $blue;
            }
        }

        .shop-right-bottom {
            display: flex;
            flex-direction: row;

            .commonFont {
                font-size: .4rem;
                color: #666;
            }

            .segmentation {

                color: #ccc;

            }

            .distance_time {
                margin-left: .4rem;
                .distance{
                 margin-right: .1rem;
                }
                .order_time {
                  margin-left: .1rem;
                font-size: .5rem;
                color: #3190e8;
            }
            }

        }
    }
}
</style>
