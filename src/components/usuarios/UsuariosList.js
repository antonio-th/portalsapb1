import * as Usuario from './UsuarioService.js'
import $ from 'jquery'
import moment from 'moment'

const metodos = {
  login () {
    $.post('/GAPA/j_spring_security_check', {j_username: 'admin', j_password: 'qazpoi99'})
  },
  async consultar() {
    try {
      const respuesta = await $.get('/GAPA/vue/usuario')
      this.$data.usuarios = respuesta
    } catch (e) {
      if (e.status == 401) {
        this.$message.error('Expiro la sesion')
        this.$router.push('/login')
        return
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
    this.$router.push({name: 'Usuario', params: {id: row.id}})
  }
}

export default {
  name: 'UsuariosList',
  data () {
    return {
      usuarios: []
    }
  },
  computed: {
    totalUsuarios () {
      return this.$data.usuarios.length
    }
  },
  methods: metodos,
  created () {
    this.consultar()
  }
} // component
