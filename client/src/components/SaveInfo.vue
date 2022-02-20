<template>
  <section class="infoInput">
    <img alt="TypeIt" src="../assets/saveLogo_256x256.png">
    <div class="input">
      <h3>{{prompt}}</h3>
      <input type="text" v-model="name" placeholder="Name" v-autowidth="{
      minWidth: '100px',
      maxWidth: '300px',
      comfortZone: '1ch'}"> <br>
      <input type="email" v-model="email" placeholder="Email" v-autowidth="{
      minWidth: '100px',
      maxWidth: '300px',
      comfortZone: '1ch'}"> <br>
      <input type="tel" v-model="phone" placeholder="Phone #" v-autowidth="{
      minWidth: '100px',
      maxWidth: '300px',
      comfortZone: '1ch'}"> <br><br>
      <button @click="generateId">Generate code</button> <br><br>
      <label v-if="validReturn"><em>{{infoSaved}}<b>{{id}}</b></em></label>
      <label v-else><em>Waiting to generate ID...</em></label> <br><br>
      <label ref='resultLabel'><em>API call messages</em></label>
    </div>
  </section>
</template>

<script>
import { directive as VueInputAutowidth } from 'vue-input-autowidth'
const axios = require('axios')

export default {
  directives: { autowidth: VueInputAutowidth },
  setup () {

  },
  data () {
    return {
      // UI variables
      prompt: 'Enter your info below to generate a code',
      infoSaved: 'Here is your ID: ',

      // Data variables
      idResult: null,
      name: '',
      email: '',
      phone: '',
      id: '',

      // API variables
      validReturn: false
    }
  },
  mounted: function () {
  },
  name: 'SaveInfo',
  methods: {
    generateId () {
      // 'save info' API endpoint
      axios.post('http://localhost:3000/saveInfo', {
        name: this.name,
        email: this.email,
        phone: this.phone
      })
        .then(response => {
          if (response.status === '409') {
            this.validReturn = false
            this.$refs.resultLabel.textContent = response.data.error
            throw new Error(response.data.error)
          } else {
            this.id = response.data.id
            this.validReturn = true
            this.$refs.resultLabel.textContent = response.data.result
          }
        })
        .catch(error => {
          this.$refs.resultLabel.textContent = error
        })
    }
  }
}
</script>

<style scoped>
button {
  font-weight: bold;
}
</style>
