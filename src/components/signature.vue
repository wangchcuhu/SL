<template>
<!-- // 签字组件   -->
     <el-row :gutter="24">
<el-form    label-position="left" :model="formMS" status-icon :rules="rules" ref="ruleForm" :label-width="labelWidth" class="demo-ruleForm">
                  <el-col :span="22">
    <el-form-item label="修改原因 / Reason" prop="reason" >
    <el-input   v-model="formMS.reason" autocomplete="off" type="textarea"></el-input>
  </el-form-item>
              </el-col>
                    <el-col :span="11">
  <el-form-item label="用户 / UserAccount" prop="userAccount"  >
    <el-input  v-model="formMS.userAccount" autocomplete="new-password" ></el-input>
  </el-form-item>
     </el-col>
                    <el-col :span="11">
  <el-form-item label="密码 / Password" prop="password" >
    <el-input v-model.number="formMS.password" autocomplete="new-password" clearable show-password></el-input>
  </el-form-item>
    </el-col>

</el-form>
     </el-row>
</template>

<script>
export default {
  name: 'MySignature',
  props: {
    // 收集签字信息
    formMS: {
      type: Object,
      default: () => {
        return {
          reason: '', // 修改原因
          btnName: '', // 按钮字段
          password: '', // 用户密码
          userAccount: ''// 用户名称
        }
      }
    },
    // form表单的label长度
    'labelWidth': {
      type: String,
      default: '100px'
    },
    // form表单的label长度
    'btnName': {
      type: String,
      default: 'Task_Management_Edit'
    }
  },
  mounted () {
    this.formMS.btnName = this.btnName
  },
  updated () {
    this.formMS.btnName = this.btnName
  },
  data () {
    return {
      rules: {
        reason: [
          { required: true,
            message: '请输入',
            trigger: 'blur' }
        ],
        btnName: [
          { required: true,
            message: '请输入',
            trigger: 'blur' }
        ],
        password: [
          { required: true,
            message: '请输入',
            trigger: 'blur' }
        ],
        userAccount: [
          { required: true,
            message: '请输入',
            trigger: 'blur' }
        ]
      }
    }
  }


}
</script>

<style>

</style>
