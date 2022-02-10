<template>
  <section class="infoInput">
    <div class="welcome">
      <h1>{{welcome}}</h1>
    </div>
    <div class="input">
      <h3>{{prompt}}</h3>
      <input v-model="name" placeholder="Full name"> <br>
      <input type="email" v-model="email" placeholder="Email"> <br>
      <input type="tel" v-model="phone" placeholder="Phone number"> <br>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      // UI variables
      prompt: 'Enter any of the info below to generate a code',
      infoSaved: 'Here is your ID: ',

      // Data variables
      name: '',
      email: '',
      phone: '',
      id: ''
    }
  },
  name: 'SaveInfo',
  props: {
    welcome: String
  }
}
</script>

<style scoped>

</style>
