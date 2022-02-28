<template>
      <!-- 基础配置 -->
      <div>
                <signaturePublic  labelWidth='200px'  :formMS.sync='signPerson' @authenticateUser='authenticateUser'></signaturePublic>

      <el-dialog
        title="提示"
  :visible.sync="bcform.flag"
  width="60%"
  :before-close="handleClose">
        <div slot="title">
          <span style="font-size:20px">基础配置 / Basic Configuration</span>
          <!-- <span style="float:right;padding-right: 40px;margin-top:2px">
            <i class="el-dialog__close el-icon-full-screen" style="cursor:pointer;font-size:26px;font-weight:700" ></i>
          </span> -->
        </div>
        <el-row :gutter="0" >
          <el-form autocomplete="new-password" label-position="left" ref="addForm" :model="bcform" :rules="baserules" size="medium" label-width="60px">
            <el-col :span="12">
              <el-form-item class="paddingLeft lineHeight"   prop="isNeedModify">
                     <div>首次登陆修改密码 / Change password when logging in for the first time</div>
                <el-radio-group v-model.trim="bcform.isNeedModify">
                  <el-radio :label="0">是</el-radio>
                  <el-radio :label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="" prop="lockCount" class="paddingLeft">
                  <div>密码尝试次数 / Password attempts</div>
                <el-input-number step-strictly v-model="bcform.lockCount" placeholder="请输入密码尝试次数" :step="1" :min="0" :max="9" :style="{ width: '100%' }">
                </el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item   prop="tokenTimeOut" class="paddingLeft">
                <div>用户登录失效时间(分钟) / User login expiration time (minutes)</div>
                <el-input autocomplete="new-password" v-model="bcform.tokenTimeOut" placeholder="用户登录失效时间(分钟)" clearable :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" class="formHeader" style="height:40px;line-height:40px;font-size:20px;margin-bottom:22px;padding-left:0px;width:calc(100% + 20px);margin-left:-10px">
              <el-col>
                <div style="font-size:22px">密码策略 / Password policy</div>
              </el-col>
            </el-col>
            <div class='wcc-modify-padding'>
            <el-col :span="12">
              <el-form-item  prop="historyPwdCount" >
                <div>强制密码历史 / Mandatory password history</div>
                <el-input-number step-strictly v-model="bcform.historyPwdCount" placeholder="请输入强制密码历史" :step="1" :min="0" :max="24" :style="{ width: '100%' }"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  prop="minLength" >
                <div>密码最小长度 / Minimum password length</div>
                <el-input-number step-strictly v-model="bcform.minLength" placeholder="请输入密码最小长度" :step="1" :min="6" :max="20" :style="{ width: '100%' }"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  prop="upperCaseLength" >
                <div>大写英文长度 / Uppercase English length</div>
                <el-input-number step-strictly v-model="bcform.upperCaseLength" placeholder="请输入大写英文长度" :step="1" :min="0" :max="9" :style="{ width: '100%' }"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  prop="lowerCaseLength" >
                <div>小写英文长度 / Lowercase English length</div>
                <el-input-number step-strictly v-model="bcform.lowerCaseLength" placeholder="请输入小写英文长度" :step="1" :min="0" :max="9" :style="{ width: '100%' }"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  prop="numberLength" >
                <div>数字长度 / Number length</div>
                <el-input-number step-strictly v-model="bcform.numberLength" placeholder="请输入数字长度" :step="1" :min="0" :max="9" :style="{ width: '100%' }"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  prop="specialLength" >
                <div>特殊字符长度 / Special character length</div>
                <el-input-number step-strictly v-model="bcform.specialLength" placeholder="请输入特殊字符长度" :step="1" :min="0" :max="9" :style="{ width: '100%' }"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  prop="specialLength" >
                <div>共享文件夹连接账号 / shared Folder User Name</div>
                <el-input step-strictly v-model="bcform.sharedFolderUserName"  :step="1" :min="0" :max="9" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  prop="specialLength" >
                <div>共享文件夹连接密码 / Shared Folder Password</div>
                <el-input step-strictly v-model="bcform.sharedFolderPassword"  :step="1" :min="0" :max="9" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  prop="specialLength" >
                <div>zip加密密码 / Zip Password</div>
                <el-input step-strictly v-model="bcform.zipPassword"  :step="1" :min="0" :max="9" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            </div>
            <el-col :span="24" class="formHeader" style="height:40px;line-height:40px;font-size:20px;margin-bottom:22px;padding-left:0px;width:calc(100% + 20px);margin-left:-10px">
                   <el-col>
                <span style="font-size:22px">账户锁定策略 / Account lockout strategy</span>
              </el-col>
            </el-col>

                   <el-col :span="24">
              <el-form-item class="lineHeight paddingLeft" label-width="240px" label="锁定时间 (小时-分钟) / Lock time (hour-minute)" prop="lockTime">
                <el-input autocomplete="new-password" v-model="bcform.lockTime"  clearable :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>

            <!-- <el-col :span="24">
              <el-form-item label="修改原因 / Modify reason" prop="modifyReason" label-width="240px">
                <el-input autocomplete="new-password" v-model.trim="bcform.modifyReason" type="textarea" :rows="5" :maxlength="100" :autosize="{ minRows: 5, maxRows: 5 }"
                  :style="{ width: '100%' }">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="240px" label="用户名 / Username" prop="userName">
                <el-input autocomplete="new-password" v-model="bcform.userName" :maxlength="20" clearable :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class=" paddingLeft" label-width="240px" label="密码 / Password" prop="passWord">
                <el-input autocomplete="new-password" v-model="bcform.passWord"  :maxlength="20" clearable show-password :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col> -->
          </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary"
            @click.native="AuthorityData.electronicSignature.includes(5009)?BasicCheckOpen():addSure()">提交 / Sumbit</el-button>
          <el-button @click="handleClose">关闭 / Close</el-button>
        </div>
      </el-dialog>
            </div>
