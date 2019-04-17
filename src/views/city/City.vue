<template>
<div class="city-wrap">
    <Header goBack :headTitle="currentCity">
        <router-link slot="changecity"  class="changeCity" to="/index">切换城市</router-link>
    </Header>
    <section class="form-box">
       
     <cube-input clearable v-model="inputVaule" placeholder="输入学校、商务楼、地址"></cube-input>
     <button class="submitAction" @click="submit">提交</button>
    </section>
    <section class="history-box">
        <p v-if="historytitle">搜索历史</p>
        <ul class="history-list-ul">
          <li v-for="(item,index) in placelist" :key="index" @click="nextPage(index,item.geohash)">
           <h4>{{item.name}}</h4>
           <p>{{item.address}}</p>
          </li>
        </ul>
        <footer v-if="historytitle && placelist.length" class="clear_all_history" @click="clearData">清空所有</footer>
        <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
    </section>
</div>
</template>

<script>
import Header from '@c/header/Header'
import {
    Get_currentcity,Get_searchplace
} from '@/serve/api'
import {setStore,getStore,removeStore} from '@/common/utils'
export default {
    data() {
        return {
            inputVaule:'',
            currentCity:'',
            historyData:[],
            placelist:[],
            cityId:'',
            historytitle:true,
            placeNone:false
        }
    },
    mounted() {
        this.cityId = this.$route.params.cityId;
        Get_currentcity(this.cityId).then(v => {
            this.currentCity = v.name;
        })
        this.getHistoryData();
    },
    methods: {
        submit(){
            if(!this.inputVaule) return this.$createToast({
                txt:'请输入地址',
                type:'txt'
            }).show();
Get_searchplace(this.cityId,this.inputVaule).then(result=>{
console.log(result);
this.placelist = result;
this.historytitle = false;
this.placeNone == result.length ? false : true;
})
        },
        getHistoryData(){
           let _data = getStore('HISTORYDATA');
           if (_data) {
               _data = JSON.parse(_data);
               this.placelist = _data;
           }else{
               this.placelist = [];
           }
        },
        nextPage(index,hash){
          let history = getStore('HISTORYDATA');
          let item = this.placelist[index];
          if (history) {
              let checkrepat = false;
              this.historyData = JSON.parse(history);
             this.historyData.forEach(element => {
                  if (element.geohash === hash) {
                      checkrepat = true;
                  }
              });
              if (!checkrepat) {
                  this.historyData.push(item);
              }
          }else{
                this.historyData.push(item);
          }
          setStore('HISTORYDATA',this.historyData);
          this.$router.push({path:'/msite',query:{hash}})
        },
        clearData(){
            removeStore('HISTORYDATA');
            this.getHistoryData();
            this.historytitle = false;
        }
    },
    components: {
        Header
    }
}
</script>

<style lang="scss" scoped>
.city-wrap{
    .changeCity{
        position: absolute;
        right: .3rem;
        font-size: .6rem;
        color:#fff;
        
    }
    .form-box{
         padding-top: 2.5rem;
    }
    .submitAction{
        margin-top: .3rem;
        background-color: #3190e8;
        color: #fff;
        font-size: .65rem;
        width: 100%;
        height: 1.4rem;;
        border-radius: .1rem;
    }
    .history-box{
        p{
            margin-left: .3rem;
            margin-bottom: .1rem;
           @include font(0.475rem, 0.8rem);
        }

    }
    .clear_all_history{
        font-size: .7rem;
        color: #666;
        text-align: center;
        background-color: #fff;
        line-height: 2rem;
        
    }
    .history-list-ul{
        background-color: #fff;
        border-top: 1px solid #e4e4e4;
        li{
            padding-top: .65rem;
            margin:  0 auto;
            border-bottom: 1px solid #e4e4e4;
            h4{
                margin:  0 auto .35rem;
                width: 90%;
                color: #333;
                font-size: .65rem;
            }
            p{
                margin: 0 auto .55rem;
                font-size: .45rem;
                color: #999;
                width: 90%;
            }
        }
    }
}
</style>
