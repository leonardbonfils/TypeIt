<template>
  <section class="idInput">
    <img alt="TypeIt" src="../assets/retrieveLogo_256x256.png">
    <div class="input">
      <h3>{{prompt}}</h3>
      <input type="number" v-model="id" placeholder="1234" v-autowidth="{
          minWidth: '100px',
          maxWidth: '150px',
          comfortZone: '1ch'}"> <br>
      <button @click="retrieveInfo">Obtain info</button> <br><br>
      <label v-if="validReturn">Name: {{name}}</label>
      <label v-else>Name: </label>
      <label v-if="validReturn">Email: {{email}}</label>
      <label v-else>Email: </label>
      <label v-if="validReturn">Phone number: {{phone}}</label>
      <label v-else>Phone number: </label>
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
      prompt: 'Enter an ID to retrieve its associated info',

      // Data variables
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
  },
  name: 'RetrieveInfo',
  methods: {
    retrieveInfo () {
      // 'retrieve info' API endpoints
      axios.post('http://localhost:3000/retrieveInfo', {
        id: this.id
      })
        .then(response => {
          if (response.status !== '200') {
            this.validReturn = false
            throw new Error(response.data.error)
          } else {
            this.name = response.data.name
            this.email = response.data.email
            this.phone = response.data.phone
            this.validReturn = true
          }
        })
        .catch(error => {
          console.log(error)
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
