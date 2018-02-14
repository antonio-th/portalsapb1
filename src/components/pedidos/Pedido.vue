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
        <el-row :gutter="15">
          <el-col :span="3">Docnum</el-col>
          <el-col :span="5">{{ pedido.docNum || '&nbsp;'}}&nbsp;</el-col>
          <el-col :span="4">Fecha Pedido</el-col>
          <el-col :span="11">{{ pedido.fechaPedido }}&nbsp;</el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="3">Estatus</el-col>
          <el-col :span="5">{{ pedido.estatus || '&nbsp;' }}&nbsp;</el-col>
          <el-col :span="4">Fecha Entrega</el-col>
          <el-col :span="11">
            <el-date-picker></el-date-picker>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="3">Referencia</el-col>
          <el-col :span="5">
            <el-input></el-input>
          </el-col>
          <el-col :span="4">Direccion Entrega</el-col>
          <el-col :span="11">
            <el-date-picker></el-date-picker>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="3">Moneda</el-col>
          <el-col :span="5">{{ pedido.moneda }}&nbsp;</el-col>
          <el-col :span="4">Cliente</el-col>
          <el-col :span="11">
            <el-date-picker></el-date-picker>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="5" :offset="8">Nombre Comercial</el-col>
          <el-col :span="8"></el-col>
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
      <div id="totales">
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
      </div> <!-- totales -->

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

    </div> <!-- contenido -->
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

  #encabezado {
    padding: 15px 0 15px 10px;
  }
</style>
