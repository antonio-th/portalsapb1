<template>
  <div>
    <div>
      <router-link to="/">Inicio</router-link>
      <router-link to="/usuario">Nuevo Usuario</router-link>
    </div>
    <h4>Usuarios</h4>
    <el-table :data="usuarios" size="small">
      <el-table-column prop="username" label="Usuario"></el-table-column>
      <el-table-column prop="nombres" label="Nombre" width="180"></el-table-column>
      <el-table-column prop="role" label="Perfil"></el-table-column>
      <el-table-column prop="dateCreated" label="Alta"
                       :formatter="ffecha" width="180" />
      <el-table-column prop="lastUpdated" label="Actualizacion"
                       :formatter="ffecha" width="180" />
      <el-table-column>
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
</template>

<script src="./UsuariosList.js"></script>
