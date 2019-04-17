import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {
  baseUrl
} from
'./env';
const ApiService = {
  init() {
    Vue.use(VueAxios,axios)
    Vue.axios.defaults.baseURL = "http://cangdu.org:8001";
  },
  interceptors() {
    // // 请求拦截
    // Vue.axios.interceptors.request.use(
    //   config => {
    //     // config.headers = {
    //     //     "token": JwtService.getToken()
    //     // }

    //     config.url = config.url + '?userId=' + '46db28cef871485f88fc1e1b3ba77521' + '&token=' +
    //       '46db28cef871485f88fc1e1b3ba77521093210B6CD51CBC3E685BD4E4769F9BB'
    //     return config;
    //   },
    //   error => {
    //     return Promise.reject(error);
    //   }
    // );
    // 响应拦截
    // Vue.axios.interceptors.response.use(
    //   response => {
    //     return response;
    //   },
    //   error => {
    //     // 错误提醒
    //     const {
    //       status
    //     } = error.response;

    //     if (status === 401) {
    //       //  alert('token过期, 请重新登录!');

    //     }
    //     return Promise.reject(error);
    //   });
    // 返回出来
  },
  get(url, params = {}) {
    return Vue.axios.get(url, params).catch(error => {
      return Promise.reject(error.message);
    }).then((data) => {
      return data.data;
    });
  },
  post(url, params = {}) {
    return Vue.axios.post(url, params);
  }

}
export default ApiService;
