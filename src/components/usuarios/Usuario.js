import $ from 'jquery'

const data = () => {
  return {
    usuario: {
      nombres: '',
      apellidos: '',
      vendedor: '',
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
    vendedores: []
  }
}

const methods = {
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
      if (e.status == 401) {
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
      console.log('cargando usuario')
      const usuario = await $.get('/GAPA/vue/usuario/' + this.$props.id)
      console.log('usuario')
      this.usuario = usuario[0]
    } catch (e) {
      if (e.status == 401) {
        this.$message.error('Expiro la sesion')
        this.$router.push('/login')
        return
      }

      this.$message.error('No se pudo leer el usuario')
      this.$router.push('/usuarios-list')
    }
  },
  async loadVendedores() {
    try {
      const respuesta = await $.get('/GAPA/vue/vendedor')
      console.log(JSON.stringify(respuesta))
      this.vendedores = respuesta
    } catch (e) {
      if (e.status == 401) {
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
    console.log('cargando vendedores')
    await this.loadVendedores()
    console.log('fin de carga')
    if (this.$props.id) {
      this.editar()
    }
  }
}
