import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: {
      id: '',
      username: '',
      role: '',
      nombre: ''
    }
  },
  mutations: {
    login (state, usuario) {
      state.usuario.nombre = usuario.nombre
      state.usuario.username = usuario.username
    },
    logout (state) {
      state.usuario.nombre = ''
      state.usuario.username = ''
    }
  }
})
