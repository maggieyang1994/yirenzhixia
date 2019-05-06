<template>
  <div class='hello'>
      <p v-if ="history && Object.keys(history).length" class="p" style="text-align:center"><a :href="history.path">上次看到: {{history.chapter}}</a></p>
      <ul v-loading ="loading" element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <li v-for='item in computedList' v-bind:key ='item.chapterId'><router-link :to ="{name: 'detail', params: {chapterId: item.chapterId * 1}}">{{item.chapter}}</router-link></li>
      </ul>
      <pagination  @handlerPageChange='handlerPageChange' :value='chapterList' id="up"/>
  </div>
</template>

<script>
import pagination from '@/components/pagination.vue'
export default {
  name: 'HelloWorld',
  components: {
    pagination
  },
  data () {
    return {
      computedList: [],
      history: {}
    }
  },
  mounted () {
    this.history = localStorage.getItem('history') && JSON.parse(localStorage.getItem('history'))
    this.$store.dispatch('getChapterList')
  },
  methods: {
    handlerPageChange (val) {
      this.computedList = val
    }
  },
  computed: {
    chapterList () {
      return this.$store.state.chapter.chapterList
    },
    loading () {
      return this.$store.state.chapter.loading
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{margin: 0 auto};
.hello .p{text-align: center}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  clear: both;
  overflow: hidden;
}
li {
  display: inline-block;
  margin: 10px;
  float: left;
  padding: 10px;
  text-align: left;
  border: 1px solid black;
  width: 25%;
}
a {
  color: #42b983;
}
</style>
