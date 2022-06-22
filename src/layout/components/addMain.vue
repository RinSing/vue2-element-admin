<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- :include="isKeepAlive" -->
      <keep-alive> <router-view></router-view></keep-alive>
    </transition>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isKeepAlive: "setting/isKeepAlive",
    }),
  },
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 120px);
  /* min-height: calc(100vh); */

  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding: 5px;
  width: 100%;
  margin: auto;
  margin-top: 80px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
