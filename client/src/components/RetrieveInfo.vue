<template>
  <section class="idInput">
    <br><br>
    <img alt="TypeIt" src="../assets/retrieveLogo_256x256.png"><br><br>
    <div class="input">
      <h3>{{prompt}}</h3>
      <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 10px, margin: 0 auto">
        <el-form-item label="ID">
          <el-input v-model="id" type="tel" placeholder="1234"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="retrieveInfo" type="warning" round>Get info</el-button>
      <br><br>
      <transition name='fade'>
      <div v-show='validReturn'>
        <el-descriptions
          class="margin-top"
          title="User information"
          :column="1"
          :size="size"
          border
        >
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <user />
                </el-icon>
                Name
              </div>
            </template>
            {{name}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <message />
                </el-icon>
                Email
              </div>
            </template>
            {{email}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <iphone />
                </el-icon>
                Phone #
              </div>
            </template>
            {{phone}}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      </transition>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="No ID was entered"
      width="20%"
      center=true
      :before-close="handleClose">
      <span>Please enter an ID.</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">OK</el-button>
        </span>
      </template>
    </el-dialog>
  </section>
</template>

<script>
import { ElMessage } from 'element-plus'
const axios = require('axios')

export default {
  setup () {

  },
  data () {
    return {
      // UI variables
      prompt: 'Enter an ID below to retrieve its related info',
      labelPosition: 'right',
      dialogVisible: false,

      // Data variables
      infoResult: null,
      name: '',
      email: '',
      phone: '',
      id: null,
      iconStyle: '8px',

      // API variables
      validReturn: false
    }
  },
  mounted: function () {
  },
  name: 'RetrieveInfo',
  methods: {
    retrieveInfo () {
      this.validReturn = false
      this.name = ''
      this.email = ''
      this.phone = ''
      if (this.id === null) {
        this.dialogVisible = true
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
            message: 'Error retrieving info.',
            type: 'error'
          })
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

.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}

</style>
