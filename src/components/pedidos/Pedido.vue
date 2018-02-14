<template>
  <div>
    <div>
      <router-link to="/">Inicio</router-link>
      <router-link to="/pedidos-list">Listado</router-link>
    </div>
    <h4>Pedido</h4>

    <!-- Encabezado -->
    <div id="encabezado">
    <el-row :gutter="15">
      <el-col :span="4">Docnum</el-col>
      <el-col :span="4">{{ pedido.docNum }}&nbsp;</el-col>
      <el-col :span="4">Fecha Pedido</el-col>
      <el-col :span="12">{{ pedido.fechaPedido }}&nbsp;</el-col>
    </el-row>

    <el-row :gutter="15">
      <el-col :span="4">Estatus</el-col>
      <el-col :span="4">{{ pedido.estatus }}&nbsp;</el-col>
      <el-col :span="4">Fecha Entrega</el-col>
      <el-col :span="12">
        <el-date-picker></el-date-picker>
      </el-col>
    </el-row>

    <el-row :gutter="15">
      <el-col :span="4">Referencia</el-col>
      <el-col :span="4">
        <el-input></el-input>
      </el-col>
      <el-col :span="4">Direccion Entrega</el-col>
      <el-col :span="12">
        <el-date-picker></el-date-picker>
      </el-col>
    </el-row>

    <el-row :gutter="15">
      <el-col :span="4">Moneda</el-col>
      <el-col :span="4">{{ pedido.moneda }}&nbsp;</el-col>
      <el-col :span="4">Cliente</el-col>
      <el-col :span="12">
        <el-date-picker></el-date-picker>
      </el-col>
    </el-row>

    <el-row :gutter="15">
      <el-col :span="4" :offset="8">Nombre Comercial</el-col>
      <el-col :span="12"></el-col>
    </el-row>
    </div> <!-- encabezado -->

    <!-- Partidas -->
    <div id="partidas">
    <el-row>
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
    </div> <!-- partidas -->

    <!-- totales -->
    <el-row>
      <el-col :span="2" :offset="14">Subtotal</el-col>
      <el-col :span="2">0.0</el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="14">Impuestos</el-col>
      <el-col :span="2">0.0</el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="14">Total</el-col>
      <el-col :span="2">0.0</el-col>
    </el-row>

    <div id="comentarios">
    <el-row>
      <el-col :span="4">Comentarios</el-col>
      <el-col :span="12">
        <el-input type="textarea" :rows="4"></el-input>
      </el-col>
    </el-row>
    </div>

    <div id="toolbar">
      <el-button type="primary">Guardar</el-button>
      <el-button @click="cancelar">Cancelar</el-button>
    </div>

  </div>
</template>

<script src="./Pedido.js" />
<style>
  #partidas, #encabezado, #comentarios, #toolbar {
    margin: 15px 0 0 0;
    border: solid 1px lightgrey;
    padding: 5px;
  }

  #toolbar {
    padding: 10px 0 10px 15px;
  }
</style>
