<template>
  <div>
    <!-- Toolbar -->
    <div class="nav">
      <span class="menuButton">
        <router-link to="/" class="home">Inicio</router-link>
      </span>
      <span class="menuButton">
        <router-link to="/usuario" class="create">Nuevo Usuario</router-link>
      </span>
    </div>

    <div id="contenido">
      <h1>Usuarios</h1>
      <div id="tabla">
        <el-table :data="usuarios" :stripe="true" :border="true" size="mini">
          <el-table-column prop="username" label="Usuario"
              header-align="center" />
          <el-table-column prop="nombres" label="Nombre"
                           header-align="center" width="200px" />
          <el-table-column prop="role" label="Perfil" :fit="true"
                           header-align="center" />
          <el-table-column prop="dateCreated" label="Alta"
                           align="center"
                           :formatter="ffecha" :fit="true" />
          <el-table-column prop="lastUpdated" label="Actualizacion"
                           align="center"
                           :formatter="ffecha" :fit="true" />
          <el-table-column v-bind:width="60">
            <template slot-scope="scope">
              <el-button @click="editar(scope.$index, scope.row)">
                <i class="el-icon-edit"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :total="totalUsuarios" :page-size="20" layout="total, prev, pager, next">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script src="./UsuariosList.js"></script>
<style>
  #tabla {
    /* margin: 0 20px 0 20px; */
  }

  #contenido {
    margin: 0 20px 0 20px;
  }
</style>
