const state = {
  currentUser: {},
  isLoggin: false
}

const mutations = {
  setUser (state, data) {
    state.currentUser = data;
    state.loggin = true
    localStorage.setItem("login", JSON.stringify(data))
  }
}

export default {
  state,
  mutations,
  
}
