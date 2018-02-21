<template>
  <div id="pedido">
    <!-- Toolbar -->
    <div class="nav">
      <span class="menuButton">
        <router-link to="/menu" class="home">Inicio</router-link>
      </span>
      <span class="menuButton">
        <router-link to="/pedidos-list" class="list">Listado</router-link>
      </span>
    </div>

    <div id="contenido" v-loading="loading">
      <h1>Pedido</h1>

      <!-- Encabezado -->
      <div id="encabezado">
        <el-row class="iguala-alto">
          <el-col :span="3">Docnum</el-col>
          <el-col :span="5">{{ pedido.docNum || '' }}&nbsp;&nbsp;</el-col>
          <el-col :span="4">Fecha Pedido</el-col>
          <el-col :span="12">{{ ffecha(pedido.fechaPedido) }}&nbsp;&nbsp;</el-col>
        </el-row>

        <el-row>
          <el-col :span="3">Estatus</el-col>
          <el-col :span="5">{{ pedido.estatus || '&nbsp;' }}&nbsp;</el-col>
          <el-col :span="4">Fecha Entrega</el-col>
          <el-col :span="12">
            <el-date-picker v-model="pedido.fechaEntrega"
                            format="dd-MM-yyyy" size="mini" />
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3">Referencia</el-col>
          <el-col :span="5" class="input-referencia">
            <el-input v-model="pedido.referencia" size="mini" />
          </el-col>
          <el-col :span="4">Cliente</el-col>
          <el-col :span="12">
            <el-autocomplete style="width: 450px;" v-model="textoCliente"
                             @blur="validaCliente" :trigger-on-focus="false"
                             size="mini" :debounce="500" @select="selectCliente"
                             :fetch-suggestions="buscarCliente">
              <template slot-scope="props">
                <div class="opcion-cliente">
                  <div><strong>{{ props.item.cardCode }} {{ props.item.cardFName }}</strong></div>
                  <div class="op-alias">{{ props.item.cardName }}</div>
                </div>
              </template>
            </el-autocomplete>
          </el-col>
        </el-row>

        <el-row class="iguala-alto">
          <el-col :span="3">Moneda</el-col>
          <el-col :span="5">{{ pedido.moneda }}&nbsp;</el-col>

          <el-col :span="4">Nombre Comercial</el-col>
          <el-col :span="12">{{ pedido.cliente.cardCode }} {{ pedido.cliente.cardFName }}&nbsp;</el-col>
        </el-row>

        <el-row>
          <el-col :span="3">Direccion Entrega</el-col>
          <el-col :span="5">
            <el-select v-model="pedido.direccionEntrega" size="mini">
              <el-option v-for="direccion in direcciones"
                         :key="direccion.address" :value="direccion.address"
                         :label="direccion.direccion" />
            </el-select>
          </el-col>
          <el-col :span="4">Forma de Envio</el-col>
          <el-col :span="12">
            <el-select v-model="pedido.formaenvio" size="mini" :clearable="true">
              <el-option v-for="(item, index) in formaenvio"
                         :key="index" :value="item.code" :label="item.name" />
            </el-select>
          </el-col>
        </el-row>
      </div> <!-- encabezado -->

      <div id="sin-cliente" v-if="!pedido.cliente.cardCode">
        Para agregar productos seleccione el cliente
      </div>

      <!-- Partidas -->
      <div id="partidas" v-if="pedido.cliente.cardCode">
        <el-row id="th-partida">
          <el-col :span="4">Codigo - BCD</el-col>
          <el-col :span="6">Descripcion</el-col>
          <el-col :span="2">Cantidad</el-col>
          <el-col :span="2">Precio</el-col>
          <el-col :span="2">Impuestos</el-col>
          <el-col :span="2">Total</el-col>
          <el-col :span="2">UM</el-col>
          <el-col :span="2">Existencia</el-col>
          <el-col :span="2">&nbsp;</el-col>
        </el-row>
        <el-row v-for="(partida, index) in pedido.partidas" :key="index">
          <el-col :span="4">
            {{ partida.itemCode}} - {{ partida.bcdcode }}&nbsp;
          </el-col>
          <el-col :span="6">
            <el-autocomplete :fetch-suggestions="autocompleteProducto"
                 :trigger-on-focus="false" @select="selectProducto"
                :data-index="index" @focus="producto_onfocus(index)"
                 @blur="producto_onblur(index)" style="width: 250px;"
                size="mini" v-model="partida.texto">
              <template slot-scope="props">
                <div class="opcion-cliente">
                  <div>{{ props.item.id }}</div>
                  <div>{{ props.item.value }}</div>
                  <div>{{ props.item.bcdcode }} - {{ props.item.UomName }}</div>
                 </div>
              </template>
            </el-autocomplete>
          </el-col>
          <el-col :span="2">
            <el-input v-model="partida.cantidad" size="mini"
                      class="input-cantidad" @blur="validaCantidad(index)"
                      @input="calcularPartida(index)" />
          </el-col>
          <el-col :span="2">{{ partida.precio }} {{ partida.moneda }}&nbsp;</el-col>
          <el-col :span="2" v-if="pedido.moneda == pedido.codigoMXN">
            {{ fmonto(partida.impuestos) }} {{codigoMXN}}&nbsp;
          </el-col>
          <el-col :span="2" v-if="pedido.moneda == codigoUSD">
            {{ fmonto(partida.impuestosUSD) }} {{codigoUSD}}&nbsp;
          </el-col>
          <el-col :span="2" v-if="pedido.moneda == codigoMXN">
            {{ fmonto(partida.total) }} {{codigoMXN}}&nbsp;
          </el-col>
          <el-col :span="2" v-if="pedido.moneda == codigoUSD">
            {{ fmonto(partida.totalUSD) }} {{codigoUSD}}&nbsp;
          </el-col>
          <el-col :span="2">
            <select :id="genera(index)" @change="selUm(index)"></select>
          </el-col>
          <el-col :span="2">{{ fmonto(partida.existencia) }}&nbsp;</el-col>
          <el-col :span="2">&nbsp;</el-col>
        </el-row>
      </div> <!-- partidas -->

      <!-- totales -->
      <div id="totales" v-if="pedido.cliente.cardCode">
        <el-row>
          <el-col :span="2" :offset="14">Subtotal</el-col>
          <el-col :span="2" align="right" v-if="pedido.moneda == codigoMXN">
            {{ fmonto(pedido.subTotal) }} {{codigoMXN}}
          </el-col>
          <el-col :span="2" align="right" v-if="pedido.moneda == codigoUSD">
            {{ fmonto(pedido.subTotalUSD) }} {{codigoUSD}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2" :offset="14">Impuestos</el-col>
          <el-col :span="2" align="right" v-if="pedido.moneda == codigoMXN">
            {{ fmonto(pedido.impuestos) }} {{codigoMXN}}
          </el-col>
          <el-col :span="2" align="right" v-if="pedido.moneda == codigoUSD">
            {{ fmonto(pedido.impuestosUSD) }} {{codigoUSD}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2" :offset="14">Total</el-col>
          <el-col :span="2" align="right" v-if="pedido.moneda == codigoMXN">
            {{ fmonto(pedido.total) }} {{codigoMXN}}
          </el-col>
          <el-col :span="2" align="right" v-if="pedido.moneda == codigoUSD">
            {{ fmonto(pedido.totalUSD) }} {{codigoUSD}}
          </el-col>
        </el-row>
      </div> <!-- totales -->

      <div id="comentarios" v-if="pedido.cliente.cardCode">
        <el-row>
          <el-col :span="4">Comentarios</el-col>
          <el-col :span="12">
            <el-input type="textarea"
                      :rows="4" v-model="pedido.comentarios" />
          </el-col>
        </el-row>
      </div>

      <div id="toolbar">
        <span v-if="!readonly">
        <el-button type="primary" :disabled="!pedido.cliente.cardCode"
                   @click="guardar(false)">Guardar</el-button>
        <el-button @click="sap" :disabled="loading">SAP</el-button>
        <el-button @click="cancelar" :disabled="loading">Cancelar</el-button>
        </span>
        <span v-if="readonly">
          <el-button @click="regresar" type="primary">Ok</el-button>
        </span>
      </div>
    </div> <!-- contenido -->
  </div>
</template>

<script>
import * as PedidoService from './PedidoService'
import $ from 'jquery'
import numeral from 'numeral'
import moment from 'moment'
import * as util from '@/Utils.js'
import _ from 'lodash'

const data = () => {
  return {
    pedido: {...PedidoService.pedido},
    textoCliente: '',
    direcciones: [],
    formaenvio: [],
    currentRow: -1,
    codigoMXN: '',
    codigoUSD: '',
    loading: false,
    readonly: true
  }
}

const metodos = {
  regresar () {
    this.$router.push('/pedidos-list')
  },
  async sap () {
    this.loading = true

    const config = {
      url: '/GAPA/vue/sap',
      methd: 'GET',
      data: {
        id: this.pedido.id
      }
    }

    try {
      this.$loading.service({target: 'sin-cliente'})
      await this.guardar(true)
      const response = await $.ajax(config)
      if (response.success) {
        this.readonly = true
        this.$message.success('El documento se genero correctamente en SAP')
        this.$router.push('/pedidos-list')
      } else {
        util.showErrors(response, this)
      }
    } catch (e) {
      this.$loading.service().close()
      console.log(e)
      util.showStatusText(e, this)
    }

    this.loading = false
  }, // end SAP
  genera (index) {
    return 'um-' + index
  },
  selUm (index) {
    const elemento = $('#um-' + index)
    const valor = elemento.val()
    const partida = this.pedido.partidas[index]
    const unidad = _.find(partida.unidades, ['umentry', parseInt(valor)])
    console.log('valor ' + valor + ', unidad ' + unidad)
    console.log(unidad)
    partida.unidadMedida = valor
    partida.precio = partida.precioBase * unidad.baseqty
    partida.precioPesos = partida.precioBasePesos * unidad.baseqty
    partida.precioDolares = partida.precioBaseDolares * unidad.baseqty
    console.log(`existenciaBase ${partida.existenciaBase} baseqty ${unidad.baseqty}`)
    partida.existencia = partida.existenciaBase / unidad.baseqty
    console.log('existencia ' + partida.existencia)
    this.calcularPartida(index)
  },
  validaCantidad (index) {
    const valor = this.pedido.partidas[index].cantidad
    if (Number.isNaN(Number.parseFloat(valor))) {
      this.$message.error('Cantidad invalida')
      this.pedido.partidas[index].cantidad = 0
    }
  },
  producto_onfocus (index) {
    this.currentRow = index
  },
  producto_onblur (index) {
    const _this = this
    setTimeout(function () {
      const partida = _this.pedido.partidas[index]
      partida.texto = partida.itemName
    }, 150)
  },
  async guardar (sap) {
    try {
      const pedido = JSON.stringify(this.pedido)
      const request = {
        url: '/GAPA/vue/pedido',
        method: 'POST',
        data: {
          pedido: pedido
        }
      }
      const respuesta = await $.ajax(request)
      if (respuesta.success) {
        this.consultar()
        if (sap) {
          return true
        }

        this.$message.success('El pedido se guardo correctamente')
        this.$router.push('/pedidos-list')
      } else {
        if (respuesta.error.message) {
          this.$notify.error({
            title: 'No se guardo el pedido',
            message: respuesta.error.message
          })
        } else if (respuesta.error.length > 0) {
          respuesta.error.map(error => {
            setTimeout(() => {
              this.$notify.error(error.message)
            }, 500)
          })
        } else {
          this.$message.error('El pedido no pudo guardarse')
        }
      } // false de "if (respuesta.success) {"
    } catch (e) {
      this.$loading.service().close()
      if (e.status === 401) {
        this.$message.error('Expiro la sesion')
        this.$router.push('/login')
        return
      }
      this.$notify.error({
        title: 'Ocurrio un error',
        message: e
      })
    } // try/catch
  }, // guardar
  async buscarCliente (term, cb) {
    try {
      let respuesta = await $.get('/GAPA/vue/cliente?term=' + term)
      if (respuesta.status === 401) {
        this.$message.error('Expiro la sesion')
        this.$router.push('/login')
        return
      }

      cb(respuesta)
    } catch (e) {
      this.$notify.error({
        title: 'Ocurrio un error',
        message: e
      })
    }
  },
  selectCliente (cliente) {
    this.pedido.cliente = cliente
    this.pedido.direccionEntrega = ''
    this.direcciones = []
    this.pedido.moneda = cliente.currency
    const _this = this
    $.get('/GAPA/vue/direccion', {cardCode: this.pedido.cliente.cardCode})
      .then(function (data) {
        _this.direcciones = data
      })
  },
  validaCliente (event) {
    this.textoCliente = this.pedido.cliente.cardName
  },
  fmonto (rawValue) {
    const monto = numeral(rawValue).format('0,0.00')
    return monto
  },
  ffecha (rawDate) {
    let theValue = null
    if (rawDate) theValue = moment(rawDate).format('DD-MM-YYYY')
    return theValue
  },
  async autocompleteProducto (term, cb) {
    try {
      if (term.length > 2) {
        const params = {cardCode: this.pedido.cliente.cardCode, term: term}
        const consulta = await $.get('/GAPA/producto/autocompleteTodos', params)
        cb(consulta)
      } else {
        const noquery = []
        cb(noquery)
      }
    } catch (e) {
      this.$notify({
        title: 'Ocurrio un error',
        message: e,
        type: 'error'
      })
    }
  },
  selectProducto (producto) {
    console.log(producto)
    const _this = this
    const rowIndex = this.currentRow
    const partida = this.pedido.partidas[rowIndex]

    partida.itemCode = producto.id
    partida.bcdcode = producto.bcdcode
    partida.unidadMedida = 0
    partida.unidades = []
    partida.existencia = producto.existencia
    partida.existenciaBase = producto.existencia
    partida.itemName = producto.value
    partida.precioBase = producto.precio
    partida.precioBasePesos = producto.precioPesos
    partida.precioBaseDolares = producto.precioDolares
    partida.precio = producto.precio
    partida.moneda = producto.moneda
    partida.precioPesos = producto.precioPesos
    partida.precioDolares = producto.precioDolares
    partida.tasaIva = producto.tasaIva
    partida.factorIva = partida.tasaIva === 16 ? 0.16 : 0
    this.calcularPartida(rowIndex)
    this.agregarPartidaBlank()
    const config = {bcdcode: partida.bcdcode, itemcode: partida.itemCode}
    $.get('/GAPA/vue/unidadMedida', config).then(function (data) {
      partida.unidades = data
      let cmb = $('#um-' + rowIndex)
      cmb.empty()
      $.each(data, function (i, item) {
        cmb.append(`<option value='${item.umentry}'>${item.umcode}</option>`)
      })
      _this.selUm(rowIndex)
    })
  },
  calcularPartida (index) {
    const partida = this.pedido.partidas[index]
    const subtotalPesos = partida.cantidad * partida.precioPesos
    const subtotalDolares = partida.cantidad * partida.precioDolares
    partida.impuestos = subtotalPesos * partida.factorIva
    partida.total = subtotalPesos + partida.impuestos

    partida.impuestosUSD = subtotalDolares * partida.factorIva
    partida.totalUSD = subtotalDolares + partida.impuestosUSD

    this.calcularTotales()
  },
  calcularTotales () {
    let subTotal = 0
    let subTotalUSD = 0
    let impuestos = 0
    let impuestosUSD = 0
    let total = 0
    let totalUSD = 0

    _.forEach(this.pedido.partidas, function (partida) {
      subTotal += partida.precioPesos * partida.cantidad
      subTotalUSD += partida.precioDolares * partida.cantidad
      impuestos += partida.impuestos
      impuestosUSD += partida.impuestosUSD
    })

    total = subTotal + impuestos
    totalUSD = subTotalUSD + impuestosUSD

    this.pedido.subTotal = subTotal
    this.pedido.subTotalUSD = subTotalUSD
    this.pedido.impuestos = impuestos
    this.pedido.impuestosUSD = impuestosUSD
    this.pedido.total = total
    this.pedido.totalUSD = totalUSD
  },
  agregarPartidaBlank () {
    const lastIndex = this.pedido.partidas.length - 1
    if (this.pedido.partidas[lastIndex].itemCode !== '') {
      this.pedido.partidas.push({
        id: 0,
        itemCode: '',
        itemName: '',
        texto: '',
        cantidad: 0,
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
        unidadMedida: '0',
        existencia: 0
      })
    }
  },
  cancelar () {
    const _this = this
    const request = {
      url: `/GAPA/vue/pedido/${this.pedido.id}`,
      method: 'DELETE',
      data: {id: this.pedido.id}
    }

    $.ajax(request).done(function (data) {
      if (data.success === false) {
        _this.$notify({
          title: 'Error al cancelar pedido',
          message: data,
          type: 'error'
        })
      }
    }).fail(function (xhr, textStatus, errorThrown) {
      if (textStatus === 401) {
        _this.$message.error('Expiro la sesion')
        _this.$router.push('/login')
        return
      }
      _this.$notify({
        title: 'Error al cancelar pedido',
        message: errorThrown,
        type: 'error'
      })
    })

    this.$router.push('/pedidos-list')
  },
  async cargaformaenvio () {
    const response = await $.get('/GAPA/vue/formaenvio')
    this.formaenvio = response
  },
  async consultar () {
    const config = {
      url: '/GAPA/vue/pedido',
      data: { id: this.$props.id },
      method: 'GET'
    }

    let loading
    try {
      loading = this.$loading.service({target: 'sin-cliente'})
      const consulta = await $.ajax(config)
      this.direcciones = consulta.direcciones
      this.pedido = consulta.pedido
      this.codigoMXN = consulta.pedido.codigoMXN
      this.codigoUSD = consulta.pedido.codigoUSD
      this.textoCliente = this.pedido.cliente.cardName
      this.pedido.partidas.sort(function (a, b) { return a.secuencia - b.secuencia })

      this.pedido.partidas.map(function (el, index) {
        el.factorIva = el.tasaIva === 16 ? 0.16 : 0
        const config = {bcdcode: el.bcdcode, itemcode: el.itemCode}
        $.get('/GAPA/vue/unidadMedida', config).then(function (data) {
          let cmb = $('#um-' + index)
          cmb.empty()
          $.each(data, function (i, item) {
            cmb.append(`<option value='${item.umentry}'>${item.umcode}</option>`)
          })
          cmb.val(el.unidadMedida)
        })
      }) // Generar los selectores para las unidades de medida

      if (this.pedido.estatus === 'Capturando' || this.pedido.estatus === 'Inicial') {
        this.readonly = false
      }

      loading.close()
    } catch (e) {
      loading.close()
      if (e.status === 401) {
        this.$message.error('Expiro la sesion')
        this.$router.push('/login')
        return
      }

      this.$notify({
        title: 'Ocurrio un error',
        message: e,
        type: 'error'
      })
    }
  }
} // metodos

const mounted = async function () {
  await this.cargaformaenvio()
  this.consultar()
}

export default {
  name: 'Pedido',
  props: ['id'],
  data: data,
  methods: metodos,
  mounted: mounted
}
</script>
<style>
  #contenido {
    margin: 0 10px 0 10px;
  }

  #partidas, #encabezado, #comentarios, #toolbar, #sin-cliente {
    margin: 15px 0 0 0;
    border: solid 1px lightgrey;
    padding: 5px;
  }

  #sin-cliente {
    padding: 20px 0 20px 100px;
    font-style: italic;
    font-size: 14px;
    color: blue;
  }

  #toolbar2 {
    padding: 10px 0 10px 15px;
  }

  #encabezado {
    padding: 15px 0 15px 10px;
  }

  .borde {
    border: solid 1px black;
  }
  #th-partida {
    padding: 5px 0 5px 0;
    background-color: #f2f2f2;
    border-bottom: solid 1px lightgrey;
  }
  .opcion-cliente {
    font-size: 8pt;
    line-height: 12px;
    border-top: dashed 1px lightgrey;
  }
  .op-alias {
    padding-left: 20px;
  }
  .input-referencia {
    padding: 0 25px 0 0;
  }
  .iguala-alto {
    margin: 0 2px 0 2px;
    padding: 6px 0 5px 0;
  }
  .input-cantidad {
    width: 70px;
  }
</style>
<style src="@/assets/css/icons8.css"></style>
