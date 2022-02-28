<template>
  <div class="login-wrapper">
     <p class="put-on-records">
<!--      <img src="@/assets/license.png" class="license" />-->
      <span>
        Copyright © Tofflon 2021 All Rights Reserved </span
      >
    </p>
    <div class="bg"></div>
    <i class="iconfont icon-yaowan bg-yaowan_1"></i>
    <i class="iconfont icon-yaowan bg-yaowan_2"></i>
    <i class="iconfont icon-yaowan bg-yaowan_3"></i>
    <div class="login">
      <div class="login-left">
        <img src="../../assets/DiaSorin2.jpg" class="left-logo" />
        <div class="left-title">The Diagnostic Specialist</div>
        <div class="left-form">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
            <el-form-item prop="userAccount">
              <el-input
                v-model="loginForm.userAccount"
                prefix-icon="el-icon-user"
                :maxlength="18"
                placeholder="请输入用户名 / Please enter user name"
              ></el-input>
            </el-form-item>
            <el-form-item prop="userPwd">
              <el-input
                v-model="loginForm.userPwd"
                placeholder="请输入密码/ Please enter the password"
                show-password
                @keyup.enter.native="handleLogin"
              >
                <div slot="prefix" class="icon-wrapper">
                  <i class="iconfont icon-mima"></i>
                </div>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="login-submit"
                :loading="loading"
                style="width:100%;"
                @click.native.prevent="handleLogin"
              >
                登录 / Login
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="login-right">
        <div class="img-wrapper">
          <img src="../../assets/inbetweening2.jpg"/>
        </div>
      </div>
    </div>
    <SePassword :setForm="setForm"></SePassword>
  </div>
  <!-- 登录页面 -->

</template>
<script>
import { verifyAccount, storeAuthority } from './login';

