import axios from 'axios'
const state = {
  chapterList: [],
  loading: false
}
const getters = {
  total (state) {
    return state.chapterList.length
  }
}
const mutations = {
  getChapterList (state, data) {
    state.chapterList = data
  },
  setLoading (state, data) {
    state.loading = data
  }
}
const actions = {
  getChapterList (context) {
    context.commit('setLoading', true)
    axios.get('https://yirenzhixia.herokuapp.com/users').then(data => {
      // 获取章节列表
      context.commit('getChapterList', data.data)
      context.commit('setLoading', false)
    })
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
