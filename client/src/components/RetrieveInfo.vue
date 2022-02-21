<template>
  <section class="idInput">
    <br><br>
    <img alt="TypeIt" src="../assets/retrieveLogo_256x256.png">
    <div class="input">
      <h3>{{prompt}}</h3>
      <input type="tel" v-model="id" placeholder="code" pattern="[0-9]+" v-autowidth="{
          minWidth: '100px',
          maxWidth: '150px',
          comfortZone: '1ch'}"> <br><br>
      <button @click="retrieveInfo">Obtain info</button> <br><br>
      <label v-if="validReturn">Name: {{name}}</label>
      <label v-else></label> <br><br>
      <label v-if="validReturn">Email: {{email}}</label>
      <label v-else></label> <br><br>
      <label v-if="validReturn">Phone number: {{phone}}</label>
      <label v-else></label> <br><br>
      <label ref='resultLabel'><em></em></label>
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
      prompt: 'Enter a code to retrieve its associated info',

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
            this.$refs.resultLabel.textContent = response.data.error
            throw new Error(response.data.error)
          } else {
            const info = response.data.userInfo
            this.name = info.name
            this.email = info.email
            this.phone = info.phone
            this.validReturn = true
            this.$refs.resultLabel.textContent = response.data.result
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
