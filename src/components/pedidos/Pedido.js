import * as Pedido from './PedidoService.js'

const data = () => {
  return Pedido.fields
}

const metodos = {
  cancelar () {
    this.$router.push('/pedidos-list')
  }
}

export default {
  name: 'Pedido',
  data: data,
  methods: metodos
}
