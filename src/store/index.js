import Vue from 'vue'
import Vuex from 'vuex'
import chapter from './module/chapter.js'
import chat from './module/chat.js'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    chapter,
    chat
  }
})
