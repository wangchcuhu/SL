<template>
<div id='topSide'>
  <!--修改密码 -->
  <div class="layoutTop">
    <i class="el-icon-s-operation showHidden"
       style="font-size: 20px"
       @click="showSiddernav"></i>
       <div>
<!--         个人信息-->
         <span>{{userInformation.userAccount}}</span>
   <!-- 锁屏按钮 -->
<!--          <el-tooltip class="item" effect="dark" content="锁屏" placement="bottom" style="font-size:30px;padding:0 10px;cursor:pointer">-->
<!--            <i class="el-icon-lock" @click="()=>this.lockScreenBox = true"></i>-->
<!--          </el-tooltip>-->
   <el-dropdown trigger="click" style="
            margin-left: 2px;
            padding: 0 10px;
            cursor: pointer;
          ">
          <!-- <el-avatar :size="28" :src="avatarUrl.avatarUrl"></el-avatar> -->
          <span>个人设置 / Personal Settings</span>
          <el-dropdown-menu slot="dropdown" style="font-size: 22px; padding: 0 1px; cursor: pointer">
            <!-- <el-dropdown-item class="el-icon-user-solid" @click.native="toPersonalCenter">个人中心 / Personal Center</el-dropdown-item> -->
            <el-dropdown-item class="el-icon-setting" @click.native="toChangePassword">设置密码 / Set Password</el-dropdown-item>
            <el-dropdown-item class="el-icon-switch-button" @click.native="logOut">退出系统 / Exit System</el-dropdown-item>
            <!-- <el-dropdown-item class="el-icon-edit"><b class="changeLang" @click='changeLang'>基础设置 / Basic Settings</b></el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
        </div>
     <!-- 设置密码 -->
  </div>
    <mySetPassword :setForm='setForm' ></mySetPassword>
    <!-- 锁屏 -->
    <el-dialog destroy-on-close  :append-to-body="true" :visible.sync="lockScreenBox" width="40%"
      :close-on-click-modal="false" :before-close="lockScreenCancel">
      <div slot="title">
        <span style="font-size: 20px">锁屏</span>
      </div>
        <el-row :span="24" style="padding:0 40px">
          <el-form autocomplete="new-password" label-position="left" ref="lockScreenForm" :model="lockScreenFormData" size="medium"  label-width="110px" :rules="lockScreenRules">
            <el-col :span="24">
              <el-form-item class="paddingLeft" label="锁屏密码" prop="lockScreenPassword">
                <el-input autocomplete="new-password" v-model="lockScreenFormData.lockScreenPassword" placeholder="请输入锁屏密码" :maxlength="20" clearable :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      <span slot="footer" class="dialog-footer">
        <div class="block">
          <el-button type="primary" @click="lockScreenSure" >提交 / Sumbit</el-button>
          <el-button @click="lockScreenCancel">关闭 / Close</el-button>
        </div>
      </span>
    </el-dialog>

  <!-- 设置密码 /基础设置-->
    <!-- <lockScreenVue id='lockScreenVue'></lockScreenVue>
    <div>{{$store.state.lockScreen.lockScreenStates}}11</div> -->
</div>
</template>

