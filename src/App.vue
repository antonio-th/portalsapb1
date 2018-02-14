<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="12">
          <el-row type="flex">
            <el-col :span="3">
              <router-link to="/">LOGO</router-link>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="end">
            <el-col :span="3">
              <a href="#" @click="logout">Salir</a>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import $ from 'jquery'

export default {
  name: 'App',
  methods: {
    logout () {
      // $.post('/GAPA/j_spring_security_logout')
      this.$router.push('/login')
    }
  }
}
</script>
