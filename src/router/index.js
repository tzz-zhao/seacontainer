import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/conter',
    name: 'conter',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ConterView.vue')
  },
  {
    path:'/comparison',
    name:'comparison',
    component:()=>import('../views/ComparisonView.vue')
  },
  {
    path:'/ship',
    name:'ship',
    component:()=>import('../views/ShipView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // 在路由导航前执行的逻辑
  // to: 即将进入的路由对象
  // from: 当前导航正要离开的路由对象
  // next: 一个函数，必须调用该函数来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

  // 在这里可以添加逻辑来监听路由变化
  // console.log('即将进入的路由:', to);
  // console.log('当前导航正要离开的路由:', from);

  // 调用 next() 表示继续导航，调用 next(false) 中断当前导航，调用 next('/') 或 next({ path: '/' }) 跳转到一个不同的地址
  next();
});

// 全局后置钩子
router.afterEach(() => {
  // 在导航完成之后执行的逻辑
  // to: 进入的路由对象
  // from: 离开的路由对象

  // 在这里可以添加路由变化后的逻辑
  // console.log('已进入的路由:', to);
  // console.log('已离开的路由:', from);
});
export default router
