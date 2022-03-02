<template>
  <section class="infoInput">
    <br><br>
    <img alt="TypeIt" src="../assets/saveLogo_256x256.png"><br><br>
    <div class="input">
      <h3>{{prompt}}</h3>
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 200px, margin: 0 auto">
        <el-form-item label="Name">
          <el-input v-model="formLabelAlign.name" placeholder="John Doe"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="formLabelAlign.email" placeholder="john.doe@gmail.com"></el-input>
        </el-form-item>
        <el-form-item label="Phone #">
          <el-input v-model="formLabelAlign.phone" placeholder="+1 (123) 456-7890"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="generateId" type="primary" round>1. Generate ID</el-button><br><br>
      <transition name='fade'>
        <div v-show='validReturn'>
          <el-descriptions
            class="margin-top"
            :column="1"
            :size="size"
            border
          >
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  ID
                </div>
              </template>
              {{id}}
            </el-descriptions-item>
          </el-descriptions>
          <el-button @click="copyToClipboard" type="primary" round>2. Copy ID</el-button>
        </div>
      </transition>
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
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
const axios = require('axios')

export default {
  setup () {

  },
  data () {
    return {
      // UI variables
      prompt: 'Enter your info below to generate an ID',
      idCopiedMsg: 'ID copied to clipboard',
      noIdToCopyMsg: 'You must generate an ID before you can copy it.',
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
            throw new Error(response.data.error)
          } else {
            this.id = response.data.id
            this.validReturn = true
            ElMessage({
              showClose: true,
              message: response.data.result,
              type: 'success'
            })
          }
        })
        .catch(error => {
          console.log(error)
          ElMessage({
            showClose: true,
            message: 'Error generating ID.',
            type: 'error'
          })
        })
    },
    copyToClipboard () {
      if (this.id === '') {
        ElMessage({
          showClose: true,
          message: this.noIdToCopyMsg,
          type: 'error'
        })
        return
      }
      var copyText = this.id
      navigator.clipboard.writeText(copyText.valueOf())
        .then(ElMessage({
          showClose: true,
          message: this.idCopiedMsg,
          type: 'success'
        }))
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

.infoInput {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
}

.el-descriptions {
  margin-top: 20px;
  margin-right: 150px;
}
.cell-item {
  display: flex;
  align-items: center;
  margin-left: 150px;
}
.margin-top {
  margin-top: 40px;
}

.el-button {
  margin-top: 20px;
}

</style>
