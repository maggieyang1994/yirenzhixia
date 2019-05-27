import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/view/HelloWorld'
import Detail from '@/view/Detail'
import Chat from '@/view/chatRoom.vue'
import Login from '@/view/login.vue'
import d3 from '@/view/d3.vue'
Vue.use(Router)


// travis 构建之后基路径会带上仓库名
var router = new Router({
  mode: 'history',
  base: '/yirenzhixia/',
  routes: [
    { 
      path: "/", 
      name: "login", 
      component: Login 
    },
    {
      path: '/directory',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: { requiresAuth: true }
    },
    {
      path: '/detail/:chapterId',
      name: 'detail',
      component: Detail,
      // props true  将路由参数作为 props注入组件s
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: "/chat",
      name: 'chat',
      component: Chat,
      meta: { requiresAuth: true }
    },
    {
      path: "/d3",
      name: 'd3',
      component: d3,
      meta: { requiresAuth: true }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    console.log("route", savedPosition)
    // 在点击浏览器后退按钮的情况下  滚动到先前位置
    if (savedPosition) return savedPosition;
    // 如果组件的路由(路径)有锚点  跳转到指定锚点
    else if (to.hash && document.querySelector(to.hash)) return { selector: to.hash }
    // 如果对于所有路由导航   包括动态路由匹配的路由（即路由改变但是组件没有被重新渲染） 都滚动到顶部
    return { x: 0, y: 0 }
  },
  
})
router.beforeEach = function(from, to, next){
  if(to.meta.requiresAuth && !this.$store.state.chat.isLoggin){
    next("/")
  }
  next()
}
export default router
