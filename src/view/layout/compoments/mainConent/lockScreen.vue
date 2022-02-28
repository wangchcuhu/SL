<template>
  <!-- <div class='lock'  :style="{ display:lockScreenStates!==1 ?'block':'none'}" @click="aaa" @mousemove="moveEvent">
    <div class="lockBox" ref="lockBox" v-if="lockBox">
      <el-row :span="24">
      <el-form autocomplete="new-password" label-position="left" ref="lockScreenForm" @submit.native.prevent :model="lockScreenFormData" size="medium"  label-width="110px" :rules="lockScreenRules">
        <el-form-item  label="锁屏密码" prop="lockScreenPassword">
          <el-input autocomplete="new-password" v-model="lockScreenFormData.lockScreenPassword" show-password
            placeholder="请输入锁屏密码" :maxlength="20" clearable :style="{width: '100%'}" @keyup.enter.native="unlocking"
          ></el-input>
        </el-form-item>
        <el-button type="primary" class="login-submit" @click="unlocking">解 锁</el-button>
      </el-form>
    </el-row>
    {{lockScreenStates}}
    </div>
  </div> -->
<div>{{$store.state.lockScreen.lockScreenStates}}</div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  name: '',
  props: {},
  data () {
    return {
      timmer: null,
      lockBox: false, //
      lockScreenFormData: {
        lockScreenPassword: null
      },
      lockScreenRules: {
        lockScreenPassword: [{
          required: true,
          message: '请输入锁屏密码',
          trigger: 'blur'
        }]
      }
    };
  },
  created () {},
  mounted () {
    // console.log(this.lockScreenPassword)
  },
  computed:
  // 去掉{}和...就可以了mapGetter进行了深度监听（或者不要进行复制，而是深拷贝）
    // lockScreenPassword: (state) => state.lockScreen.lockScreenPassword,
    mapGetters([
      'lockScreenStates'
      // ...
    ]),
  methods: {

    init () {
      this.timmer = setTimeout(() => {
        if (this.$refs.lockBox) {
          this.lockScreenFormData.lockScreenPassword = ''
          this.$refs['lockScreenForm'].resetFields();
          this.$refs.lockBox.style.opacity = 0
          setTimeout(() => {
            this.lockBox = false
          }, 1100)
        }
      }, 1000 * 10)
    },

    moveEvent () {
      clearTimeout(this.timmer)
      this.init()
    },

    aaa () {
      if (this.lockBox == false) {
        this.lockBox = true
        setTimeout(() => {
          if (this.$refs.lockBox) {
            this.lockScreenFormData.lockScreenPassword = ''
            this.$refs['lockScreenForm'].resetFields();
            this.$refs.lockBox.style.opacity = 1
          }
        })
      }
    },

    // 解锁
    unlocking () {
      this.$refs['lockScreenForm'].validate(async (valid) => {
        if (valid) {
          if (this.lockScreenPassword == this.lockScreenFormData.lockScreenPassword) {
            this.$store.dispatch('cleanLockScreenPwd', null)
          } else {
            this.$message.error('密码错误')
          }
          // this.$refs["lockScreenForm"].resetFields();
        }
      })
    }
  },
  watch: {
    'lockScreenFormData.lockScreenPassword' () {
      this.moveEvent()
    }
  },
  components: {},
  beforeDestroy () {}
};

</script>
<style scoped rel="stylesheet/stylus" lang="scss">
  .lock {
    width:100%;
    height:100%;
    background: linear-gradient(-45deg, #ee7752, #DE99B4, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 10s ease infinite;
    position:absolute;
    z-index:9999
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  .lockBox{
    opacity: 0;
    transition:1.5s;
    padding:20px;
    position:absolute;
    width:"340px";
    height:"340px";
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    display:inline-block;
    text-align: center;
  }
  .login-submit {
    margin :auto;
    width: 80%;
    height: 45px;
    font-size: 18px;
    letter-spacing: 5px;
    text-indent: 5px;
    font-weight: 300;
    font-weight: 600;
    cursor : pointer;
    margin-top: 30px;
    font-family: "neo";
    transition: 0.25s;
  }

</style>
<style>
  .el-message{
    z-index:9999999  !important
  }
</style>
