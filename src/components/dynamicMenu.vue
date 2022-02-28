<template>
  <div class="menu-container">
    <template v-for="v in menuList">
      <el-submenu :index="v.authorityPath"
                  v-if="v.children && v.children.length > 0"
                  :key="v.authorityId">
        <template slot="title">
          <i style="font-size: 20px; padding: 0 8px"
             class="iconfont"
             :class="vicon"></i>
          <span>{{v.authorityName}}</span>
        </template>
        <el-menu-item-group>
          <my-nav :menuList="v.children"></my-nav>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item :key="v.authorityId"
                    :index="v.authorityPath"
                    @click="gotoRoute(v.authorityPath, v.authorityName)"
                    v-else>
        <i style="font-size: 20px; padding: 0 8px"
           class="iconfont"
           :class="v.icon"></i>
        <span slot="title"
              v-html='v.authorityName'></span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>


export default {
  name: 'my-nav',
  props: {
    menuList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data () {
    return {
      isSidderVal: true
    };
  },
  methods: {
    // 页面跳转
    gotoRoute (name, title) {
      // this.$store.dispatch('addTabCard', {
      //   name: name,
      //   label: title
      // });
      // this.$store.dispatch('addMenuCard', name);
      console.log(name)
      this.$router.replace(name);
      // 点击菜单栏，自动清空缓存
      // this.$store.dispatch('toOpenOldBox', 0);
    }
  },
  mounted () {
    // this.isSidderVal = this.$store.state.menuCard.isSidderMenuval;
  },
  computed: {
    // ...mapState({
    //   isShowLeftSidder: (state) => state.menuCard.isSidderMenuval
    // })
  },
  watch: {
    // isShowLeftSidder (newData, oldData) {
    //   this.isSidderVal = newData;
    // }
  }
};
</script>

<style lang='scss'>
.el-menu--collapse {
  width: 100%;
}

.el-menu--collapse .el-submenu__title span {
  display: none;
}

/* 隐藏 > */
.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
</style>
