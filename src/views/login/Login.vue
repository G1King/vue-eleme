<template>
<div>
    <Header goBack headTitle="登录" />
    <div class="form-box">
        <cube-form :model="model" @submit="submitHandler">
            <cube-form-item :field="fields[0]"></cube-form-item>
            <cube-form-item :field="fields[1]"></cube-form-item>
            <cube-form-item :field="fields[2]"></cube-form-item>
            <span class="login_tips">温馨提示：未注册过的账号，登录时将自动注册</span>
            <span class="login_tips">注册过的用户可凭账号密码登录</span>
            <cube-button type="submit" class="loginBt">登录</cube-button>
        </cube-form>
    </div>
</div>
</template>

<script>
import Header from '@c/header/Header';
import {
    Post_login
} from '@/serve/api.js'
export default {
    data() {
        return {
            model: {
                account: "",
                password: "",
                vercode: ""
            },
            fields: [{
                    type: 'input',
                    modelKey: 'account',
                    label: '账号',
                    props: {
                        placeholder: '请输入账号'
                    },
                    rules: {
                        required: true
                    }
                },
                {
                    type: 'input',
                    modelKey: 'password',
                    label: '密码',
                    props: {
                        placeholder: '请输入密码'
                    },
                    rules: {
                        required: true
                    }
                }, {
                    type: 'input',
                    modelKey: 'vercode',
                    label: '验证码',
                    props: {
                        placeholder: '请输入验证码'
                    },
                    rules: {
                        required: true
                    }
                }
            ]
        }
    },
    methods: {
        submitHandler(e) {
            console.log(this.model.vercode,this.model.account);
            Post_login({
                  captcha_code: this.model.vercode,
                username: this.model.account,
                password:this.model.password
            }).then((value) => {
              console.log(value)
            })
        },
    },
    components: {
        Header
    }
}
</script>

<style lang="scss" scoped>
.form-box {
    padding-top: 2.3rem;

    .login_tips {
        display: inline-block;
        margin: .3rem;
        font-size: .5rem;
        color: red;
        line-height: .5rem;
    }

    .loginBt {
        // margin:  .5rem ;
        margin-top: .3rem;
        font-size: .7rem;
        color: #fff;
        // text-align: left;
        background-color: #4cd964;

    }
}
</style>
