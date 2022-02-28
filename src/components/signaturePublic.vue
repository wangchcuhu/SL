<template>
<el-dialog
  title="电子签字 / Electronic signature"
  width="50%"
  key="Electronic"
      :before-close="Cancle"
  center
  :visible.sync="formMS.dialogVisible">
  <span slot="footer" class="dialog-footer">
    <el-button @click="Cancle()">取 消 / Cancel</el-button>
    <el-button type="primary" @click="()=>Sure()">确 定 / Sure</el-button>
  </span>
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
     </el-dialog>
</template>
<script>
// import ElDialog from '@/components/dialog/index.js';
export default {
  name: 'signaturePublic',
  components: {
    // ElDialog
  },
  props: {
    // 收集签字信息
    formMS: {
      type: Object,
      default: () => {
        return {
          roeId: {}, // 需要执行的操作行id,有的需要，有的不要
          userId: '',
          dialogVisible: false,
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
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    Cancle () {
      this.formMS.dialogVisible = false
      this.formMS.reason = ''
      this.formMS.btnName = ''
      this.formMS.password = ''
      this.formMS.userAccount = ''
    },
    Sure () {
    // 这里会调提交的接口
      this.$emit('authenticateUser')
    }
  },
  updated () {
  },
  data () {
    return {
      rules: {
        reason: [
          { required: true,
            message: '请输入 / please enter',
            trigger: 'blur' }
        ],
        btnName: [
          { required: true,
            message: '请输入 / please enter',
            trigger: 'blur' }
        ],
        password: [
          { required: true,
            message: '请输入 / please enter',
            trigger: 'blur' }
        ],
        userAccount: [
          { required: true,
            message: '请输入 / please enter',
            trigger: 'blur' }
        ]
      }
    }
  }


}
</script>

<style>

</style>
