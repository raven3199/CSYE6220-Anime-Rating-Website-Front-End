import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Upload from '@/views/Upload'
import Detail from '@/views/Detail'

Vue.use(Router)

export default new Router({
  // 修改为History路由模式
  mode: 'history',
  routes: [

    {
      path: '/Login',
      name: 'login page',
      component: Login
    },
    {
      path: '/Register',
      name: 'register page',
      component: Register
    },
    {
      path: '/',
      name: 'home page',
      component: Home
    },
    {
      path: '/Upload',
      name: 'upload page',
      component: Upload
    },
    {
      path: '/Detail',
      name: 'detail page',
      component: Detail
    }

  ]

})

