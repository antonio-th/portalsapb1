<template>
  <div id="pedidos-list">
    <!-- Tool bar -->
    <div class="nav">
      <span class="menuButton"><router-link to="/menu" class="home">Inicio</router-link></span>
      <span class="menuButton"><a href="#" @click="crearPedido" class="create">Nuevo Pedido</a></span>
    </div>

    <!-- contenido -->
    <div id="contenido">
      <h1>Pedidos</h1>

      <!-- filtros -->
      <div id="filtros">
        <el-row>
          <el-col :span="24">Fecha de Enrega
            <el-date-picker v-model="filtros.fecha1"
              class="spacer" style="width: 150px;">
            </el-date-picker>
            <span id="span-al">al</span>
            <el-date-picker v-model="filtros.fecha2" style="width: 150px;">
            </el-date-picker>
            <span class="spacer">Estatus</span>
            <el-select v-model="filtros.estatus" class="controles"
              :clearable="true">
              <el-option value="Capturando">Capturando</el-option>
              <el-option value="Enviado">Enviado</el-option>
              <el-option value="Cerrado">Cerrado</el-option>
              <el-option value="Cancelado">Cancelado</el-option>
            </el-select>
            <el-button type="primary"
                       @click="buscar"
                       class="spacer">Buscar</el-button>
            <el-button @click="limpiar">Limpiar</el-button>
          </el-col>
        </el-row>
      </div>

      <div id="listado">
        <el-table :data="pedidos" size="mini" :stripe="true" :border="true">
          <el-table-column prop="docNum" align="center"
                           label="DocNum" width="75px" />
          <el-table-column prop="razonSocial" header-align="center"
                           label="Razon Social" />
          <el-table-column prop="alias" header-align="center"
                           label="Nombre Comercial" />
          <el-table-column prop="total" header-align="center"
                           :formatter="fmonto" width="125px"
                           align="right" label="Monto" />
          <el-table-column prop="fechaPedido" :formatter="ffecha"
                           width="95px"
                           align="center" :fit="true" label="Captura" />
          <el-table-column prop="fechaEntrega" :formatter="ffecha"
                           width="95px"
                           align="center" :fit="true" label="Entrega" />
          <el-table-column prop="referencia" header-align="center"
                           :fit="true" label="Referencia" />
          <el-table-column prop="estatus" align="center"
                           width="65px" label="Estatus">
            <template slot-scope="scope">
              <i class="el-icon-edit"
                 v-if="scope.row.estatus == 'Capturando'"></i>
              <i class="el-icon-document"
                 v-if="scope.row.estatus == 'Enviado'"></i>
              <i class="el-icon-success"
                 v-if="scope.row.estatus == 'Cerrado'"></i>
              <i class="el-icon-close"
                 v-if="scope.row.estatus == 'Cancelado'"></i>
            </template>
          </el-table-column>
          <el-table-column v-bind:width="60">
            <template slot-scope="scope">
              <el-button @click="editar(scope.$index, scope.row)">
                <i class="el-icon-view"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination :total="totalRegistros" :page-size="pageSize" :current-page="currentPage"
                       @current-change="pageChange"
                       layout="total, prev, pager, next">
        </el-pagination>
      </div> <!-- listado -->

      <div id="leyendas">
        <i class="el-icon-edit"></i> - Capturando
        <i class="el-icon-document"></i> - Enviado
        <i class="el-icon-success"></i> - Cerrado
        <i class="el-icon-close"></i> - Cancelado
      </div>

    </div> <!-- contenido -->
  </div>
</template>

<script>
import $ from 'jquery'
import moment from 'moment'
import numeral from 'numeral'

const data = () => {
  return {
    filtros: {
      fecha1: null,
      fecha2: null,
      estatus: ''
    },
    pedidos: [],
    pageSize: 10,
    currentPage: 1,
    totalRegistros: 0
  }
}

const methods = {
  buscar () {
    this.$data.currentPage = 1
    this.consultar()
  },
  async consultar () {
    try {
      const offset = (this.currentPage - 1) * this.pageSize
      const where = JSON.stringify(this.$data.filtros)
      const params = {max: this.$data.pageSize, offset: offset, filtros: where}
      const response = await $.get('/GAPA/vue/pedido', params)
      if (response.listado) {
        this.$data.pedidos = response.listado
        this.$data.totalRegistros = response.totalRegistros
      }
    } catch (e) {
      if (e.status === 401) {
        this.$message.error('Expiro la sesion')
        this.$router.push('/login')
        return
      }

      this.$notify({
        title: 'Error de Conexion',
        type: 'error',
        message: e
      })
    }
  },
  limpiar () {
    this.$data.filtros = {...data.filtros}
    this.consultar()
  },
  pageChange (currentPage) {
    this.$data.currentPage = currentPage
    this.consultar()
  },
  ffecha (row, column, cellValue) {
    let theValue = null
    if (cellValue) theValue = moment(cellValue).format('DD-MM-YYYY')
    return theValue
  },
  fmonto (row, column, cellValue) {
    const monto = numeral(cellValue).format('0,0.00') + ' ' + row.moneda
    return monto
  },
  editar (index, row) {
    this.$router.push({ name: 'Pedido', params: { id: row.id } })
  },
  async crearPedido () {
    try {
      const pedido = await $.get('/GAPA/vue/crearPedido')
      this.$router.push({name: 'Pedido', params: {id: pedido.id}})
    } catch (e) {
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
}

const computed = {
  totalPedidos () {
    return this.pedidos.length
  }
}

const created = function () {
  this.consultar()
}

export default {
  name: 'PedidosList',
  data: data,
  methods: methods,
  computed: computed,
  created: created
}
</script>

<style>
  .spacer {
    margin: 0 0 0 15px;
  }

  #filtros, #listado {
    border: solid 1px lightgrey;
    margin: 10px 0 0 0;
    padding: 10px 0 10px 0;
  }

  #filtros {
    padding-left: 20px;
  }

  #listado {
    padding-left: 5px;
  }

  .controles {
    width: 155px;
  }

  #span-al {
    margin: 0 8px 0 8px;
  }

  #leyendas {
    margin: 10px 0 0 10px;
  }
</style>
