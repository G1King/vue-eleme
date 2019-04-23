<template>
<div id="header_box">
    <slot name="logo"></slot>
    <slot name='search'></slot>
    <section class="head_goback" @click="$router.go(-1)" v-if="goBack">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>

    </section>

    <section class="title_head ellipsis">
        <span class="title_text">{{headTitle}}</span>
    </section>
    <section class="right-box" v-if="signinUp">
         <span v-if="userInfo" @click="clickProfile">个人中心</span>
        <div v-else>
            <span class="login-bt" @click="login">登录</span><span class="sign-bt" @click="sign" >注册</span>
        </div>
    </section>
      <slot name="changecity"></slot>
       <slot name="msite-title"></slot>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    
   computed: {
       ...mapState(['userInfo'])
   },
    props: {
        headTitle: {
            type: String
        },
        goBack:{
            default:false,
            type:Boolean
        },
        signinUp:{
            type:String
        }
    },

    methods: {
        login(){
           this.$router.push({path:'/login'})
        },
        sign(){

       this.$createDialog({
        type: 'confirm',
        icon: 'cubeic-alert',
        title: '注册成功',
        content: `账号：17611585881  密码：123456`,
        confirmBtn: {
          text: '确定按钮',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消按钮',
          active: false,
          disabled: false,
          href: 'javascript:;'
        }
      }).show()
        },
        clickProfile(){
            this.$router.push({path:'/profile'})
        }
    },
    
}
</script>

<style lang="scss" scoped>
#header_box {
    position: fixed;
    background-color: $blue;
    z-index: 100;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    @include wh(100%, 1.95rem);

    .head_goback {
        margin-left: .3rem;
        @include wh(0.6rem, 1rem);

    }

    .title_head {
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        text-align: center;

        span {
            font-size: .8rem;
            color: #fff;
        }
    }
    .right-box {
        position: absolute;
       right: .3rem;
        top:50%;
        transform: translateY(-50%);
        span {
            color: #fff;
            font-size: .65rem;
        }
        .login-bt{
            border-right: 1px solid #fff;
            padding-right: 5px;
        }
        .sign-bt{
            padding-left: 5px;
            
        }
         .user_avatar{
            fill: #fff;
            @include wh(.8rem, .8rem);
        }
    }
}
</style>