<script>
import {editPassword, lockScreen} from '@/api/topAside.js'
import lockScreenVue from './lockScreen.vue'
import mySetPassword from './SePassword.vue'
export default {
  props: {},
  data () {
    return {
      userInformation: JSON.parse(sessionStorage.getItem('userInformation')),
      setForm: {
        visible: false
      },
      lockScreenBox: false, // 锁屏时间弹窗
      Flag: false, // 设置密码和基础设置的弹窗
      model: undefined, // 模式为0代表密码，模式为1代表设置锁屏时间
      passwordType1: 'password',
      passwordType2: 'password',
      passwordType3: 'password',
      rules: {
        userPwdSure: [{
          required: true,
          message: '请输入 / please enter',
          trigger: 'blur'
        }],
        userAccount: [{
          required: true,
          message: '请输入 / please enter',
          trigger: 'blur'
        }],
        userPwd: [{
          required: true,
          message: '请输入 / please enter',
          trigger: 'blur'
        }],
        newPwd: [{
          required: true,
          message: '请输入 / please enter',
          trigger: 'blur'
        }],
        lockScreenTime: [{
          required: true,
          message: '请输入 / please enter',
          trigger: 'blur'
        },
        {
          pattern: /\d{2}-\d{2}$/,
          message: '请输入正确的格式:00-00 / Please enter the correct format: 00-00',
          trigger: 'blur'
        } ]
      },
      queryFormData: {
        'newPwd': '',
        'userAccount': '',
        'userPwd': '',
        'userPwdSure': '',
        'lockScreenTime': ''// 设置锁屏时间
      },
      isClose: true, // 导出遮罩是否可关闭
      lang_title: '', //
      showTime: '', // 时间显示,
      isShowSidderNav: false, // 是否显示左侧导航栏
      lockScreenFormData: {
        lockScreenPassword: null
      },
      lockScreenRules: {
        lockScreenPassword: [{
          required: true,
          message: '请输入 / please enter',
          trigger: 'blur'
        }]
      }
    };
  },
  created () { },
  mounted () {
    const langType = localStorage.getItem('locale')
    this.lang_title = langType === 'zh' ? '转英文' : '转中文'
  },
  watch: {
    '$i18n.locale' (val) {
      localStorage.setItem('locale', val)
    }
  },
  methods: {
    // 所谓的响应就是在对对象的属性赋值或者获取的时候触发setter或者getter这样就达成了响应的目的，比如你对一个属性赋值就会设定setter然后去更新视图或者生命周期或者重新
    // 重新渲染，vue中每个注册在data中的属性都是data的属性，都是通过了setter或者getter
    // 锁屏提交
    lockScreenSure () {
      this.$refs['lockScreenForm'].validate(async (valid) => {
        if (valid) {
          // 锁屏思路
          // 1.将整个id为app的元素取出来，
          const lockScreenApp = document.getElementById('app')
          // 2.创建一个id名为lockScreenSure的元素塞进去
          // 将组件转化为成组件对象（这个实际上就是浏览器中的自定义组件，是浏览器可以识别的带着特有属性和方法的元素）
          // 没有找到到方法可以将组件对象转化成dom对象的api,但是react是有这样的api的，现在提供的简单方法是将组建注册到template，再获取
          const lockScreenDom = document.getElementById('lockScreenVue')
          // 在store中存一下密码
          this.$store.dispatch('setLockScreenPwd', {'lockScreenPassword': this.lockScreenFormData.lockScreenPassword, lockScreenApp, lockScreenDom, 'lockScreenStates': 2})
          this.$refs['lockScreenForm'].resetFields();
          this.lockScreenBox = false
          // 3.当输入密码之后将两者替换掉
          // document.body.removeChild(lockScreenApp)
          // document.body.appendChild(lockScreenDom)
        }
      })
    },
    // 锁屏关闭vvv
    lockScreenCancel () {
      this.lockScreenFormData.lockScreenPassword = null
      this.lockScreenBox = false
    },

    // 设置密码/基础设置关闭
    queryCancel () {
      this.Flag = false
      this.$refs['addForm'].resetFields();
    },
    // 设置密码/基础设置清空
    queryClean () {
      this.$refs['addForm'].resetFields();
    },
    // 设置密码
    toChangePassword () {
      this.setForm.visible = true
    },
    // 是否显示密码
    showPassword (flag) {
      switch (flag) {
        case 1:
          this.passwordType1 === '' ? (this.passwordType1 = 'password') : (this.passwordType1 = '')
          break
          ;
        case 2:
          this.passwordType2 === '' ? (this.passwordType2 = 'password') : (this.passwordType2 = '')
          break
          ;
        case 3:
          this.passwordType3 === '' ? (this.passwordType3 = 'password') : (this.passwordType3 = '')
          break
          ;
      }
    },
    // 设置密码--提交
    async querySure () {
      this.$refs['addForm'].validate(async valid => {
        if (valid) {
          // 设置密码
          if (this.model == 0) {
            if (this.queryFormData.userPwdSure === this.queryFormData.newPwd) {
              const data = (await editPassword({...this.queryFormData})).data
              if (data.code === 20000) {
                this.$message.success(data.message)
                this.Flag = false
                this.queryCancel()
                sessionStorage.clear()
                this.$router.replace('./login')
              } else {
                this.$message.error(data.message)
              }
            } else {
              this.$message.error('两次密码不一致,请重新输入')
            }
          } else {
            const userId = sessionStorage.getItem('userId')
            // 设置锁屏时间
            const data = (await lockScreen({...this.queryFormData, userId})).data
            if (data.code === 20000) {
              this.$message.success(data.message)
              this.Flag = false
              this.queryCancel()
              // 重新获取用户信息(所以设置锁屏时间需要返回用户信息)
            } else {
              this.$message.error(data.message)
            }
          }
        }
      })
    },
    // 退出系统
    logOut () {
      this.$confirm('是否继续关闭 / Whether to continue to close', '提示 / Hint', {
        confirmButtonText: '确定 / Sure',
        cancelButtonText: '取消 / Cancel',
        type: 'warning'
      }).then(() => {
        sessionStorage.clear()
        this.$router.replace('./login')
      })
    },
    showSiddernav () {
      // 使用store存储左侧导航栏的状态供全局使用
      this.isShowSidderNav = !this.isShowSidderNav;
      this.$store.dispatch('showHidden', this.isShowSidderNav);
    },
    // 设置基础设置弹窗
    changeLang () {
      this.Flag = true
      this.model = 1
      // 获取当前用户的锁屏时间
      this.queryFormData.lockScreenTime = JSON.parse(sessionStorage.getItem('userInformation')).lockScreenTime
    }
  },
  components: {
    lockScreenVue,
    mySetPassword
    // ThtmePicker,
    // pdf
  }
};

