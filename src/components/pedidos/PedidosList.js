const data = () => {
  return {
    filtros: {
      fecha1: null,
      fecha2: null,
      estatus: ''
    },
    pedidos: [],
    totalPedidos: 150,
    offset: 0
  }
}

const methods = {
  limpiar () {
    this.$data.filtros = {...data.filtros}
  }
}

export default {
  name: 'PedidosList',
  data: data,
  methods: methods
}
