<template>
  <div>
    <h4>Menu</h4>

    <ul>
      <li>
        <router-link to="/pedidos-list">Pedidos</router-link>
      </li>
      <li>
        <router-link to="/usuarios-list">Usuarios</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Default'
}
</script>
