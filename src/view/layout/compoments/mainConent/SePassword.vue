<template>
    <!-- 修改密码 -->
    <el-dialog destroy-on-close  :append-to-body="true" :visible.sync="setForm.visible" width="40%" :close-on-click-modal="false"
      :before-close="()=>setForm.visible=false">
      <div slot="title">
        <span style="font-size: 20px">修改密码 / Change Password</span>
      </div>
      <el-form autocomplete="new-password" label-position="right" ref="changeForm" :model="changeFormData"
        :rules="changeRules" size="medium" label-width="240px" class="changePwd">
        <el-form-item class="paddingLeft" label="原密码 / Old Password" prop="userPwd">
          <el-col :span="16">
            <el-input v-model="changeFormData.userPwd"  maxlength="18" show-password clearable
              :style="{ width: '100%' }"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="新密码 / New Password" prop="newUserPwd">
          <el-col :span="16">
            <el-input v-model="changeFormData.newUserPwd"  maxlength="18" clearable show-password
              :style="{ width: '100%' }"
          ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item class="paddingLeft" label="确认密码 / Confirm Password"  prop="checknewUserPwd">
          <el-col :span="16">
            <el-input v-model="changeFormData.checknewUserPwd"  maxlength="18" clearable
              show-password :style="{ width: '100%' }"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changePwd">提交 / Sumbit</el-button>
        <el-button type="primary" @click="clean">清空 / Clear</el-button>
        <el-button @click="()=>{clean();setForm.visible=false}">关闭 / Close </el-button>
      </span>
    </el-dialog>
</template>

<script>
import {getuserBaseInfo} from '@/view/personnelManagement/basicConfiguration.js'
import {changePwds, refreshToken} from '@/api/personnelInformation.js'
export default {
  name: 'my_setPassword',
  props: {
    setForm: Object
    // flag:String//1代表是首次登录
  },
  data () {
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码 / Please enter the password again'));
      } else if (value !== this.changeFormData.newUserPwd) {
        callback(new Error('新密码与确认密码不一致，请重新输入! / The new password is inconsistent with the confirmed password, please re-enter'));
      } else {
        callback();
      }
    }
    return {
      changeFormData: {
        newUserPwd: '',
        userPwd: '',
        checknewUserPwd: ''
      },
      passwordPolicyArr: {},
      changeRules: {
        userPwd: [
          {
            required: true,
            // message: '请输入 / Please Enter',
            trigger: 'blur'
          }
        ],

        checknewUserPwd: [{
          required: true,
          validator: validatePass1,
          trigger: 'blur'
        } ],

        newUserPwd: [
          {
            required: true,
            // validator: this.validatePass1,
            message: '请输入 / Please Enter',
            trigger: 'blur'
          },
          {
            pattern: '',
            message: ''
          }
        ]
      }
    }
  },
  computed: {
  },
  mounted () {
    // this.getPassword()
  },


  methods: {
    // 提交
    // 修改密码
    async changePwd () {
      this.$refs['changeForm'].validate(async (valid) => {
        if (valid) {
          let userId = sessionStorage.getItem('userId');
          let obj = {
            userPwd: this.changeFormData.userPwd,
            newUserPwd: this.changeFormData.newUserPwd,
            userId: userId,
            isPwdType: 20002,
            bool: 1
            // forbidStatus: 1
            // isPwdType: 20004
          };
          let data = (await changePwds(obj)).data;
          if (data.code == 20000) {
            this.$message.success('修改成功 / Successfully Modified');
            let refreshTokenData = sessionStorage.getItem('refreshToken');
            await refreshToken(refreshTokenData);
            sessionStorage.removeItem('token');
            this.clean();
            this.setForm.visible = false;
            this.setForm.flag === 1 ? console.log() : this.$router.replace('/login');
          } else {
            this.$message.error(data.message);
          }
        }
      });
    },
    // 清空
    clean () {
      this.$refs['changeForm'].resetFields();
    },
    // 获取密码策略的基础数据
    async getPassword () {
      let data = (await getuserBaseInfo()).data

      if (data.data == null) {
      } else {
        this.passwordPolicyArr = data.data
        let RE = `^(?=(.*[a-z]){${this.passwordPolicyArr.lowerCaseLength},})(?=(.*[A-Z]){${this.passwordPolicyArr.upperCaseLength},})(?=(.*\\d){${this.passwordPolicyArr.numberLength},})(?=(.*[\\u002D\\u005C\\u005D\\u0060\\u007D\\u0029\\u0028\\u005B\\u007B!@#$%^&*()+_=|:;<>,.?/~]){${this.passwordPolicyArr.specialLength},})[\\u002D\\u005C\\u005D\\u0060\\u007D\\u0029\\u0028\\u005B\\u007BA-Za-z\\d!@#$%^&*()+_=|:;<>,.?/~]{${this.passwordPolicyArr.minLength},}`
        //
        this.changeRules['newUserPwd'][1]['pattern'] = new RegExp(RE)
        // this.changeRules['checknewUserPwd'][1]['pattern'] = this.validatePass1()
        this.changeRules['newUserPwd'][1]['message'] = `密码中密码最小长度为/The minimum length of the password in the password is:${this.passwordPolicyArr.minLength}
            ${this.passwordPolicyArr.upperCaseLength == 0 ? '' : ',大写英文长度至少为/The length of uppercase English is at least:' + this.passwordPolicyArr.upperCaseLength}
            ${this.passwordPolicyArr.lowerCaseLength == 0 ? '' : ',小写英文长度至少为/Lowercase English length is at least:' + this.passwordPolicyArr.lowerCaseLength}
            ${this.passwordPolicyArr.numberLength == 0 ? '' : ',数字长度长度至少为/The length of the number is at least:' + this.passwordPolicyArr.numberLength}
            ${this.passwordPolicyArr.specialLength == 0 ? '' : ',特殊字符长度至少为/Special characters are at least:' + this.passwordPolicyArr.specialLength}`
      }
      // setTimeout(() => {
      //   this.clean()
      // })
    }}
}
</script>

<style scoped lang="scss">
  // >>>.changePwd .el-form-item{
  //   margin-bottom:42px  !important;
  // }
  .el-form-item{
    margin-bottom: 45px;
  }
</style>
