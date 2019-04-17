<template>
<div class="home">
    <Header signinUp='home'>
        <span slot="logo" @click="reloadPage" class="head_logo">ele.me</span>
    </Header>
    <nav class="currentCity-wrap">
        <div class="currentCity-top">
            <span class="cc-descp">当前定位城市</span>
            <span class="cc-sub-descp">定位不准时，请在城市列表中选择</span>
        </div>
        <router-link :to="'/city/' + guessCityid" class="currentCity-content">
            <span class="cc-city-title">{{currentCity}}</span>
           <Icon-svg iconClass="xiangyoujiantou" class="arrow-right"/>
        </router-link>
    </nav>
    <section class="hot-city">
        <h4 class="hot-city-descp">热门城市</h4>
        <ul class="hot-city-list">
            <router-link tag="li" v-for="(item,index) in hotCities" :key="index" :to="'/city/' + item.id ">
                {{item.name}}
            </router-link>
        </ul>
    </section>
    <section class="group-city-box">
        <ul class="group-city-ul" >
            <li v-for="(item,key,index) in sortGroupCity" :key="key" class="group-sort-title" >
               
                <h4 class="sort-by-code">{{key}}
                  <span v-if="index == 0">(按字母排序)</span>
                </h4>
                <ul class="hot-city-list">
                    <router-link tag="li" v-for="d in item" :key="d.id" :to="'/city/' + d.id" >{{d.name}}</router-link>
                </ul>
            </li>
        </ul>
    </section>
    
</div>
</template>

<script>
import Header from '@c/header/Header'

import {
    Get_cityGuess,
    Get_hotCity,
    Get_groupCity
} from '@/serve/api'
export default {
    name: 'home',
    data() {
        return {
            currentCity: '',
            guessCityid: '',
            hotCities: [],
            groupCities: {}
        }
    },
    mounted() {
        Get_cityGuess().then((value) => {
            this.currentCity = value.name;
            this.guessCityid = value.id;
        })
        Get_hotCity().then(r => {
            this.hotCities = r;
        })
        Get_groupCity().then(result => {
            this.groupCities = result;

        })
    },
    computed: {
        sortGroupCity() {
         
            let sortobj = {};
            for (let i = 65; i <= 90; i++) {
                if (this.groupCities[String.fromCharCode(i)]) {
                    sortobj[String.fromCharCode(i)] = this.groupCities[String.fromCharCode(i)];
                }
            }
            return sortobj
        
        }
    },
    components: {
        Header,
        
    },
    methods: {
        reloadPage() {
            window.location.reload();
        }
    },
};
</script>

<style lang="scss" scoped>
.home {

    .head_logo {
        margin-left: .3rem;
        color: #fff;
        font-size: .6rem;
    }

    .currentCity-wrap {
        padding-top: 2.3rem;

        .currentCity-top {

            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #e4e4e4;
            line-height: 1.45rem;
            padding: 0 0.45rem;

            .cc-descp {
                font-size: .55rem;
                color: #666;
            }

            .cc-sub-descp {

                color: #9f9f9f;
                font-size: .475rem;
            }
        }

        .currentCity-content {
            position: relative;
            display: block;
            
            margin-left: .3rem;
            color: #3190e8;
            font-size: .9rem;
            line-height: 1.8rem;
        }
    }

    .arrow-right {
        // @include wh(.6rem, .6rem);
        position: absolute;
        right: 0.3rem;
        top: 50%;
        transform: translateY(-50%);
        fill: #fff;
    }

    .hot-city {
        border-top: 3px solid #e4e4e4;

        .hot-city-descp {
            margin-left: .34rem;
            color: #666;
            line-height: 1.8rem;
            font-size: .55rem;
        }

        h4 {
            border-bottom: .025rem solid $bc;
        }

        
    }
.hot-city-list {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;

            li {
                color: $blue;
                text-align: center;
                border-right: 0.025rem solid $bc;
                border-bottom: .025rem solid $bc;
                @include wh(24%, 1.75rem);
                @include font(0.6rem, 1.75rem);
            }

            li:nth-of-type(4n) {
                border-right: none;
            }
        }
    .group-city-box {
        .sort-by-code {

        color: #666;
        font-weight: 400;
        text-indent: 0.45rem;
        border-top: 2px solid $bc;
        border-bottom: 1px solid $bc;
        @include font(0.55rem, 1.45rem, "Helvetica Neue");
        span{
            @include sc(0.475rem, #999);
        }
        }
    }
}
</style>
