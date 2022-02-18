<template>
  <section class='app'>
    <div id='nav'>
      <router-link to='/'>TypeIt</router-link> |
      <router-link to='/saveInfo'>Save Info</router-link>
      <router-link to='/retrieveInfo'>Retrieve Info</router-link>
    </div>
    <!-- <div id='save'>
        <img alt="TypeIt" src="./assets/logo.png">
        <SaveInfo welcome="Welcome to TypeIt!"/>
    </div> -->
    <router-view />
  </section>
</template>

<script>
// import SaveInfo from './components/SaveInfo.vue'

export default {
  name: 'App'
  // components: {
  //   SaveInfo
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