import SePassword from '@/view/layout/compoments/mainConent/SePassword.vue'
export default {
  name: 'login',
  data () {
    return {
      setForm: {
        visible: false,
        flag: 1// 1代表是首次登录
      },
      setFormData: {
        ip: undefined, // ip
        host: undefined // 端口
      },
      setRules: {
        ip: [
          {
            required: false,
            // message: '请输入ip',
            trigger: 'blur'
          }
        ],
        host: [
          {
            required: false,
            // message: '请输入端口',
            trigger: 'blur'
          }
        ]
      },
      dialogVisible: false, // 设置弹窗控制默认关闭
      loginForm: {
        userAccount: '',
        userPwd: ''
      },
      // 密码和用户名校验
      loginRules: {
        userAccount: [
          {
            required: true,
            // message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        userPwd: [
          {
            required: true,
            // message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      passwordType: 'password'
    };
  },
  computed: {},
  created () {},
  mounted () {
    console.log('触发');
  },
  components: {
    SePassword
  },
  watch: {},
  methods: {
    handleClose () {
      this.dialogVisible = false;
    },
    // 设置 主要是为了保存ip地址
    setUp () {
      this.dialogVisible = true;
    },
    // 是否显示密码
    showPassword () {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '');
    },
    // 设定一个计时器
    setTime (lockTime) {
      const b = lockTime.split('-')
      const time = b[1] * 60 * 1000 + b[0] * 60 * 1000 * 60
      console.log(time)
      // 定义一个简单的计时器
      setTimeout(() => {
        this.$message.warning('系统超时,退出登录 / System timeout, log out');
        sessionStorage.clear()
        this.$router.replace('./login')
      }, time);

      // // 简单的一个停止的方法
      // function stopTime () {
      //   clearInterval(myTime);
      // }
    },

    // 点击登陆按钮
    async handleLogin () {
      this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          this.Loading(true);
          // 在这里存储信息,域账户为1，账号密码登录为2,在页面跳转那那验证是否有这两个标记，没有则说明没有登录
          let data = (await verifyAccount(this.loginForm)).data;
          if (data.code == 20000) {
            console.log();
            // 存一下用户信息
            sessionStorage.setItem('userId', data.data.user.userId);
            sessionStorage.setItem(
              'userInformation',
              JSON.stringify(data.data.user)
            );
            // 这里在sessionStorage中做个标记已经登录
            // 在这里保存token和reflashToken
            sessionStorage.setItem('token', data.data.token);
            sessionStorage.setItem('refreshToken', data.data.refreshToken);
            // 在这里获取存一下按钮的权限，显影的权限
            // storeAuthority
            let dataAuthority = (await storeAuthority(data.data.user.userId)).data
            console.log(dataAuthority)
            if (dataAuthority.code === 20000) {
              sessionStorage.setItem('dataAuthority', JSON.stringify(dataAuthority.data));
            }
            // // 在这里要设定一下计时器
            // const results = (await getuserBaseInfo()).data
            // if (results.code) {
            //   console.log(results.data.lockTime)
            //   this.setTime(results.data.lockTime)
            // }

            this.$message.success(data.message);
            this.$router.push('/layout');
            this.Loading(false);
          } else {
            // 20004代表初次登录
            if (data.code === 20004) {
              this.setForm.visible = true
              // 在这里存一下userId，方便修改密码的组件获取使用
              sessionStorage.setItem('userId', data.data.user.userId);
              // 这里去查一下用户的信息
              setTimeout(() => {
                this.$children[1].getPassword()
              }, 0);
              console.log(this);
            }
            this.$message.error(data.message);
            this.Loading(false);
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  // background: url('../../assets/login.png');
  // background-size:cover;
  .put-on-records {
    position: absolute;
    bottom: 7%;
    color: #fff;
    z-index: 5;
    font-size: 15px;
    margin-left: 50%;
    transform: translateX(-50%) translateY(50%);
    .license {
      width: 36px;
      vertical-align: bottom;
      margin-right: 5px;
    }
    span {
      position: relative;
      top: -7px;
    }
  }

  .bg {
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: '';
    background: url('../../assets/bg-2.svg') no-repeat center center;
    background-size: cover;
    z-index: 2;
    opacity: 0.18;
  }
  .icon-yaowan {
    display: block;
    position: absolute;
    font-size: 52px;
    color: #fff;
    z-index: 2;
    opacity: 0.4;
    &.flip {
      transform: scaleX(-1);
    }
  }
  .bg-yaowan_1 {
    top: 3%;
    left: 15%;
  }
  .bg-yaowan_2 {
    right: 15%;
    bottom: 9%;
  }
  .bg-yaowan_4 {
    right: 12%;
    top: 6%;
  }
  &::before {
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 50%;
    content: '';
    background-color: rgba(78, 176, 213, 0.8);
    z-index: 1;
  }
  &::after {
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 50%;
    content: '';
    background-color: #1e1f6f;
    z-index: 1;
  }
  .login {
    position: absolute;
    left: 7%;
    right: 7%;
    top: 14%;
    bottom: 14%;
    display: flex;
    z-index: 3;
    border-radius: 20px;
    box-shadow: 10px 10px 36px rgba(0, 0, 0, 0.25);
    .login-left {
      width: 50%;
      border-radius: 20px 0 0 20px;
      background-color: #fff;
      padding-top: 3.8%;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      .left-logo {
          height: 100px;
      }
      .left-title {
        margin-top: 2.3%;
        color: #221f34;
        font-size: 30px;
        font-weight: bold;
        // font-family: 'somatic-rounded';
        // text-transform:none;
      }
      .left-form {
        width: 52%;
        margin-top: 3.8%;
      }
      .login-submit {
        font-size: 18px;
        font-weight: bold;
      }

      .icon-select /deep/ {
        .el-input__inner {
          background: url('~@/assets/lessee.svg') no-repeat; //引入icon
          background-size: 16px 14px; //这个是图片的大小，在这里不能直接设置width  height,设置宽高其实是select的宽高，图片可能会失真只设置宽度  高度auto也行
          background-position: 5px 11px; //在input中定位置  这两个参数是x  y坐标
          padding: 0 0 0 26px; //需要设置padding 把placeholder向右移
          box-sizing: border-box;
          font-size: 14px;
        }
      }
      .el-input__prefix {
        .icon-wrapper {
          width: 25px;
        }
      }
    }
    .login-right {
      flex: 1;
      border-radius: 0 20px 20px 0;
      background-color: #4eb0d5;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      .img-wrapper {
        position: relative;
        img {
          width: 100%;
        }
        &::after {
          content: '';
          position: absolute;
          display: block;
          height: 1px;
          background-color: #4eb0d5;
          left: 0;
          right: 0;
          bottom: 0px;
        }
      }
    }
  }
}
</style>
