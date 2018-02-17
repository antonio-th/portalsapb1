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
      state.usuario.id = usuario.id
      state.usuario.nombre = usuario.nombre
      state.usuario.username = usuario.username
      state.usuario.role = usuario.role
    },
    logout (state) {
      state.usuario.id = ''
      state.usuario.nombre = ''
      state.usuario.username = ''
      state.usuario.role = ''
    }
  }
})
