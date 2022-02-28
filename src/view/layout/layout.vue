<template>
  <div class="layout">
    <SidebarNav
      class="sidebar"
      :class="{ sidebarSlide: isShowSidder == true }"
    />
    <MainContent :class="{ mainSlide: isShowSidder == true }" />
    <!-- <LockScreen v-show="lockScreenPassword" /> -->
  </div>
</template>
<script>
import MainContent from './compoments/mainConent/mainContent';
import SidebarNav from './compoments/sidebarNav.vue';
// import LockScreen from './compoments/lockScreen';

export default {
  data () {
    return {
      isShowSidder: false
    };
  },
  mounted () {
    // 本模块配置主页面，包括侧面模块加载，上测公共区域以及加载的主体
  },
  components: {
    SidebarNav,
    MainContent
    // LockScreen
  },
  computed: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
.layout {
  height: 100%;
  z-index: 101;
}

.sidebar {
  height: 100%;
  background: #304156;
  -webkit-transition: all 0.25s;
  transition: all 0.25s;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0;
  z-index: 100;
  overflow-x: hidden;
}
.sidebarSlide {
  width: 77px;
}

.mainSlide {
  margin-left: 77px;
}
</style>
