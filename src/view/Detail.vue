<template>
    <div>
      <h2 class="title">{{curChapter}}</h2>
      <div v-loading.fullscreen.lock ="loading" element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" style="text-align:center"> 
        <ul  v-if="mode === 'updown'">
         <li v-for="(item, index) in imageList" :key ="index">
           <img :src ="item.ImageUrl"/>
         </li>
       </ul>
        <el-carousel indicator-position="none" arrow="always" :loop="false" :autoplay="false" height="1016px" v-else>
          <el-carousel-item v-for="(item, index) in imageList" :key ="index">
            <img :src ="item.ImageUrl"/>
          </el-carousel-item>
      </el-carousel>
      </div>
       <p class ="bottom">
         <router-link  :to ="toPath">上一章</router-link>
         <router-link :to ="{name: 'detail', params: {chapterId: chapterId < total ?  chapterId * 1 + 1 :  chapterId}}">下一章</router-link>
         <a @click = "mode = mode === 'leftRight' ? 'updown': 'leftRight'">切换成{{mode === "leftRight" ? '滚动' : '翻页'}}模式</a>
         <router-link :to ="{name: 'HelloWorld'}">返回章节目录</router-link>
       </p>
    </div>
</template>
<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
  name: 'detail',
  props: {
    chapterId: {
      require: true,
      type: [Number, String]
    }
  },
  data () {
    return {
      imageList: [],
      mode: 'updown'
    }
  },
  mounted () {
    this.getImageList(this.chapterId)
  },
  beforeRouteUpdate (to, from, next) {
    // 动态路由 复用组件
    // document.documentElement.scrollTop = 0
    this.getImageList(to.params.chapterId)
    next()
  },
  methods: {
    getImageList (chapterId) {
      this.$store.commit('setLoading', true)
      axios.get('https://yirenzhixia.herokuapp.com/users/detail', {
        params: {
          chapterId
        }
      }).then(res => {
        this.$store.commit('setLoading', false)
        localStorage.setItem('history', JSON.stringify({chapter: this.curChapter, path: this.$route.path}))
        this.imageList = res.data
      })
    }
  },
  computed: {
    curChapter () {
      return this.$store.state.chapter.chapterList.length && this.$store.state.chapter.chapterList.find(x => x.chapterId === this.chapterId * 1).chapter
    },
    loading () {
      return this.$store.state.chapter.loading
    },
    ...mapGetters(['total']),
    toPath () {
      return `/detail/${this.chapterId - 1}/#up`
    }
  }
}
</script>
<style scoped>
.updown{
  display: block
}
.title{
      background-color: rgba(51,51,51,0.95);
      width:100%;
      text-align:center;
      position: fixed;
      top:0;
      color:white;
      margin:0;
      z-index:3000
}
.bottom{
  background-color: rgba(51,51,51,0.95);
  width:100%;
  text-align:center;
  position: fixed;
  bottom:-17px;
  color:white;
  z-index:3000;
  padding: 10px
}
.bottom a {
  margin:20px;
  cursor: pointer;
  color: white
}
</style>
