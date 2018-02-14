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
                           header-align="center" />
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
        <el-pagination :total="totalUsuarios" :page-size="pageSize"
                       @current-change="pageChanged"
                       layout="total, prev, pager, next" />
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery'
import moment from 'moment'

const metodos = {
  login () {
    $.post('/GAPA/j_spring_security_check', {j_username: 'admin', j_password: 'qazpoi99'})
  },
  async consultar () {
    try {
      const offset = (this.$data.currentPage - 1) * this.$data.pageSize
      const params = {max: this.$data.pageSize, offset: offset}
      const respuesta = await $.get('/GAPA/vue/usuario', params)
      this.$data.usuarios = respuesta.listado
      this.$data.totalUsuarios = respuesta.total
    } catch (e) {
      if (e.status === 401) {
        this.$message.error('Expiro la sesion')
        this.$router.push('/login')
      }
    }
  },
  ffecha (row, column, cellValue) {
    return moment(cellValue).format('DD-MM-YYYY')
  },
  prueba () {
    var config = {
      type: 'DELETE'
    }
    $.ajax('/GAPA/vue/prueba', config)
  },
  editar (index, row) {
    this.$router.push({ name: 'Usuario', params: { id: row.id } })
  },
  pageChanged (currentPage) {
    this.$data.currentPage = currentPage
    this.consultar()
  }
}

export default {
  name: 'UsuariosList',
  data () {
    return {
      usuarios: [],
      pageSize: 10,
      currentPage: 1,
      totalUsuarios: 0
    }
  },
  methods: metodos,
  created () {
    this.consultar()
  }
} // component
</script>
<style>
  #tabla {
    /* margin: 0 20px 0 20px; */
  }

  #contenido {
    margin: 0 20px 0 20px;
  }
</style>
