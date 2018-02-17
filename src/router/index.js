import Vue from 'vue'
import Router from 'vue-router'
import Usuario from '@/components/usuarios/Usuario.vue'
import UsuariosList from '@/components/usuarios/UsuariosList.vue'
import Pedido from '@/components/pedidos/Pedido.vue'
import PedidosList from '@/components/pedidos/PedidosList.vue'

Vue.use(Router)

function load (component) {
  return () => import(`@/components/${component}.vue`)
}

export default new Router({
  routes: [
    { path: '/menu', component: load('Default') },
    { path: '/', component: load('Login') },
    { path: '/login', component: load('Login') },
    { path: '/pedidos-list', component: PedidosList },
    { path: '/pedido', name: 'Pedido', component: Pedido, props: true },
    { path: '/usuarios-list', component: UsuariosList },
    { path: '/usuario', name: 'Usuario', component: Usuario, props: true }
  ]
})
