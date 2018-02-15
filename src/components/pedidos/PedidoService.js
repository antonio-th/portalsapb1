export let direccionEntrega = {
  shipToCode: '',
  direccion: ''
}

export let cliente = {
  cardCode: '',
  cardName: '',
  cardFName: ''
}

export let partida = {
  id: 0,
  itemCode: 'HB30060',
  itemName: 'jabon para manos',
  cantidad: 2,
  precio: 20,
  impuestos: 0.2,
  total: 0,
  unidadMedida: 'PZA',
  existencia: 20
}

export let pedido = {
  id: 0,
  docNum: '',
  fechaPedido: null,
  estatus: '',
  fechaEntrega: null,
  referencia: '',
  direccionEntrega: direccionEntrega,
  moneda: '',
  cliente: cliente,
  partidas: [partida],
  comentarios: '',
  subTotal: 0,
  impuestos: 0,
  total: 0
}
