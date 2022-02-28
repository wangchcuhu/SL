<template>
  <div class="sidebar-compon">
    <div class="img-box">
      <img src="../../../assets/DiaSorin2.jpg" class="menu-logo" />
    </div>
    <div>
      <el-menu
        mode="vertical"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#eee"
        active-text-color="#4dbcff"
        :default-active="TabsNow.path"
        :unique-opened="true"
        class="el-menu-vertical-demo"
      >
        <DynamicMenu :menuList="sidebarMenu"></DynamicMenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
// import bus from '@/utils/bus'
import DynamicMenu from '@/components/dynamicMenu';
import { getSystemAuthority } from './sidebarNav';
import { mapState } from 'vuex';
export default {
  name: 'sidebarNav',
  data () {
    return {
      activeShow: 'home',
      isCollapse: false,
      sidebarMenu: [],
      TabsNow: ''
    };
  },
  // 计算属性，实际上是将绑定的值赋予计算属性的getter属性(所有涉及到的data中的属性都会被包含在内)
  computed: {
    ...mapState({
      isSidderMenuval: state => state.menuCard.isSidderMenuval
    })
  },
  methods: {
    // 获取模块数据
    async getData () {
      if (sessionStorage.getItem('userInformation')) {
        const data = (
          await getSystemAuthority(
            JSON.parse(sessionStorage.getItem('userInformation')).userId
          )
        ).data;
        const a = data.data.forEach(element => {
          // element['meta'] = {
          //   'name': '任务管理',
          //   'icon': 'icon-renyuanguanli'
          // }
        });
        console.log(a);
        this.sidebarMenu = data.data;
      } else {
        this.$router.push('./login');
      }
    }
  },
  components: {
    DynamicMenu
  },
  created () {
    // 这时候实例仅仅生成了数据和事件，但是浏览器中的window是一直存在的，vue实例不过是他下面一个小小的对象
    // console.log(sessionStorage);
    // 是否登录，没有登录则跳转到登录界面重新登陆
    if (sessionStorage.getItem('token')) {
      this.getData();
    } else {
      setTimeout(() => {
        this.$message.error('请先登录');
      }, 1000);
      this.$router.push('/login');
      // function或者函数名指向window,匿名函数指向定义她的对象
    }
  },
  mounted () {
    // bus.$on('tabPath', (msg) => {
    //   // this.TabsNow = msg
    // })
    // setTimeout(() => {
    //   this.sidebarMenu = module
    // })
  },
  watch: {
    // isactiveShow (newData, oldData) {
    //   this.activeShow = newData;
    // },
    isSidderMenuval (newData, oldData) {
      this.isCollapse = newData;
    }
  }
};
</script>
<style lang="scss">
.el-menu-vertical-demo {
  width: 100% !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.sidebar-compon {
  width: 18%;
  .img-box {
    background: #ded2d2;
    text-align: center;
    width: 100%;
    padding: 10px 5px;
    box-sizing: border-box !important;
    .menu-logo {
          width: 185px;
    }
  }
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar {
  -ms-overflow-style: none;
}

.sidebar {
  overflow: -moz-scrollbars-none;
}
</style>
