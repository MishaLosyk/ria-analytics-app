<template>
  <div id="app">
    <div id="nav">
      <router-link style="margin-right:10px" to="/">Конструктор</router-link> 
      <router-link style="margin-right:10px" to="/admin">Адмін панель</router-link>
      <router-link style="margin-right:10px" to="/user">Кабінет користувача</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Montserrat;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  float: right;
}

#nav a {
  font-weight: bold;
  color: #f3f3f3;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
