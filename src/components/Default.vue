<template>
  <div>
    <div class="nav">
      <span class="menuButton"></span>
    </div>
    <div class="body">
      <h1>GAPA</h1>
      <br />
      <h3>Bienvenido al Portal de Pedidos</h3>
      <br />
      <div id="menu" style="margin-left: 200px; width: 550px;">
        <div class="opcion">
          <router-link to="/pedidos-list">
            <img src="../assets/img/pedidos.png">
            <div class="texto-opcion">Pedidos</div>
          </router-link>
        </div>
        <div class="opcion" v-if="isAdmin">
          <router-link to="/usuarios-list">
            <img src="../assets/img/usuarios.png" />
            <div class="texto-opcion">Usuarios</div>
          </router-link>
        </div>
        <div class="opcion">
          <router-link to="/existencias">
            <img src="../assets/img/stock.png">
            <div class="texto-opcion">Existencias</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Default',
  computed: {
    isAdmin () {
      return this.$store.state.usuario.role === 'ROLE_ADMIN'
    }
  }
}
</script>
<style>
  .opcion {
    display: inline-block;
    border: solid #909090 2px;;
    box-shadow: 3px 3px;
    border-radius: 25px;
    width: 130px;
    text-align: center;
    vertical-align: middle;
    margin-left: 15px;
    margin-top: 15px;
    padding: 10px;
  }

  .opcion :hover {
    color: green;
  }

  .texto-opcion {
    font-family: Verdana;
    font-size: 18px;
  }
  h3 {
    font-weight: 400;
  }
</style>
