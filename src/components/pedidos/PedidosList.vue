<template>
  <div id="pedidos-list">
    <!-- Tool bar -->
    <div class="nav">
      <span class="menuButton"><router-link to="/" class="home">Inicio</router-link></span>
      <span class="menuButton"><router-link to="/pedido" class="create">Nuevo Pedido</router-link></span>
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
            </el-select>
            <el-button type="primary" class="spacer">Buscar</el-button>
            <el-button @click="limpiar">Limpiar</el-button>
          </el-col>
        </el-row>
      </div>

      <div id="listado">
        <el-table :data="pedidos">
          <el-table-column prop="docNum" label="DocNum"></el-table-column>
          <el-table-column prop="razonSocial" label="Razon Social"></el-table-column>
          <el-table-column prop="alias" label="Nombre Comercial" width="130">
          </el-table-column>
          <el-table-column prop="monto" label="Monto"></el-table-column>
          <el-table-column prop="fechaPedido" label="Fecha Pedido"></el-table-column>
          <el-table-column prop="fechaEntrega" label="Fecha Entrega"></el-table-column>
          <el-table-column prop="referencia" label="Referencia"></el-table-column>
          <el-table-column prop="estatus" label="Estatus"></el-table-column>
        </el-table>

        <el-pagination :total="totalPedidos" :page-size="15"
                       layout="total, prev, pager, next">
        </el-pagination>
      </div>

    </div> <!-- contenido -->
  </div>
</template>

<script src="./PedidosList.js" />

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
</style>
