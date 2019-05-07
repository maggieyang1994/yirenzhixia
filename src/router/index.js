import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/view/HelloWorld'
import Detail from '@/view/Detail'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/detail/:chapterId',
      name: 'detail',
      component: Detail,
      // props true  将路由参数作为 props注入组件s
      props: true
    }
  ]
  // scrollBehavior (to, from, savedPosition) {
  //   console.log("route", savedPosition)
  //   // 在点击浏览器后退按钮的情况下  滚动到先前位置
  //   if(savedPosition) return savedPosition;
  //   // 如果组件的路由(路径)有锚点  跳转到指定锚点
  //   else if(to.hash && document.querySelector(to.hash)) return {selector: to.hash}
  //   // 如果对于所有路由导航   包括动态路由匹配的路由（即路由改变但是组件没有被重新渲染） 都滚动到顶部
  //   return {x: 0, y: 0}
  // }
})
