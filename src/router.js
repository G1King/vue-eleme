import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const routes = [
{

  path: '/',
  component: r => require(['@/views/App'], r),
  children: [
     {
       path: '',
       redirect: '/index'
     },
    {
    path: '/index',
     meta: {
        showTabBar:false
     },
    component: r => require(['@/views/index/Index'], r)
    },
       {
         path:'/city/:cityId',
          meta: {
            showTabBar: false
          },
         component:r => require(['@/views/city/City'],r)
       },
       {
         path:'/msite',
         name:'Msite',
         meta:{
           keepAlive:true,
            showTabBar: true
         },
         component: r => require(['@/views/msite/Msite'],r)
       },
       {
         path:'/order',
         name:'Order',
            meta: {
              showTabBar: true
            },
         component: r => require(['@/views/order/Order'],r)
       },
       {
         path:'/search',
         name:'Search',
            meta: {
              showTabBar: true
            },
         component: r => require(['@/views/search/Search'],r)
       },
       {
         path:'/profile',
         name:'Profile',
            meta: {
              showTabBar: true
            },
         component: r => require(['@/views/profile/Profile'],r)
       },
       {
         path:'/login',
         name:'Login',
            meta: {
              showTabBar: false
            },
         component: r => require(['@/views/login/Login'],r)
       }

  ]

}
]
export default new VueRouter({
  routes,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }
})