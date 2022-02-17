<template>
  <section class="infoInput">
    <div class="welcome">
      <h1>{{welcome}}</h1>
    </div>
    <div class="input">
      <h3>{{prompt}}</h3>
      <input v-model="name" placeholder="Full name"> <br>
      <input type="email" v-model="email" placeholder="Email"> <br>
      <input type="tel" v-model="phone" placeholder="Phone number"> <br><br>
      <button @click="generateId">Generate code</button> <br><br>
      <label v-if="validReturn">Here is your ID: {{id}}</label>
      <label v-else><em>Waiting to generate ID...</em></label>
    </div>
  </section>
</template>

<script>
// import { axios } from 'axios'
const axios = require('axios')

export default {
  data () {
    return {
      // UI variables
      prompt: 'Enter your info below to generate a code',
      infoSaved: 'Here is your ID: ',
      confirmMessage: 'Information successfully processed.',
      failureMessage: 'Information failed to be processed',

      // Data variables
      idResult: null,
      infoResult: null,
      name: '',
      email: '',
      phone: '',
      id: '',

      // API variables
      validReturn: false
    }
  },
  mounted: function () {
    window.vue = this
    axios.get('http://localhost:3000/test')
      .then(response => {
        console.log(response.data)
        this.email = response
      })
      .catch(error => {
        console.log(error)
      })
  },
  name: 'SaveInfo',
  props: {
    welcome: String
  },
  methods: {
    generateId () {
      // call API endpoints
    }
  }
}
</script>

<style scoped>
button {
  font-weight: bold;
}
</style>
