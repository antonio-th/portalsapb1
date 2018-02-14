<template>
  <div>
    <div>
      <router-link to="/">Inicio</router-link>
      <router-link to="/pedido">Nuevo Pedido</router-link>
    </div>
    <h4>Pedidos</h4>

    <el-row>
      <el-col :span="24">Fecha de Enrega
        <el-date-picker v-model="filtros.fecha1" style="width: 130px"
          class="spacer">
        </el-date-picker>
         al
        <el-date-picker v-model="filtros.fecha2" style="width: 130px">
        </el-date-picker>
        <span class="spacer">Estatus</span>
        <el-select style="width: 130px" v-model="filtros.estatus"
          :clearable="true">
          <el-option value="Capturando">Capturando</el-option>
          <el-option value="Enviado">Enviado</el-option>
        </el-select>
        <el-button type="primary" class="spacer">Buscar</el-button>
        <el-button @click="limpiar">Limpiar</el-button>
      </el-col>
    </el-row>

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
</template>

<script src="./PedidosList.js" />

<style>
  .spacer {
    margin: 0 0 0 15px;
  }
</style>