</template>

<script>
import {verifyAccount} from '@/api/verifyAccount.js'
import {edituserBaseInfo} from './basicConfiguration.js'
import signaturePublic from '@/components/signaturePublic.vue'
export default {
  name: 'basicConfiguration',
  created () {
    console.log('created')
  },
  beforecreate () {
    console.log('beforecreated')
  },
  destroyed () {
    console.log('销毁')
  },
  props: {
    'bcform': {
      type: Object
    }
  },
  components: {
    signaturePublic
  },
  data () {
    var valiDate = (rule, value, callback) => {
      const dateReg = /^\d{2}-\d{2}-\d{2}$/;
      setTimeout(() => {
        if (dateReg.test(value)) {
          callback();
        } else {
          callback(new Error('最长使用期限格式不正确'));
        }
      }, 100);
    };
    var reminderTimeDate = (rule, value, callback) => {
      const dateReg = /^\d{2}-\d{2}-\d{2}$/;
      setTimeout(() => {
        if (dateReg.test(value)) {
          callback();
        } else {
          callback(new Error('密码到期提醒格式不正确'));
        }
      }, 100);
    };
    var lockScreenTimeDate = (rule, value, callback) => {
      const dateReg = /^\d{2}-\d{2}$/;
      setTimeout(() => {
        if (dateReg.test(value)) {
          callback();
        } else {
          callback(new Error('自动锁屏时间格式不正确'));
        }
      }, 100);
    };
    var passwordActivateTimes = (rule, value, callback) => {
      const dateReg = /^\d{2}-\d{2}-\d{2}$/;
      setTimeout(() => {
        if (dateReg.test(value)) {
          callback();
        } else {
          callback(new Error('激活密码失效时间格式不正确'));
        }
      }, 100);
    };

    var lockTimeDate = (rule, value, callback) => {
      const dateReg = /^\d{2}-\d{2}$/;
      setTimeout(() => {
        if (dateReg.test(value)) {
          callback();
        } else {
          callback(new Error('锁定时间格式不正确'));
        }
      }, 100);
    };
    return {
      AuthorityData: JSON.parse(sessionStorage.getItem('dataAuthority')),
      signPerson: {
        row: {}, // 存整个row
        rowId: '',
        dialogVisible: false,
        userId: '',
        reason: '', // 修改原因
        btnName: '', // 按钮字段
        password: '', // 用户密码
        userAccount: ''// 用户名称
      },
      baserules: {

        isNeedModify: [
          {
            required: true,
            message: '请输入修改原因',
            trigger: 'blur'
          }
        ],
        modifyReason: [
          {
            required: true,
            message: '请输入修改原因',
            trigger: 'blur'
          }
        ],
        userName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        passWord: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        passwordResetTime: [
          {
            required: false,
            validator: valiDate,
            trigger: 'blur'
          }
        ],
        reminderTime: [
          {
            required: false,
            validator: reminderTimeDate,
            trigger: 'blur'
          }
        ],
        lockScreenTime: [
          {
            required: false,
            validator: lockScreenTimeDate,
            trigger: 'blur'
          }
        ],
        passwordActivateTime: [
          {
            required: false,
            validator: passwordActivateTimes,
            trigger: 'blur'
          }
        ],
        lockTime: [
          {
            required: false,
            validator: lockTimeDate,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 在这里触发所有需要电子签名的后续提交操作，新增和编辑写在了一起，然后是删除,要在结束的时候清空signPerson
    async authenticateUser () {
      debugger
      if (this.signPerson.btnName == 'Task_Management_Basic') {
        this.BasicCheck()
      }
    },
    // 公共处理结果的方法
    dealResultCheck (result, fn) {
      if (result.code === 20000) {
        fn.call(this)
        // this.$message.success(result.message)
      } else {
        this.$message.error(result.message)
        this.signPerson = {
          row: {}, // 存整个row
          dialogVisible: false,
          rowId: '',
          userId: '',
          reason: '', // 修改原因
          btnName: '', // 按钮字段
          password: '', // 用户密码
          userAccount: ''// 用户名称
        }
      }
    },
    // 统一清空SignPerson字段
    clearSignPerson () {
      this.signPerson = {
        row: {}, // 存整个row
        dialogVisible: false,
        rowId: '',
        userId: '',
        reason: '', // 修改原因
        btnName: '', // 按钮字段
        password: '', // 用户密码
        userAccount: ''// 用户名称
      }
    },
    // 基础设置start========================================================
    BasicCheckOpen () {
      this.$refs['addForm'].validate(async (valid) => {
        if (valid) {
          this.signPerson.dialogVisible = true
          this.signPerson.btnName = 'Task_Management_Basic'
        }
      })
    },
    async BasicCheck () {
      // buName按钮名称,需要执行的函数
      const results = (await verifyAccount({...this.signPerson})).data
      this.dealResultCheck(results, function () {
        this.signPerson.dialogVisible = false
        // 为person中塞userId
        this.signPerson.userId = results.data.userId
        // 这里需要id并且清空要在结束的时候清空signPerson
        this.addSure()
      })
    },
    // 基础设置end==========================================================


    // 基础设置保存
    async addSure () {
      this.$refs['addForm'].validate(async (valid) => {
        if (valid) {
          let obj = JSON.parse(JSON.stringify(this.bcform))
          let data = (await edituserBaseInfo({...obj,
            // 塞一个写死的refreshTokenTimeOut，实际上在之前写死了，不知道哪个过程被变成‘’了，不管了
            'refreshTokenTimeOut': 9999,
            'person': ((this.operate == 1 ? this.AuthorityData.electronicSignature.includes(5013)
              : this.AuthorityData.electronicSignature.includes(5009))
              ? this.signPerson
              : null)})).data;
          if (data.code == 20000) {
            this.$message.success(data.message);
            this.handleClose()
            this.clearSignPerson()
          } else {
            this.$message.error(data.message);
            this.clearSignPerson()
          }
        }
      });
    },



    handleClose () {
      for (let key in this.bcform) {
        this.bcform[key] = ''
      }
      this.bcform.flag = false
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item--medium .el-form-item__content, .el-form-item--medium .el-form-item__label {
    line-height: 15px !important;
}
 .el-form-item {
    margin-bottom: 1px !important;
    // background:red
}
</style>
