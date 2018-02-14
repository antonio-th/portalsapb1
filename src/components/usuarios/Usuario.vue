<template>
    <div>
      <div>
        <router-link to="/">Inicio</router-link>
        <router-link to="/usuarios-list">Listado</router-link>
      </div>
      <h4>Usuario</h4>

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
          <el-select v-model="usuario.rol">
            <el-option value="ROL_ADMIN">ROL_ADMIN</el-option>
            <el-option value="ROL_VENDEDOR">ROL_VENDEDODR</el-option>
          </el-select>
        </el-col>
      </el-row>

      <br />

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

      <br />

      <el-row>
        <el-button type="primary" @click="guardar">Guardar</el-button>
        <el-button @click="cancelar">Cancelar</el-button>
      </el-row>

    </div>
</template>

<script src="./Usuario.js"></script>
