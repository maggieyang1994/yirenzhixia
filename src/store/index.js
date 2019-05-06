import Vue from 'vue'
import Vuex from 'vuex'
import chapter from './module/chapter.js'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    chapter
  }
})