</script>

<style scoped rel="stylesheet/stylus" lang="scss">
.layoutTop {
  border-bottom: 1px solid #e5e5e5;
  padding: 0 20px 0 10px;
  height: 50px;
  line-height: 50px;
  // position: fixed;
  left: 202px;
  top: 0;
  right: 0;
  background: #fff;
  z-index: 1000;
  transition: 0.25s;
  text-align: center;
  display: flex;
  justify-content: space-between;
  .showHidden {
    float: left;
    line-height: 50px;
    cursor: pointer;
  }
  .rightItem {
    float: right;
    cursor: pointer;
    .changeLang {
      color: #409eff;
    }
  }
  .userInfo {
    float: right;
    height: 50px;
    display: none;

    .userInfoBox {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

>>> .personalCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}

>>> .isFullScreen {
  width: 100%;
  margin-top: 0;
  margin-bottom: 0;
  height: 100%;
  overflow: auto;
  border-radius: 0 !important;
}

// >>>.documentBox{
//   // height:80%;
//   // margin-top:10vh !important;
//   // margin-bottom:0 !important;
//   // top:0
// }
// >>>.documentBox .el-dialog__body{
//   width:100% !important;
//   height:100% !important;
//   // display:flex;
// }
>>> .documentBox .el-dialog__body span {
  display: flex !important;
  justify-content: center;
  align-items: center;
}

>>> .documentBox .el-dialog__body span canvas {
  width: 80% !important;
  height: 80% !important;
}

// >>>.documentBox .el-dialog__body span span {
//   width: 100% !important;
//   height: 80% !important;
// }
>>> .changePwd .el-form-item {
  margin-bottom: 42px !important;
}
// 右键
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  width: 100px;
  text-align: center;
  line-height: 40px;
  li {
    margin: 0;
    /*padding: 7px 16px;*/
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
>>> .shortMessage .el-badge__content {
  transform: translateY(0) translateX(50%);
}
</style>
