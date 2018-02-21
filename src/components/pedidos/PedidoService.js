export let cliente = {
  cardCode: '',
  cardName: '',
  cardFName: '',
  mainusage: ''
}

export let partida = {
  id: 0,
  secuencia: 0,
  itemCode: '',
  bcdcode: '',
  itemName: '',
  texto: '',
  cantidad: 0,
  precioBase: 0,
  precioBasePesos: 0,
  precioBaseDolares: 0,
  precio: 0,
  moneda: '',
  precioPesos: 0,
  precioDolares: 0,
  tasaIva: 0,
  factorIva: 0,
  impuestos: 0,
  impuestosUSD: 0,
  total: 0,
  totalUSD: 0,
  unidadMedida: 0,
  unidades: [],
  existencia: 0,
  existenciaBase: 0
}

export let pedido = {
  id: 0,
  docNum: '',
  fechaPedido: null,
  estatus: '',
  fechaEntrega: null,
  referencia: '',
  direccionEntrega: '',
  formaenvio: null,
  moneda: '',
  cliente: cliente,
  partidas: [partida],
  comentarios: '',
  subTotal: 0,
  subTotalUSD: 0,
  impuestos: 0,
  impuestosUSD: 0,
  total: 0,
  totalUSD: 0
}
