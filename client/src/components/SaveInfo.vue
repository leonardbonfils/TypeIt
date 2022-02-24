<template>
  <section class="infoInput">
    <br><br>
    <img alt="TypeIt" src="../assets/saveLogo_256x256.png">
    <div class="input">
      <h3>{{prompt}}</h3>
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px">
        <el-form-item label="Name">
          <el-input v-model="formLabelAlign.name" placeholder="John Doe"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="formLabelAlign.region" placeholder="john.doe@gmail.com"></el-input>
        </el-form-item>
        <el-form-item label="Phone #">
          <el-input v-model="formLabelAlign.type" placeholder="+1 (123) 456-7890"></el-input>
        </el-form-item>
      </el-form>
      <label v-if="validReturn"><em>{{infoSaved}}</em><b>{{id}}</b><br><br></label>
      <label v-else><br><br></label>
      <el-button @click="generateId" type="primary" round>1. Generate ID</el-button>
      <el-button @click="copyToClipboard" type="primary" round>2. Copy ID</el-button> <br><br>
      <label v-if="idCopied">{{idCopiedMsg}}</label>
      <label v-else></label> <br><br>
      <label ref='resultLabel'><em></em></label>
      <div style="margin: 20px"></div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="No info was entered"
      width="20%"
      center=true
      :before-close="handleClose">
      <span>Please enter a name, an email or a phone number.</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">OK</el-button>
        </span>
      </template>
    </el-dialog>
  </section>
</template>

<script>
import { directive as VueInputAutowidth } from 'vue-input-autowidth'
import { reactive } from 'vue'
const axios = require('axios')

export default {
  directives: { autowidth: VueInputAutowidth },
  setup () {

  },
  data () {
    return {
      // UI variables
      prompt: 'Enter your info below to generate an ID',
      infoSaved: 'Here is your ID: ',
      idCopiedMsg: 'ID copied!',
      idCopied: false,
      dialogVisible: false,
      labelPosition: 'right',

      formLabelAlign: reactive({
        name: '',
        email: '',
        phone: ''
      }),

      // Data variables
      idResult: null,
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
      if (this.formLabelAlign.name === '' && this.formLabelAlign.email === '' && this.formLabelAlign.phone === '') {
        this.dialogVisible = true
        return
      }
      // 'save info' API endpoint
      axios.post('http://localhost:3000/saveInfo', {
        name: this.formLabelAlign.name,
        email: this.formLabelAlign.email,
        phone: this.formLabelAlign.phone
      })
        .then(response => {
          if (response.status === 409) {
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
    },
    copyToClipboard () {
      var copyText = this.id
      navigator.clipboard.writeText(copyText.valueOf())
        .then(this.idCopied = true)
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

#infoInput {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
}

</style>
