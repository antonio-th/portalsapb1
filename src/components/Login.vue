<template>
  <div>
    <el-row type="flex" justify="center" id="login">
      <el-col :span="12">

        <el-card id="login-card">
          <div slot="header">
            <h3>Inicio de Sesion</h3>
          </div>

          <form @keyup.enter="login">
          <el-row>
            <el-col :span="8" :offset="2">Usuario</el-col>
            <el-col :span="12">
              <el-input auto-complete="false" v-model="username" :autofocus="true">
              </el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top: 15px;">
            <el-col :span="8" :offset="2">Password</el-col>
            <el-col :span="12">
              <el-input type="password" v-model="password" />
            </el-col>
          </el-row>
          <el-row id="login-barra" type="flex" justify="center">
            <el-col :span="4">
              <el-button type="primary" @click="login">
                Ingresar</el-button>
            </el-col>
          </el-row>
          </form>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import $ from 'jquery'

const metodos = {
  async login () {
    try {
      const params = {
        j_username: this.$data.username,
        j_password: this.$data.password
      }
      const url = '/GAPA/j_spring_security_check'

      try {
        await $.post(url, params) // **hack
      } catch (e) {
        console.log(e.message)
      }
      const respuesta = await $.post(url, params)

      /*   LOGIN EXITOSO  */
      if (respuesta.success) {
        const queryPrincipal = await $.get('/GAPA/vue/principal')
        this.$store.commit('login', queryPrincipal)
        this.$router.push('/menu')
        return
      }

      /*  OCURRIO UN ERROR  */
      if (respuesta.error) {
        this.$message.error('Usuario o password Incorrectos')
      } else {
        this.$message.error('Ocurrio un error desconocido')
        console.log(respuesta)
      }
    } catch (e) {
      this.$message.error('Ocurrio un error de red')
    }
  } // login
}

export default {
  name: 'Login',
  data: () => {
    return {
      username: '',
      password: ''
    }
  },
  methods: metodos
}
</script>

<style>
  html, body {
    height: 100%;
  }

  #login-barra {
    margin: 30px 0 0 0;
  }
  #login-card {
    max-width: 450px;
    margin-top: 50px;
  }
</style>
