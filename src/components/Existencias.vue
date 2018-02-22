<template>
  <div id="existencias">
    <!-- Toolbar -->
    <div class="nav">
      <span class="menuButton">
        <router-link to="/menu" class="home">Inicio</router-link>
      </span>
    </div>

    <div id="contenido">
      <h1>Consulta de Existencias</h1>

      <div id="form">
      <el-form :inline="true" :model="consulta">
        <el-form-item label="Buscar">
          <el-input v-model="consulta.texto"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="buscar" :disabled="mintexto">Buscar</el-button>
          <span class="text-smaller">(* minimo 3 caracteres)</span>
        </el-form-item>
      </el-form>
      </div>

      <div id="resultados">
        <el-table :data="productos" :stripe="true" :border="true">
          <el-table-column prop="itemCode" label="Codigo Producto"></el-table-column>
          <el-table-column prop="itemName" label="Descripcion"></el-table-column>
          <el-table-column prop="cantidad" label="Cantidad"></el-table-column>
          <el-table-column prop="unidadMedida" label="Unidad Medida"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import _ from 'lodash'

export default {
  name: 'Existencias',
  data () {
    return {
      consulta: {
        texto: ''
      },
      productos: []
    }
  },
  computed: {
    mintexto () {
      return this.consulta.texto.length < 3
    }
  },
  methods: {
    async buscar () {
      if (this.consulta.texto.length < 3) {
        this.$message.warning('Debe teclear al menos 3 caracteres ' + JSON.stringify(this.consulta))
        return
      }

      try {
        const response = await $.get('/GAPA/vue/existencia', this.consulta)
        this.productos = response
        if (_.isArray(response) && response.length === 0) {
          this.$notify.info('No se encontraron resultados')
        }
      } catch (e) {
        this.error(e)
      }
    },
    error (e) {
      if (e.status === 401) {
        this.$message.error('Expiro la sesion')
        this.$router.push('/login')
      } else {
        this.$notify.error({
          title: 'Ocurrio un error',
          message: e
        })
      }
    }
  }
}
</script>
<style>
  #contenido {
    margin: 0 10px 0 10px;
  }
  #form {
    margin: 20px 0 0 0;
  }
  .text-smaller {
    font-size: 8pt;
  }
</style>
