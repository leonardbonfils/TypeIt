<template>
  <section class='main'>
    <div class='save'>
        <img alt="TypeIt" src="./assets/logo.png">
        <SaveInfo welcome="Welcome to TypeIt!"/>
    </div>
    <!-- <div class='retrieve'>
        <RetrieveInfo/>
    </div> -->
  </section>
</template>

<script>
import SaveInfo from './components/SaveInfo.vue'
// import RetrieveInfo from './components/RetrieveInfo.vue'

export default {
  name: 'App',
  components: {
    SaveInfo
  }
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
