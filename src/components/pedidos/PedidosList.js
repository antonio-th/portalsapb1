const data = () => {
  return {
    filtros: {
      fecha1: null,
      fecha2: null,
      estatus: ''
    },
    pedidos: [],
    offset: 0
  }
}

const methods = {
  limpiar () {
    this.$data.filtros = {...data.filtros}
  }
}

const computed = {
  totalPedidos () {
    return this.pedidos.length
  }
}

export default {
  name: 'PedidosList',
  data: data,
  methods: methods,
  computed: computed
}
