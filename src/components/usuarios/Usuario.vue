<template>
    <div id="Usuario">
      <!-- Tool bar -->
      <div class="nav">
        <span class="menuButton"><router-link to="/menu" class="home">Inicio</router-link></span>
        <span class="menuButton"><router-link to="/usuarios-list" class="list">Listado</router-link></span>
      </div>

      <!-- Contenido -->
      <div id="contenido">
        <h1>Usuario</h1>

        <div id="principal">
          <el-row>
            <el-col :span="4">Nombres</el-col>
            <el-col :span="6">
              <el-input v-model="usuario.nombres" id="nombres"></el-input>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4">Apellidos</el-col>
            <el-col :span="6">
              <el-input v-model="usuario.apellidos"></el-input>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4">Vendedor</el-col>
            <el-col :span="6">
              <el-select v-model="usuario.vendedor" :clearable="true">
                <el-option
                  v-for="vendedor in vendedores"
                  :key="vendedor.slpCode"
                  :label="vendedor.slpName"
                  :value="vendedor.slpCode"
                />
              </el-select>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4">Usuario</el-col>
            <el-col :span="6">
              <el-input v-model="usuario.username" v-bind:readonly="id != null"></el-input>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4">Password</el-col>
            <el-col :span="6">
              <el-input v-model="usuario.password"></el-input>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4">Perfil</el-col>
            <el-col :span="6">
              <el-select v-model="usuario.role">
                <el-option value="ROLE_ADMIN">ROLE_ADMIN</el-option>
                <el-option value="ROLE_VENDEDOR">ROLE_VENDEDODR</el-option>
              </el-select>
            </el-col>
          </el-row>
        </div> <!-- principal -->

        <div id="costos">
          <el-row>
            <el-col :span="4">Almacen</el-col>
            <el-col :span="6">
              <el-input v-model="usuario.almacen"></el-input>
            </el-col>
            <el-col :span="4" :offset="1">Proyecto</el-col>
            <el-col :span="4">
              <el-input v-model="usuario.proyecto"></el-input>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4">Dimension 1</el-col>
            <el-col :span="6">
              <el-input v-model="usuario.dimension1"></el-input>
            </el-col>
            <el-col :span="4" :offset="1">Dimension 4</el-col>
            <el-col :span="4">
              <el-input v-model="usuario.dimension4"></el-input>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4">Dimension 2</el-col>
            <el-col :span="6">
              <el-input v-model="usuario.dimension2"></el-input>
            </el-col>
            <el-col :span="4" :offset="1">Dimension 5</el-col>
            <el-col :span="4">
              <el-input v-model="usuario.dimension5"></el-input>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4">Dimension 3</el-col>
            <el-col :span="6">
              <el-input v-model="usuario.dimension3"></el-input>
            </el-col>
            <el-col :span="4" :offset="1"></el-col>
          </el-row>
        </div> <!-- costos -->

        <div id="barra">
          <el-row>
            <el-button type="primary" @click="guardar">Guardar</el-button>
            <el-button @click="cancelar">Cancelar</el-button>
          </el-row>
        </div>

      </div> <!-- contenido -->
    </div>
</template>

<script src="./Usuario.js"></script>
<style>
  #contenido {
    margin: 0 20px 0 20px;
  }

  #principal, #costos, #barra {
    border: solid 1px lightgrey;
    margin: 10px 0 0 0;
    padding: 10px;
    max-width: 1000px;
  }
</style>
