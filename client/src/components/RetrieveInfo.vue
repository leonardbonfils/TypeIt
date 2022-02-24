<template>
  <section class="idInput">
    <br><br>
    <img alt="TypeIt" src="../assets/retrieveLogo_256x256.png">
    <div class="input">
      <h3>{{prompt}}</h3>
      <input type="tel" v-model="id" placeholder="ID" pattern="[0-9]+" v-autowidth="{
          minWidth: '60px',
          maxWidth: '100px',
          comfortZone: '0px'}"> <br><br>
      <el-button @click="retrieveInfo" type="warning" round>Get info</el-button> <br><br>
      <label v-show="validReturn">Name: {{name}}</label> <br><br>
      <label v-show="validReturn">Email: {{email}}</label> <br><br>
      <label v-show="validReturn">Phone number: {{phone}}</label> <br><br>
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
      prompt: 'Enter an ID below to retrieve its associated info',

      // Data variables
      infoResult: null,
      name: '',
      email: '',
      phone: '',
      id: 0,

      // API variables
      validReturn: false
    }
  },
  mounted: function () {
  },
  name: 'RetrieveInfo',
  methods: {
    retrieveInfo () {
      if (this.id === '') {
        alert('Please enter an ID.')
        return
      }

      // 'retrieve info' API endpoint
      const idAsInt = parseInt(this.id)
      axios.post('http://localhost:3000/retrieveInfo', {
        id: idAsInt
      })
        .then(response => {
          if (response.status !== 200) {
            this.validReturn = false
            throw new Error(response.data.error)
          } else {
            this.validReturn = true
            const info = response.data.userInfo
            this.name = info.name
            this.email = info.email
            this.phone = info.phone
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
:root {
  --el-color-primary: #77b3d4;
  --el-color-success: #67c23a;
  --el-color-warning: #e6a23c;
  --el-color-danger: #f56c6c;
  --el-color-error: #f56c6c;
  --el-color-info: #909399;
}
button {
  font-weight: bold;
}

</style>
