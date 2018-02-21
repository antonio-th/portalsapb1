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
            <el-col :span="4">Perfil</el-col>
            <el-col :span="6">
              <el-select v-model="usuario.role" @change="changeperfil">
                <el-option value="ROLE_ADMIN">ROLE_ADMIN</el-option>
                <el-option value="ROLE_VENDEDOR">ROLE_VENDEDODR</el-option>
                <el-option value="ROLE_CLIENTE">ROLE_CLIENTE</el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row v-if="usuario.role == 'ROLE_VENDEDOR'">
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

          <el-row v-if="usuario.role == 'ROLE_CLIENTE'">
            <el-col :span="4">Cliente</el-col>
            <el-col :span="18">
              <el-autocomplete style="width: 450px;" v-model="textocliente" :clearable="true"
                               @blur="validacliente" :trigger-on-focus="false"
                               size="mini" :debounce="500" @select="selectcliente"
                               :fetch-suggestions="queryclientes">
                <template slot-scope="props">
                  <div class="opcion-cliente">
                    <div><strong>{{ props.item.cardCode }} {{ props.item.cardFName }}</strong></div>
                    <div class="op-alias">{{ props.item.cardName }}</div>
                  </div>
                </template>
              </el-autocomplete>
              <span id="cliente-label">{{ usuario.cliente.cardCode }} {{ usuario.cliente.cardFName }}</span>
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

<script>
import $ from 'jquery'

const data = () => {
  return {
    usuario: {
      nombres: '',
      apellidos: '',
      vendedor: '',
      cliente: {},
      cardCode: '',
      usuarios: '',
      password: '',
      role: '',
      almacen: '',
      proyecto: '',
      dimension1: '',
      dimension2: '',
      dimension3: '',
      dimension4: '',
      dimension5: ''
    },
    textocliente: '',
    vendedores: []
  }
}

const methods = {
  changeperfil () {
    if (this.usuario.role === 'ROLE_VENDEDOR') {
      this.usuario.cliente = {}
      this.usuario.textocliente = ''
    } else {
      this.usuario.vendedor = ''
    }
  },
  validacliente (event) {
    this.textocliente = this.usuario.cliente.cardName
    this.usuario.cardCode = this.usuario.cliente.cardCode
  },
  selectcliente (cliente) {
    this.usuario.cliente = cliente
    this.usuario.cardCode = cliente.cardCode
  },
  async queryclientes (term, cb) {
    try {
      let respuesta = await $.get('/GAPA/vue/cliente?term=' + term)
      if (respuesta.status === 401) {
        this.$message.error('Expiro la sesion')
        this.$router.push('/login')
        return
      }

      cb(respuesta)
    } catch (e) {
      this.$notify.error({
        title: 'Ocurrio un error',
        message: e
      })
    }
  },
  async guardar () {
    try {
      const respuesta = await $.post('/GAPA/vue/usuario/' + (this.$props.id || ''), this.$data.usuario)
      if (respuesta.success) {
        this.$message.success('El usuario se guardo correctamente')
        this.$router.push('/usuarios-list')
        return
      } else {
        if (respuesta.errores.errors.length > 0) {
          respuesta.errores.errors.map(error => {
            setTimeout(() => {
              this.$notify.error(error.message)
            }, 500)
          })
        } else {
          this.$message.error('El usuario no pudo guardarse')
        }
      }
    } catch (e) {
      if (e.status === 401) {
        this.$message.error('La session expiro')
        this.$router.push('/login')
        return
      }
      this.$message.error('Ocurrio un error: ' + e.message || e.response.statusMessage)
      console.error(e)
    }
  },
  cancelar () {
    this.$router.push('/usuarios-list')
  },
  async editar () {
    try {
      const usuario = await $.get('/GAPA/vue/usuario/' + this.$props.id)
      this.usuario = usuario[0]
      if (this.usuario.cliente) this.textocliente = this.usuario.cliente.cardName
    } catch (e) {
      if (e.status === 401) {
        this.$message.error('Expiro la sesion')
        this.$router.push('/login')
        return
      }

      this.$message.error('No se pudo leer el usuario')
      this.$router.push('/usuarios-list')
    }
  },
  async loadVendedores () {
    try {
      const respuesta = await $.get('/GAPA/vue/vendedor')
      console.log(JSON.stringify(respuesta))
      this.vendedores = respuesta
    } catch (e) {
      if (e.status === 401) {
        this.$message.error('Expiro la sesion')
        this.$router.push('/login')
        return
      }
      this.$message.error('Error al leer el listado de vendedores')
    }
  }
} // metodos

export default {
  name: 'Usuario',
  props: ['id'],
  data: data,
  methods: methods,
  async created () {
    await this.loadVendedores()
    if (this.$props.id) {
      this.editar()
    }
  }
}
</script>
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
  .opcion-cliente {
    font-size: 8pt;
    line-height: 12px;
    border-top: dashed 1px lightgrey;
  }
  .op-alias {
    padding-left: 20px;
  }
  #cliente-label {
    margin: 0 0 0 15px;
  }
</style>
