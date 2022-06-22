<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar ref="sidebar" class="sidebar-container"></sidebar>
    <div class="main-container">
      <div :class="{ 'fixed-header': true }">
        <navbar />
      </div>
      <addMain></addMain>
      <buttomHelp></buttomHelp>
    </div>
  </div>
</template>
<script>
import { sidebar, addMain, navbar, buttomHelp } from "./components";
// import buttom from "./components/buttom/index.vue";

export default {
  name: "layout",
  components: { sidebar, addMain, navbar, buttomHelp },
  data() {
    return {};
  },
  computed: {
    sidebar() {
      return this.$store.state.setting.sidebar;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
      };
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.app-wrapper {
  background: #f6f8f9;
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
