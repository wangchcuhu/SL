<template>
  <!-- <div class="main-container" @mousemove="moveEvent"> -->
  <div class="main-container">
    <TopAside />
    <!-- <TableCard /> -->
    <Content />
  </div>
</template>

<script>
import TopAside from './topAside';
import Content from './content';
// import TableCard from './tableCard'

export default {
  props: {},
  data () {
    return {
      // timer: '',
      // socket: '',
      // stompClient: '',
      // timmer: null,
      // dialogWidth: document.body.clientWidth
    };
  },
  mounted () {
    // this.getCookie('aaa',111)
    // const that = this
    // window.addEventListener('resize', function () {
    //   return (() => {
    //     window.screenWidth = document.body.clientWidth;
    //     that.dialogWidth = window.screenWidth;
    //   })();
    // });
  },
  watch: {
    // dialogWidth (newData, oldData) {
    //   if (newData < 1366) {
    //     this.$store.dispatch('setDialogWidth', '1000px')
    //   } else {
    //     this.$store.dispatch('setDialogWidth', '60%')
    //     this.$store.dispatch('setDialogWidth1', '80%')
    //   }
    // }
  },
  computed: {},
  methods: {
    // init () {
    //   this.timmer = setTimeout(() => {
    //     console.log('设置密码', this.lockScreenTime)
    //     this.$store.dispatch('setLockScreenPwd', localStorage.getItem('pwd'))
    //   }, 1000 * 60 * this.lockScreenTime)
    // },
    // moveEvent () {
    //   clearTimeout(this.timmer)
    //   this.init()
    // },
    // getCookie (cname, cvalue) {
    //   var cookie = document.cookie.split(';')[0]
    //   if (!cookie) {
    //     console.log('失效了...')
    //   }
    // }
  },
  components: {
    TopAside,
    Content
    // TableCard
  }
};
</script>

<style scoped rel="stylesheet/stylus" lang="scss">
.main-container {
  margin-left: 18%;
  min-height: 100%;
  transition: 0.25s;
  background: #f0f2f5;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>
