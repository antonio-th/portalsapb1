<template>
  <div id="pedido">
    <!-- Toolbar -->
    <div class="nav">
      <span class="menuButton">
        <router-link to="/" class="home">Inicio</router-link>
      </span>
      <span class="menuButton">
        <router-link to="/pedidos-list" class="list">Listado</router-link>
      </span>
    </div>

    <div id="contenido">
      <h1>Pedido</h1>

      <!-- Encabezado -->
      <div id="encabezado">
        <el-row>
          <el-col :span="3">Docnum</el-col>
          <el-col :span="5">{{ pedido.docNum || '&nbsp;'}}&nbsp;</el-col>
          <el-col :span="4">Fecha Pedido</el-col>
          <el-col :span="11">{{ pedido.fechaPedido }}&nbsp;</el-col>
        </el-row>

        <el-row>
          <el-col :span="3">Estatus</el-col>
          <el-col :span="5">{{ pedido.estatus || '&nbsp;' }}&nbsp;</el-col>
          <el-col :span="4">Fecha Entrega</el-col>
          <el-col :span="11">
            <el-date-picker v-model="pedido.fechaEntrega"></el-date-picker>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3">Referencia</el-col>
          <el-col :span="5">
            <el-input v-model="pedido.referencia"></el-input>
          </el-col>
          <el-col :span="4">Direccion Entrega</el-col>
          <el-col :span="11">
            <el-select v-model="pedido.direccionEntrega.shipToCode"></el-select>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3">Moneda</el-col>
          <el-col :span="5">{{ pedido.moneda }}&nbsp;</el-col>
          <el-col :span="4">Cliente</el-col>
          <el-col :span="11">
            <el-input v-model="pedido.cliente.cardCode"></el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="5" :offset="8">Nombre Comercial</el-col>
          <el-col :span="8">{{ pedido.cliente.cardFName }}</el-col>
        </el-row>
      </div> <!-- encabezado -->

      <!-- Partidas -->
      <div id="partidas">
        <el-row id="th-partida">
          <el-col :span="4">Codigo</el-col>
          <el-col :span="6">Descripcion</el-col>
          <el-col :span="2">Cantidad</el-col>
          <el-col :span="2">Precio</el-col>
          <el-col :span="2">Impuestos</el-col>
          <el-col :span="2">Total</el-col>
          <el-col :span="2">UM</el-col>
          <el-col :span="2">Existencia</el-col>
          <el-col :span="2">&nbsp;</el-col>
        </el-row>
        <el-row v-for="(partida, index) in pedido.partidas" :key="partida.id">
          <el-col :span="4">{{ partida.itemCode}}</el-col>
          <el-col :span="6">{{ partida.itemName}}</el-col>
          <el-col :span="2">
            <el-input v-model="partida.cantidad" size="mini"
                      @input="recalcular(index)" />
          </el-col>
          <el-col :span="2">{{ partida.precio }}</el-col>
          <el-col :span="2">{{ partida.impuestos }}</el-col>
          <el-col :span="2">{{ partida.total }}</el-col>
          <el-col :span="2">{{ partida.unidadMedida }}</el-col>
          <el-col :span="2">{{ partida.existencia }}</el-col>
          <el-col :span="2">&nbsp;</el-col>
        </el-row>
      </div> <!-- partidas -->

      <!-- totales -->
      <div id="totales">
        <el-row>
          <el-col :span="2" :offset="14">Subtotal</el-col>
          <el-col :span="2">{{ pedido.subTotal }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="2" :offset="14">Impuestos</el-col>
          <el-col :span="2">{{ pedido.impuestos }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="2" :offset="14">Total</el-col>
          <el-col :span="2">{{ pedido.total }}</el-col>
        </el-row>
      </div> <!-- totales -->

      <div id="comentarios">
        <el-row>
          <el-col :span="4">Comentarios</el-col>
          <el-col :span="12">
            <el-input type="textarea"
                      :rows="4" v-model="pedido.comentarios" />
          </el-col>
        </el-row>
      </div>

      <div id="toolbar">
        <el-button type="primary">Guardar</el-button>
        <el-button @click="cancelar">Cancelar</el-button>
      </div>

    </div> <!-- contenido -->
  </div>
</template>

<script>
import * as PedidoService from './PedidoService'

const data = () => {
  return {
    pedido: PedidoService.pedido
  }
}

const metodos = {
  cancelar () {
    this.$router.push('/pedidos-list')
  },
  recalcular (index) {
    console.log(index)
  }
}

export default {
  name: 'Pedido',
  data: data,
  methods: metodos
}
</script>
<style>
  #contenido {
    margin: 0 10px 0 10px;
  }

  #partidas, #encabezado, #comentarios, #toolbar {
    margin: 15px 0 0 0;
    border: solid 1px lightgrey;
    padding: 5px;
  }

  #toolbar {
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
  }
</style>
